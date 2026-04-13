
import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { araba, seri } }) {
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
		path: `/urunler/${seri}/${araba}`,
	});
}

async function getData(araba) {
	const slug = araba;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/car/${slug}`,
		{
			cache: 'no-store',
		}
	);

	return res.json();
}

async function getCategoryData() {
	const res = await fetch(
		'https://server.hes-otomotiv.com/api/user/categories',
		{
			next: { revalidate: 86400 },
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function getCarData(araba) {
	const slug = araba;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/cars/${slug}`,
		{
			next: { revalidate: 86400 },
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function getSeriData(seri) {
	const slug = seri;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/series/${slug}`,
		{
			next: { revalidate: 86400 },
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function page({ params: { araba }, params: { seri } }) {
	const data = await getData(araba);
	const categoryData = await getCategoryData();
	const carData = await getCarData(araba);
	const seriData = await getSeriData(seri);

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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
