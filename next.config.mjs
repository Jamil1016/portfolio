/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // This case study was renamed; keep the old URL working.
      {
        source: "/projects/swift-pdf-extractor",
        destination: "/projects/pdf-attachment-extractor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
