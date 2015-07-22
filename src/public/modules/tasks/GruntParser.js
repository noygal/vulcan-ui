import path from 'path'

var appCwd = process.cwd();

export default class GruntParser {
  constructor() {

  }
  parsePath(projectPath) {
    try {
      process.chdir(projectPath)
      var grunt = require(projectPath + '/node_modules/grunt')
      require(path.join(projectPath, 'Gruntfile.js'))(grunt)
      process.chdir(appCwd)
      return this._processGrunt(grunt, projectPath)
    } catch (error) {
      return null
    }
  }
  _processGrunt(grunt, projectPath) {
    if (!grunt.task || !grunt.task._tasks || grunt.task._tasks.length === 0) return null
    return Object.keys(grunt.task._tasks).map((key) => {
      return {
        name: key,
        cmd : path.join(projectPath, 'grunt ' + key)
      }
    })
  }
}
