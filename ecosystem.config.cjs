module.exports = {
    apps: [
        {
            name: 'new-front-seg',
            port: '3000',
            interpreter: 'node@20.17.0',
            script: './.output/server/index.mjs'
        }
    ]
}
