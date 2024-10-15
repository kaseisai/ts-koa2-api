module.exports = {
  apps: [
    {
      script: '${__dirname}/../src/app.js',
      instances: 1,
      exec_mode: 'cluster_mode',
      name: 'oe1-dms-api',
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'development',
        port: 5700,
        website: 'ts-koa2-api',
        websiteType: 'pc',
      },
    },
  ],
};
