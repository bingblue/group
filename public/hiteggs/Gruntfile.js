module.exports = function(grunt) {
  // 配置
  grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      meta: {
        basePath: './',
        srcPath: './sass/',
        deployPath: './css/'
      },
      concat : {
          js : {
              src: ['js/**/*.js'],
              dest: 'dest/<%= pkg.name %>.js'
          },
          css : {
              src: ['css/**/*.css'],
              dest: 'dest/<%= pkg.name %>.css'
          }
      },
      uglify : {
          options : {
              banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n * 作者：小牧COOL \n * QQ：895355044 \n * 版本：<%= pkg.version %> \n */'
          },
          dist: {
            files: {
              'dest/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>'],
              'dest/hit.min.js' : 'dest/hit.js'
            }
          }
      },
      cssmin: {
        options : {
            banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n * 作者：小牧COOL \n * QQ：895355044 \n * 版本：<%= pkg.version %> \n */'
        },
        css: {
          src: '<%= concat.css.dest %>',
          dest: 'dest/<%= pkg.name %>.min.css'
        }  
      },
      sass: {
        dist: {
            files: {
              '<%= meta.deployPath %>style.css':'<%= meta.srcPath %>style.scss'
            },
            options: {
              style: 'nested'
            }
        }
      },
      watch: {
        files: ['<%= meta.srcPath %>/**/*.scss','./**/*.css','./js/**/*.js'],
        tasks: ['sass','concat','uglify','cssmin']
      }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('w', ['watch']);
  grunt.registerTask('default', ['concat', 'uglify','cssmin']);
};