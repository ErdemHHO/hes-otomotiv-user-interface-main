import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ScrollButton from '@/components/ScrollButton';

import { SITE_URL, SITE_NAME, buildOrganizationJsonLd } from '@/lib/seo';

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${SITE_NAME} | BMW ve MINI Otomotiv Yedek Parçaları`,
		template: `%s | ${SITE_NAME}`,
	},
	description:
		"BMW ve MINI otomobilleriniz için orijinal ve yüksek kaliteli yedek parçalar ve aksesuarlar. İstanbul Ümraniye'de 20 yılı aşkın tecrübesiyle hizmet veriyoruz.",
	keywords: [
		'BMW yedek parça',
		'MINI yedek parça',
		'Mini Cooper yedek parça',
		'BMW F10 yedek parça',
		'BMW F20 yedek parça',
		'BMW F30 yedek parça',
		'otomotiv yedek parça',
		'orijinal BMW parçaları',
		'yedek parça mağazası',
		'İstanbul BMW yedek parça',
		'Ümraniye otomotiv',
		'HES Otomotiv',
	],
	authors: [{ name: SITE_NAME }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'tr_TR',
		url: SITE_URL,
		siteName: SITE_NAME,
		title: `${SITE_NAME} | BMW ve MINI Otomotiv Yedek Parçaları`,
		description:
			'BMW ve MINI otomobilleriniz için orijinal ve yüksek kaliteli yedek parçalar ve aksesuarlar.',
		images: [
			{
				url: '/images/logos/hes-otomotiv-logo-1-2.png',
				width: 1200,
				height: 630,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${SITE_NAME} | BMW ve MINI Otomotiv Yedek Parçaları`,
		description:
			'BMW ve MINI otomobilleriniz için orijinal ve yüksek kaliteli yedek parçalar.',
		images: ['/images/logos/hes-otomotiv-logo-1-2.png'],
	},
	alternates: {
		canonical: SITE_URL,
	},
	icons: {
		icon: '/images/logos/hes-otomotiv-logo-1-2.png',
		shortcut: '/images/logos/hes-otomotiv-logo-1-2.png',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="tr">
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(buildOrganizationJsonLd()),
					}}
				/>
				<Header />
				<Navbar />
				<ScrollButton />
				{children}

				<Footer />

				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
					crossOrigin="anonymous"
				></script>
			</body>
		</html>
	);
}
