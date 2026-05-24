module.exports = {
  apps: [
    {
      name: 'sietch',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/gamaral.com/SIETCH',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '300M',
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=384',
      },
    },
  ],
};
