module.exports = function(grunt) {

  require('time-grunt')(grunt),
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // jade compile
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          },
          //pretty: true
        },
        files: {
          "build/index.html": ['src/templates/*.jade', '!src/templates/_*.jade']
        }
      }
    },

    // postcss
    postcss: {
      options: {
        processors: [
          require('postcss-import')({path: ['src/styles']}),
          require('postcss-mixins'),
          require('postcss-simple-vars'),
          require('postcss-nested'),
          require('postcss-extend'),
          require('postcss-media-minmax'),
          require('postcss-clearfix'),
          require("postcss-color-function"),
          require('autoprefixer')({browsers: ['last 2 version', 'IE 8', 'IE 9']}),
          require('cssnano')({autoprefixer: false}),
          require('pixrem')({html: false})
        ]
      },
      dist: {
        files: {
           './build/css/main.css': 'src/styles/main.css'
        }
      }

    },

    // js
    uglify: {
      start: {
        files: {
          'build/js/scripts.min.js': ['src/js/scripts.js']
        }
      }
    },

    //images
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/*.{png,jpg,gif,svg}']
        }]
      }
    },

    // delete production folder
    clean: {
      build: [
        './build'
      ]
    },

    // copy
    copy: {
      js: {
        expand: true,
        cwd: 'src/js/',
        src: ['**'],
        dest: 'build/js/'
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,gif,svg}'],
        dest: 'build/img/'
      },
      fonts: {
        expand: true,
        cwd: 'src/font/',
        src: ['*.{eot,svg,woff,ttf}'],
        dest: 'build/font/'
      }
    },

  // watch changes
   watch: {
    options: {
      livereload: true
    },
    style: {
        files: ['src/styles/*.css'],
        tasks: ['postcss']
    },
    scripts: {
      files: ['src/js/*.js'],
      tasks: ['js']
    },
    images: {
      files: ['src/img/**/*.{png,jpg,gif,svg}'],
      tasks: ['img']
    },
    jade: {
      files: ['src/**/*.jade'],
      tasks: ['jade']
    }
  },
  
  'gh-pages': {
    options: {
      base: 'build'
    },
    src: ['**']
  },

    // livereload
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/main.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/"
          },
          startPath: "/index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });

  // base task
   grunt.registerTask('default', [
     'jade',
     'postcss',
     'copy:js',
     //'uglify',
     'copy:img',
     'copy:fonts',
     //'imagemin',
     'browserSync',
     'watch'
   ]);

   // build task
   grunt.registerTask('build', [
     'clean:build',
     'jade',
     'postcss',
     'uglify',
     'copy:img',
     'copy:fonts',
     'imagemin',
     'gh-pages'
   ]);

   // js only
   grunt.registerTask('js', [
     'copy:js',
     //'uglify',
   ]);

   // css & images only
   grunt.registerTask('img', [
     'copy:img',
     'imagemin',
     'postcss'
   ]);

};
