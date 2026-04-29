'use client';

import Link from 'next/link';

export default function WhatsAppLink({ href, children, ...props }) {
	function handleClick() {
		if (typeof gtag === 'function') {
			gtag('event', 'conversion', {
				send_to: 'AW-17910373522/QMM4COPv6O0bEJK5qtxC',
				value: 1.0,
				currency: 'TRY',
			});
		}
	}

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
