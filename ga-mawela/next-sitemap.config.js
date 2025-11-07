/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://truth.gamawela.org',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  sitemapBaseFileName: 'sitemap',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};