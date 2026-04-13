import { SITE_URL } from '@/lib/seo';

async function getAllProducts() {
	try {
		const res = await fetch('https://server.hes-otomotiv.com/api/user/products', {
			next: { revalidate: 3600 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return data?.products ?? [];
	} catch {
		return [];
	}
}

async function getAllSeries() {
	try {
		const res = await fetch('https://server.hes-otomotiv.com/api/user/series', {
			next: { revalidate: 86400 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return data?.series ?? [];
	} catch {
		return [];
	}
}

async function getCarsForSeries(seriSlug) {
	try {
		const res = await fetch(
			`https://server.hes-otomotiv.com/api/user/cars/series/${seriSlug}`,
			{ next: { revalidate: 86400 } }
		);
		if (!res.ok) return [];
		const data = await res.json();
		return data?.cars ?? [];
	} catch {
		return [];
	}
}

async function getAllCategories() {
	try {
		const res = await fetch('https://server.hes-otomotiv.com/api/user/categories', {
			next: { revalidate: 86400 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return data?.categories ?? [];
	} catch {
		return [];
	}
}

export default async function sitemap() {
	const staticPages = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1.0,
		},
		{
			url: `${SITE_URL}/urunler`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/hakkimizda`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/iletisim`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/teslimat`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.4,
		},
	];

	const [products, series, categories] = await Promise.all([
		getAllProducts(),
		getAllSeries(),
		getAllCategories(),
	]);

	const productPages = products.map((product) => ({
		url: `${SITE_URL}/${product.slug}`,
		lastModified: new Date(product.updatedAt ?? product.createdAt ?? Date.now()),
		changeFrequency: 'weekly',
		priority: 0.8,
	}));

	const seriesPages = series.map((seri) => ({
		url: `${SITE_URL}/urunler/${seri.slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly',
		priority: 0.7,
	}));

	const carPagesPromises = series.map(async (seri) => {
		const cars = await getCarsForSeries(seri.slug);
		return cars.map((car) => ({
			url: `${SITE_URL}/urunler/${seri.slug}/${car.slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		}));
	});

	const carPagesNested = await Promise.all(carPagesPromises);
	const carPages = carPagesNested.flat();

	return [...staticPages, ...productPages, ...seriesPages, ...carPages];
}
