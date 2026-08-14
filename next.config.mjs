/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Render's instance has no `sharp` installed, so on-the-fly resizing
    // falls back to a much heavier path — requesting the larger built-in
    // device sizes (1080px+) was crashing that process (502s). Capping the
    // widths Next will ever generate keeps every resize request cheap.
    deviceSizes: [640, 750, 828],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};

export default nextConfig;
