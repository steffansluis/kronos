module.exports = ( grunt ) ->
  srcs = [
    'kronos'
    'signal'
    'temporal_list'
  ]

  # Coverage thresholds
  thresholds =
    lines: 60
    statements: 60
    branches: 60
    functions: 60


  # This functions makes the config shorter and clearer later on.
  # It just returns the type specific coverage config
  coverage = ( type, optionsRef ) ->
    optionsRef.template = require('grunt-template-jasmine-istanbul')
    optionsRef.templateOptions =
      coverage: 'statistics/coverage/coverage.json'
      thresholds: thresholds
      report:
        type: type
        options:
          dir: "statistics/coverage/#{type}"

    return optionsRef


  # Configure all the tasks!

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      default:
        # options:
          # sourceMap: true
        files: [
          expand: true
          cwd: 'src'
          src: srcs.map ( src ) -> src + '.coffee'
          dest: 'dist'
          ext: '.js'
        ]

      spec:
        # options:
        #   sourceMap: true
        files: [
          expand: true
          cwd: 'spec'
          src: ['**/*.coffee']
          dest: 'build/spec'
          ext: '.js'
        ]

    browserify:
      default:
        files: 'dist/kronos.browser.js': 'dist/kronos.js'
        options:
          sourceMap: false
          browserifyOptions:
            standalone: 'Kronos'

    jasmine:
      default:
        src:  ['dist/kronos.browser.js']
        options:
          vendor: ['node_modules/sonic/dist/sonic.browser.js']
          keepRunner: true
          specs: 'build/spec/**/*.js'
      lcovonly:
        src:  ['dist/kronos.browser.js']
        options: (coverage 'lcovonly',
          vendor: ['node_modules/sonic/dist/sonic.browser.js']
          keepRunner: true
          specs: 'build/spec/**/*.js'
        )
      html:
        src: ['dist/kronos.browser.js']
        options: (coverage 'html',
          vendor: ['node_modules/sonic/dist/sonic.browser.js']
          specs: 'build/spec/**/*.js'
        )

    clean:
      build: ['build']

    watch:
      dist:
        files: ['src/**/*.coffee']
        tasks: ['coffee:dist']
      spec:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['spec']
      build:
        files: ['src/**/*.coffee']
        tasks: ['coffee:build']

    codo:
      files: ['src/**/*.coffee']

  # grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-codo'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'dist',    ['coffee', 'browserify']
  grunt.registerTask 'spec',    ['clean', 'dist', 'coffee:spec' ,'jasmine:default']
  grunt.registerTask 'test',    ['spec' ,'jasmine:lcovonly']


