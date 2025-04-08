import { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/shared.scss" as *;`,
  },
};

export default nextConfig;
