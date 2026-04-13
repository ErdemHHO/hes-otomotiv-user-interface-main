/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/gif/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'server.hes-otomotiv.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'hes-otomotiv.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '*.amazonaws.com',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
