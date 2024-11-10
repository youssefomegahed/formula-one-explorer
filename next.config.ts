import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/f1/:path*',
                destination: 'http://ergast.com/api/f1/:path*',
            },
        ];
    },
};

export default nextConfig;
