/** @type {import('next').NextConfig} */
export const headers = () => {
    return [
      {
        source: "/api/cors/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://online-shop-ohm7mrh56-manoj-sonis-projects.vercel.app" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  };
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
      
        ignoreBuildErrors: true,
      },
      headers
};

export default nextConfig;
