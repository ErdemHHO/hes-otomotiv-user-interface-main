import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
import Pagination from '@/components/pagination';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { araba, kategori, seri } }) {
	const [carData, seriData, categoryData2] = await Promise.all([
		getCarData(araba),
		getSeriData(seri),
		getKategoriData(kategori),
	]);

	const carName = carData?.car?.name ?? araba;
	const seriName = seriData?.series?.name ?? seri;
	const kategoriName = categoryData2?.category?.name ?? kategori;

	return buildMetadata({
		title: `${seriName} ${carName} ${kategoriName} | BMW MINI Yedek Parça`,
		description: `${seriName} ${carName} için ${kategoriName} kategorisinde orijinal ve uygun fiyatlı yedek parçalar. HES OTOMOTİV'de stokta hazır.`,
		keywords: [
			`${carName} ${kategoriName}`,
			`${seriName} ${carName} ${kategoriName}`,
			`BMW ${carName} ${kategoriName}`,
			`${kategoriName} yedek parça`,
			'BMW yedek parça',
			'HES Otomotiv',
		],
		path: `/urunler/${seri}/${araba}/${kategori}`,
	});
}

async function getData(araba, kategori, page, limit) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/car/${araba}/category/${kategori}?page=${page}&limit=${limit}`,
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

async function getKategoriData(kategori) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/categories/${kategori}`,
		{ next: { revalidate: 86400 } }
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function page({ params: { araba, kategori, seri }, searchParams }) {
	const currentPage = Math.max(1, parseInt(searchParams?.page) || 1);
	const limit = Math.min(100, Math.max(1, parseInt(searchParams?.limit) || 48));

	const [data, categoryData, carData, seriData, categoryData2] = await Promise.all([
		getData(araba, kategori, currentPage, limit),
		getCategoryData(),
		getCarData(araba),
		getSeriData(seri),
		getKategoriData(kategori),
	]);

	const totalPages = data?.pagination?.totalPages ?? 1;
	const total = data?.pagination?.total ?? data?.products?.length ?? 0;

	return (
		<div className="icerik">
			<div>
				<div className="mt-5">
					<div className="container-fluid">
						<NavigationBar
							seri={seriData}
							araba={carData}
							kategori={categoryData2}
						/>
						<div className="row">
							<div className="col-xl-3 text-center d-flex justify-content-center">
								<SideMenu
									data={categoryData}
									araba={araba}
									seri={seri}
									kategori={kategori}
								/>
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
