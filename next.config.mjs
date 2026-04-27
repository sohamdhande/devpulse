/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Allow GitHub avatar images to be served by next/image */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
