import { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/shared.scss" as *;`,
  },
  images: {
    domains: ["placehold.co", "oaidalleapiprodscus.blob.core.windows.net"],
  },
};

export default nextConfig;
