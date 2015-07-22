import _npmParser from './NpmParser'
import _gruntParser from './GruntParser'
import _gulpParser from './GulpParser'

export default class TaskBuilder {
  constructor() {
    this.npmParser = new _npmParser();
    this.gruntParser = new _gruntParser();
    this.gulpParser = new _gulpParser();
  }
  processPath(projectPath) {
    var results = {
      npm : this.npmParser.parsePath(projectPath),
      grunt : this.gruntParser.parsePath(projectPath),
      gulp : this.gulpParser.parsePath(projectPath)
    }
    return results
  }
}
