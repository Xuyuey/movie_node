module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      pug: {
        files: ['views/**'],
        options: {
          livereload: true //文件出现改动的时候，重新启动服务
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],语法检查
        options: {
          livereload: true
        }
      },
      //-uglify: {
      //-  files: ['public/**/*.js'],
      //-  tasks: ['jshint'],
      //-  options: {
      //-    livereload: true
      //-  }
      //-},
      //-styles: {
      //-  files: ['public/**/*.less'],
      //-  tasks: ['less'],
      //-  options: {
      //-    nospawn: true
      //-  }
      //-}
    },

    //-jshint: {
    //-  options: {
    //-    jshintrc: '.jshintrc',
    //-    ignores: ['public/libs/**/*.js']
    //-  },
    //-  all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
    //-},

    //-less: {
    //-  development: {
    //-    options: {
    //-      compress: true,
    //-      yuicompress: true,
    //-      optimization: 2
    //-    },
    //-    files: {
    //-      'public/build/index.css': 'public/less/index.less'
    //-    }
    //-  }
    //-},

    //-uglify: {
    //-  development: {
    //-    files: {
    //-      'public/build/admin.min.js': 'public/js/admin.js',
    //-      'public/build/detail.min.js': [
    //-        'public/js/detail.js'
    //-      ]
    //-    }
    //-  }
    //-},

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,// 大批量的文件要重启，会等到有很多的时候重启
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    //-mochaTest: {
    //-  options: {
    //-    reporter: 'spec'
    //-  },
    //-  src: ['test/**/*.js']
    //-},

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  //-grunt.loadNpmTasks('grunt-mocha-test')
  //-grunt.loadNpmTasks('grunt-contrib-less')
  //-grunt.loadNpmTasks('grunt-contrib-uglify')
  //-grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])

  //-grunt.registerTask('test', ['mochaTest'])
}