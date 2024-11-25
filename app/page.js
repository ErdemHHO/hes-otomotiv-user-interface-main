import BrandSlider from '@/components/brandSlider';
import HomeBgImg from '@/components/homeBgImg';
import HomeSearchBar from '@/components/HomeSearchBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';

import Link from 'next/link';

export const metadata = {
	title: 'HES OTOMOTİV | BMW ve MINI Otomotiv Yedek Parçaları',
	description:
		'BMW ve MINI otomobilleriniz için orijinal ve yüksek kaliteli yedek parçalar ve aksesuarlar. Geniş ürün yelpazemizle sizlere hizmet veriyoruz',
};

async function getData() {
	const res = await fetch('https://server.hes-otomotiv.com/api/user/products', {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

async function getSeriData() {
	const res = await fetch('https://server.hes-otomotiv.com/api/user/series', {
		next: { revalidate: 86400 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export default async function Home() {
	const data = await getData();
	const seriData = await getSeriData();

	return (
		<main>
			<div>
				<div className="container">
					<div className="row">
						<div className="col-xl-3 text-center d-none d-md-flex justify-content-center">
							<SideMenu data={seriData} />
						</div>
						<div className="col-xl-9 ">
							<HomeBgImg />
						</div>
					</div>
				</div>
			</div>

			<HomeSearchBar />

			<h1 className="text-center m-2">
				<strong>YENİ ÜRÜNLER</strong>
			</h1>
			<div className="product_card_container">
				{data?.products?.slice(0, 20).map((product) => (
					<ProductCard key={product._id} data={product} />
				))}
			</div>
			<div className="text-end text-denger mt-1 mx-5 p-3">
				<Link href="/urunler">
					<span className="text-danger border-bottom">Tüm Ürünleri Gör</span>
				</Link>
			</div>
			<BrandSlider />
		</main>
	);
}
