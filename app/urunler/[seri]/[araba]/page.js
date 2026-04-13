import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
import Pagination from '@/components/pagination';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { araba, seri }, searchParams }) {
	const [carData, seriData] = await Promise.all([
		getCarData(araba),
		getSeriData(seri),
	]);

	const carName = carData?.car?.name ?? araba;
	const seriName = seriData?.series?.name ?? seri;

	return buildMetadata({
		title: `${seriName} ${carName} Yedek Parça | BMW MINI Orijinal Parçalar`,
		description: `${seriName} ${carName} için orijinal ve yüksek kaliteli yedek parçalar. Tüm kategorilerde stok parçalar HES OTOMOTİV'de.`,
		keywords: [
			`${carName} yedek parça`,
			`${seriName} ${carName} yedek parça`,
			`BMW ${carName} parça`,
			'BMW yedek parça',
			'HES Otomotiv',
		],
		path: (parseInt(searchParams?.page) || 1) > 1 ? `/urunler/${seri}/${araba}?page=${parseInt(searchParams.page)}` : `/urunler/${seri}/${araba}`,
	});
}

async function getData(araba, page, limit) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/car/${araba}?page=${page}&limit=${limit}`,
		{ cache: 'no-store' }
	);

	return res.json();
}

async function getCategoryData() {
	const res = await fetch(
		'https://server.hes-otomotiv.com/api/user/categories',
		{ next: { revalidate: 86400 } }
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function getCarData(araba) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/cars/${araba}`,
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

async function page({ params: { araba, seri }, searchParams }) {
	const currentPage = Math.max(1, parseInt(searchParams?.page) || 1);
	const limit = Math.min(100, Math.max(1, parseInt(searchParams?.limit) || 48));

	const [data, categoryData, carData, seriData] = await Promise.all([
		getData(araba, currentPage, limit),
		getCategoryData(),
		getCarData(araba),
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
							<NavigationBar seri={seriData} araba={carData} />
							<div className="col-xl-3 text-center d-flex justify-content-center">
								<SideMenu data={categoryData} seri={seri} araba={araba} />
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
