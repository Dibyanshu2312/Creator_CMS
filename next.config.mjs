/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverComponentsExternalPackages: ["swr"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      swr: require.resolve("swr"), // force standard client version
    };
    return config;
  },
};

export default nextConfig;
