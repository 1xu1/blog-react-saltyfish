/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_TITTLE: process.env.APP_TITTLE,
        APP_DESCRIPTION: process.env.APP_DESCRIPTION,
        APP_HOST: process.env.APP_HOST
    },
    images: {
        remotePatterns: [
            // 本站
            {
                protocol: 'https',
                hostname: 'www.xuyuxiang.space',
                port: '',
                pathname: '/**',
            },
            // github头像
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            // 博客园图床
            {
                protocol: 'https',
                hostname: 'images.cnblogs.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig