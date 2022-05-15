/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['.', '.eslintrc.json', '.prettierrc.json', '.storybook']
  },
  compiler: {
    styledComponents: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/incidentes',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
