/** @type {import('next').NextConfig} */
const nextConfig = {
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
