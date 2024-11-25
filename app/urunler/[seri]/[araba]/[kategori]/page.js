
import NavigationBar from '@/components/navigationBar';
import ProductCard from '@/components/productCard';
import SideMenu from '@/components/sideMenu';

export const metadata = {
	description: 'Lists all products in a category',
};

async function getData(araba, kategori) {
	const carSlug = araba;
	const categorySlug = kategori;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/products/car/${carSlug}/category/${categorySlug}`,
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

async function getKategoriData(kategori) {
	const slug = kategori;

	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/categories/${slug}`,
		{
			next: { revalidate: 86400 },
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

async function page({
	params: { araba },
	params: { kategori },
	params: { seri },
}) {
	const data = await getData(araba, kategori);
	const categoryData = await getCategoryData();
	const carData = await getCarData(araba);
	const seriData = await getSeriData(seri);
	const categoryData2 = await getKategoriData(kategori);

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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
