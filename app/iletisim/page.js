import Contact from '@/components/contact';

export const metadata = {
	description: 'Our contact page contains information for users to reach us.',
};

function page() {
	return (
		<main className="icerik">
			<Contact />
		</main>
	);
}

export default page;
