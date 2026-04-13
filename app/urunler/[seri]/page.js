
import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';
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

async function getData(seri) {
	const slug = seri;
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/series/${slug}`,
		{
			cache: 'no-store',
		}
	);

	return res.json();
}

async function getCarData(seri) {
	const slug = seri;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/cars/series/${slug}`,
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

async function page({ params: { seri } }) {
	const data = await getData(seri);
	const carData = await getCarData(seri);
	const seriData = await getSeriData(seri);

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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
