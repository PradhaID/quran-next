module.exports = {
    apps: [{
        name: "quran-online",
        script: "./node_modules/next/dist/bin/next",
        args: "start",
        env: {
            NODE_ENV: "production",
        }
    }],

    deploy: {
        production: {
            user: "adit", // User SSH server Anda
            host: "163.223.117.195", // IP Server Anda
            ref: "origin/main", // Branch yang mau di-pull
            repo: "git@github.com:PradhaID/quran-next.git",
            path: "/app/web/quran.pradha.id",
            "post-deploy": "npm install && npm run build && pm2 restart quran --update-env",
        }
    }
};