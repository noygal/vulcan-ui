import path from 'path'

export default class NpmParser {
  constructor() {

  }
  parsePath(projectPath) {
    try {
      return this._processPackage(require(path.join(projectPath, 'package.json')), projectPath)
    } catch (error) {
      return null
    }
  }
  _processPackage(pack, projectPath) {
    if (!pack.scripts) return null
    return Object.keys(pack.scripts).map((key) => {
      return {
        name: key,
        cmd : path.join(projectPath, 'npm run ' + key)
      }
    })
  }
}
