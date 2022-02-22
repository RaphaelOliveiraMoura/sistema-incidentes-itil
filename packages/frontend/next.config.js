/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['.', '.eslintrc.json', '.prettierrc.json', 'tsconfig.json']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
