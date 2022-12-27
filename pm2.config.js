module.exports = {
    apps: [{
        name: "netflix-backend",
        script: "src/app.js",
        node_args: "--max-old-space-size=512",
        instances: 1,
        watch: true
    }]
}