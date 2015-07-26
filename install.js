require('shelljs/global')
var os = require('os')
var fs = require('fs')

exec('gulp clean')

switch (os.platform()) {
  case 'linux':
    exec('gulp electron:linux')
    break
  case 'win32':
    exec('gulp electron:win32')
    break
  case 'darwin':
    exec('gulp electron:darwin')
    break
  default:
    throw 'Sorry, we are not supporting ' +  os.platform
}

// var runFile = fs.readFileSync('run.js')
// runFile = runFile.toString().replace("var path = ''", "var path = '" + __dirname + "'")
// fs.writeFileSync('run.js', runFile)
