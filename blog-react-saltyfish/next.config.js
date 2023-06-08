/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_TITTLE: process.env.APP_TITTLE,
        APP_DESCRIPTION: process.env.APP_DESCRIPTION,
        APP_HOST: process.env.APP_HOST
    },
}

module.exports = nextConfig
