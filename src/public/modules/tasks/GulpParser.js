import path from 'path'

var appCwd = process.cwd();

export default class GulpParser {
  constructor() {

  }
  parsePath(projectPath) {
    try {
      process.chdir(projectPath);
      require(path.join(projectPath, 'gulpfile.js'))
      process.chdir(appCwd);
      return this._processGulp(projectPath)
    } catch (error) {
      return null
    }
  }
  _processGulp(projectPath) {
    var gulp = require(projectPath + '/node_modules/gulp')
    if (!gulp.tasks || gulp.tasks.length === 0) return null
    return Object.keys(gulp.tasks).map((key) => {
      return {
        name: key,
        cmd : path.join(projectPath, 'gulp ' + key)
      }
    })
  }
}
