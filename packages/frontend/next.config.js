/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['.', '.eslintrc.json', '.prettierrc.json', '.storybook']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
