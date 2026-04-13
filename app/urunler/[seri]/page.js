import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
import Pagination from '@/components/pagination';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { seri } }) {
	const seriData = await getSeriData(seri);
	const seriName = seriData?.series?.name ?? seri;

	return buildMetadata({
		title: `${seriName} Yedek Parça | BMW MINI Orijinal Parçalar`,
		description: `${seriName} için orijinal ve yüksek kaliteli yedek parçalar. BMW ve MINI ${seriName} modellerine özel stok parçalar HES OTOMOTİV'de.`,
		keywords: [
			`${seriName} yedek parça`,
			`BMW ${seriName} yedek parça`,
			`${seriName} orijinal parça`,
			'BMW yedek parça',
			'HES Otomotiv',
		],
		path: `/urunler/${seri}`,
	});
}

async function getData(seri, page, limit) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/series/${seri}?page=${page}&limit=${limit}`,
		{ cache: 'no-store' }
	);

	return res.json();
}

async function getCarData(seri) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/cars/series/${seri}`,
		{ next: { revalidate: 86400 } }
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function getSeriData(seri) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/series/${seri}`,
		{ next: { revalidate: 86400 } }
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function page({ params: { seri }, searchParams }) {
	const currentPage = Math.max(1, parseInt(searchParams?.page) || 1);
	const limit = Math.min(100, Math.max(1, parseInt(searchParams?.limit) || 48));

	const [data, carData, seriData] = await Promise.all([
		getData(seri, currentPage, limit),
		getCarData(seri),
		getSeriData(seri),
	]);

	const totalPages = data?.pagination?.totalPages ?? 1;
	const total = data?.pagination?.total ?? data?.products?.length ?? 0;

	return (
		<div className="icerik">
			<div>
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">
							<NavigationBar seri={seriData} />
							<div className="col-xl-3 text-center d-flex justify-content-center">
								<SideMenu data={carData} seri={seri} />
							</div>
							<div className="col-xl-9">
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
		</div>
	);
}

export default page;
