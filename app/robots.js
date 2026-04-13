import { SITE_URL } from '@/lib/seo';

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/_next/'],
			},
		],
		sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-images.xml`],
		host: SITE_URL,
	};
}
