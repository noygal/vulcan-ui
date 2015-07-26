require('shelljs/global');
var os = require('os')

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
