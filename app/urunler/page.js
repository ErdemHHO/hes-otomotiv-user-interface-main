import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
import Pagination from '@/components/pagination';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ searchParams }) {
	const page = parseInt(searchParams?.page) || 1;
	return buildMetadata({
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
		path: page > 1 ? `/urunler?page=${page}` : '/urunler',
	});
}

async function getData(page, limit) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products?page=${page}&limit=${limit}`,
		{ cache: 'no-store' }
	);
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

async function page({ searchParams }) {
	const currentPage = Math.max(1, parseInt(searchParams?.page) || 1);
	const limit = Math.min(100, Math.max(1, parseInt(searchParams?.limit) || 48));

	const [data, seriData] = await Promise.all([
		getData(currentPage, limit),
		getSeriData(),
	]);

	const totalPages = data?.pagination?.totalPages ?? 1;
	const total = data?.pagination?.total ?? data?.products?.length ?? 0;

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
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								total={total}
								limit={limit}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
