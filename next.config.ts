import { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/shared.scss" as *;`,
  },
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
