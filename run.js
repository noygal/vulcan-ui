#!/usr/bin/env node

require('shelljs/global')
var os = require('os')

var path = __dirname

switch (os.platform()) {
  case 'linux':
    exec('bin/vulcan-linux-x64/vulcan  &')
    // launchApp('vulcan  &', 'bin/vulcan-linux-x64/')
    break
  case 'win32':
    exec('start ' + path + '/bin/vulcan-win32-x64/vulcan.exe')
    // launchApp('start vulcan.exe', 'bin/vulcan-win32-x64/')
    break
  case 'darwin':
    exec('open ' + path + '/bin/vulcan-darwin-x64/vulcan.app')
    // launchApp('open vulcan.app &', 'bin/vulcan-darwin-x64/')
    break
  default:
    throw 'Sorry, we are not supporting ' +  os.platform
}

// function launchApp(cmd, path) {
//   // var sep = os.platform() === 'win32' ? ' && ' : ' ; '
//   // exec('cd ' + path + sep + cmd + sep + 'cd ' + cwd)
//   exec()
// }
