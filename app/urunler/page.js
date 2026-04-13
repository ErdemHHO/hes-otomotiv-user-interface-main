import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
	title: 'Tüm Ürünler | BMW ve MINI Yedek Parça',
	description:
		'BMW ve MINI modellerine özel tüm yedek parçalarımızı inceleyin. Bosch, Mahle, Valeo, LUK, Febi ve daha fazlası. HES OTOMOTİV güvencesiyle.',
	keywords: [
		'BMW yedek parça',
		'MINI yedek parça',
		'tüm BMW parçaları',
		'otomotiv yedek parça',
		'HES Otomotiv ürünler',
	],
	path: '/urunler',
});

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

async function page() {
	const data = await getData();
	const seriData = await getSeriData();

	return (
		<div className="icerik">
			<div className="mt-5">
				<div className="container-fluid">
					<div className="row">
						<NavigationBar />
						<div className="col-md-3 text-center d-flex justify-content-center">
							<SideMenu data={seriData} />
						</div>
						<div className="col-md-9">
							<div className="product_card_container">
								{data?.products?.map((product) => (
									<ProductCard key={product._id} data={product} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
