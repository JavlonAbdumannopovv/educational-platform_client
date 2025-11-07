/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'media.graphassets.com',
			'localhost',
			'digitaluzbekistan.com',
			'educational-platform-server.onrender.com',
		],
		dangerouslyAllowSVG: true,
	},
};

module.exports = nextConfig;
