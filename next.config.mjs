/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: Array.from(new Set([
            'maps.googleapis.com',
            'i.ytimg.com',
            'www.aljazeera.com',
            'scx2.b-cdn.net',
            's.yimg.com',
            'apicms.thestar.com.my',
            'static.dw.com',
            'd.ibtimes.com',
            'i.cbc.ca',
            'live-production.wcms.abc-cdn.net.au',
            'www.rawstory.com',
            'img.pravda.com'
        ])),
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;