require('shelljs/global');
var os = require('os')

switch (os.platform()) {
  case 'linux':
    exec('./bin/vulcan-linux-x64/vulcan  &')
    break
  case 'win32':
    exec('start bin/vulcan-win32-x64/vulcan.exe')
    break
  case 'darwin':
    exec('open bin/vulcan-darwin-x64/vulcan.app &')
    break
  default:
    throw 'Sorry, we are not supporting ' +  os.platform
}
