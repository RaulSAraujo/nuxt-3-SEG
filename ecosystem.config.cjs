module.exports = {
    apps: [
        {
            name: 'front-new',
            port: '3002',
            script: './.output/server/index.mjs',
            interpreter: 'node@22.7.0',
            watch: false,
            watch_delay: 1000,
        }
    ]
}  