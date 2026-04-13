export const SITE_URL = 'https://www.hes-otomotiv.com';
export const SITE_NAME = 'HES OTOMOTİV';

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logos/hes-otomotiv-logo-1-2.png`;

/**
 * Tüm sayfalar için Next.js metadata objesi oluşturur.
 *
 * @param {object} options
 * @param {string} options.title        - Sayfa başlığı (template'e otomatik eklenir: "... | HES OTOMOTİV")
 * @param {string} options.description  - Sayfa açıklaması
 * @param {string[]} [options.keywords] - Anahtar kelimeler
 * @param {string} [options.path]       - Canonical için site-relative path, örn: "/urunler/f30/bmw-320i"
 * @param {string} [options.image]      - Open Graph görseli (varsayılan: site logosu)
 */
export function buildMetadata({ title, description, keywords = [], path = '', image, type = 'website' } = {}) {
	const canonicalUrl = `${SITE_URL}${path}`;
	const ogImage = image ?? DEFAULT_OG_IMAGE;

	return {
		title,
		description,
		...(keywords.length > 0 && { keywords }),
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: SITE_NAME,
			type,
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

/**
 * Ürün detay sayfası için JSON-LD Product schema objesi oluşturur.
 *
 * @param {object} product - API'den gelen ürün objesi
 * @param {string} slug    - Ürün slug'ı (URL'de kullanılan)
 */
export function buildProductJsonLd(product, slug) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.title,
		image: product.image_urls ?? [],
		description: `${product.title} - OEM No: ${product.oemNumber}. BMW ve MINI için orijinal yedek parça.`,
		sku: product.stockCode,
		mpn: product.oemNumber,
		brand: {
			'@type': 'Brand',
			name: product.brand_id?.name ?? SITE_NAME,
		},
		offers: {
			'@type': 'Offer',
			url: `${SITE_URL}/${slug}`,
			priceCurrency: 'TRY',
			price: product.sellingPrice,
			availability: product.status
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
			seller: {
				'@type': 'Organization',
				name: SITE_NAME,
			},
		},
	};
}

/**
 * BreadcrumbList JSON-LD schema objesi oluşturur.
 *
 * @param {Array<{name: string, url: string}>} items - Breadcrumb öğeleri sırasıyla
 */
export function buildBreadcrumbJsonLd(items) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

/**
 * Site geneli için JSON-LD AutoPartsStore (Organization) schema objesi oluşturur.
 */
export function buildOrganizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'AutoPartsStore',
		name: SITE_NAME,
		url: SITE_URL,
		logo: DEFAULT_OG_IMAGE,
		description:
			'BMW ve MINI otomobilleriniz için orijinal ve yüksek kaliteli yedek parçalar.',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Ümraniye',
			addressRegion: 'İstanbul',
			addressCountry: 'TR',
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+90-532-240-9058',
			contactType: 'customer service',
			availableLanguage: 'Turkish',
		},
	};
}
