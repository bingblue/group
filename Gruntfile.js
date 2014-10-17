module.exports = function(grunt) {
  // 配置
  grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      concat : {
          test : {
              src: ['routes/**/*.js'],
              dest: 'public/js/<%= pkg.name %>.js'
          }
      },
      uglify : {
          options : {
              banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
          },
          dist: {
            files: {
              'public/js/<%= pkg.name %>.min.js': ['<%= concat.test.dest %>']
            }
          }
      },
      jshint: {
        files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js','<%= concat.test.dest %>'],
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'uglify']
      }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
