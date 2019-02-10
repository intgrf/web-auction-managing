const paths = {
    dest: 'assets',
    app: {
        src: '*.*',
        dest: 'assets/'
    },
    views: {
        src: 'views/*.pug',
        dest: 'assets/views/'
    },
    styles: {
        src: 'public/stylesheets/*.less',
        dest: 'assets/public/stylesheets'
    },
    scripts: {
        src: 'public/javascripts/*.js',
        dest: 'assets/public/javascripts'
    },
    pictures: {
        src: 'public/images/*.*',
        dest: 'assets/public/images/'
    },
    sslkeys: {
        src: 'sslcert/*.*',
        dest: 'assets/sslcert/'
    }

};


module.exports = {
    paths: paths,
    plugins: {
        browserSync: {
            proxy: "https://localhost:8443",
            port: 5000,
            files: [
                paths.dist_files
            ],
            //browser: 'google chrome',
            notify: true
        },
        nodemon: {
            script: 'assets/app.js',
            ignore: [
                'gulpfile.js',
                'config/',
                'node_modules/',
                '*List.json'
            ]
        },
        babel:{
            presets: ['@babel/env']
        }
    }
}