const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src')],
    prependData: `@import 'styles/mixin.scss';`,
  },
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
