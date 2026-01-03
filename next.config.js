const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/pages': path.resolve(__dirname, 'pages'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/data': path.resolve(__dirname, 'data'),
      '@/public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
  images: {
    domains: [
      'media.licdn.com',    // For LinkedIn article images
      'images.unsplash.com', // For placeholder images
      'source.unsplash.com'  // For placeholder images
    ],
    // Optional: Configure image optimization
    formats: ['image/avif', 'image/webp'],
    // Optional: Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optional: Configure image sizes for different viewports
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
