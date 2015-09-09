module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
              
    // jade compile
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
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
          require('postcss-size'),
          require("postcss-import"),
          require('postcss-mixins'),
          require('postcss-simple-extend'),
          require('postcss-conditionals'),
          require('postcss-for'),
          require('postcss-simple-vars'),
          require('postcss-nested'),
          require('postcss-extend'),
          require('postcss-color-hcl'),
          require('autoprefixer')({browsers: 'last 2 version'}),
          require('cssnano')
        ]
      },
      dist: {
        files: {
           './build/css/styles.css': 'src/styles/*.css'
        }
      }
        
    },

    // beatufy
    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'build/css/styles.css': ['build/css/styles.css']
        }
      }
    },

    //js compile
    uglify: {
      start: {
        files: {
          'build/js/scripts.min.js': ['build/js/scripts.js']
        }
      }
    },

    // images
    // imagemin: {
    //   build: {
    //     options: {
    //       optimizationLevel: 3
    //     },
    //     files: [{
    //       expand: true,
    //       src: ['build/img/*.{png,jpg,gif,svg}']
    //     }]
    //   }
    // },

    // delete production folder
    clean: {
      build: [
        './build',
        'src/css/*'
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

    // livereload
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/styles.css',
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
     'uglify',
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
     //'copy:html',
     'copy:img',
     'copy:fonts'
     //'imagemin',
   ]);

   // js only
   grunt.registerTask('js', [
     'uglify',
     'copy:js'
   ]);

   // css & images only
   grunt.registerTask('img', [
     'copy:img',
      //'imagemin',
     'postcss'
   ]);

};