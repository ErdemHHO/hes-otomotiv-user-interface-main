import Contact from '@/components/contact';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
	title: 'İletişim | HES OTOMOTİV',
	description:
		"HES OTOMOTİV ile iletişime geçin. BMW ve MINI yedek parça siparişi, fiyat teklifi ve bilgi için bizi arayın. İstanbul Ümraniye'de showroomumuzu ziyaret edin.",
	keywords: [
		'HES Otomotiv iletişim',
		'BMW yedek parça sipariş',
		'Ümraniye otomotiv telefon',
	],
	path: '/iletisim',
});

function page() {
	return (
		<main className="icerik">
			<Contact />
		</main>
	);
}

export default page;
