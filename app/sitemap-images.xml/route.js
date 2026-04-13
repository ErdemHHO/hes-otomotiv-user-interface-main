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

export async function GET() {
	const products = await getAllProducts();

	const urlEntries = products
		.filter((p) => p.slug && p.image_urls?.length > 0)
		.map((p) => {
			const images = p.image_urls
				.slice(0, 5)
				.map(
					(url) => `
    <image:image>
      <image:loc>${url}</image:loc>
      <image:title>${escapeXml(p.title)}</image:title>
    </image:image>`
				)
				.join('');

			return `
  <url>
    <loc>${SITE_URL}/${p.slug}</loc>${images}
  </url>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>${urlEntries}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	});
}

function escapeXml(str) {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
