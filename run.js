#!/usr/bin/env node

var path = ''

require('shelljs/global')
var os = require('os')

switch (os.platform()) {
  case 'linux':
    exec('vulcan  &', {cwd : path + '/bin/vulcan-linux-x64/'})
    break
  case 'win32':
    exec('start vulcan.exe', {cwd : path + '/bin/vulcan-win32-x64/')
    break
  case 'darwin':
    exec('open vulcan.app &', {cwd : path + '/bin/vulcan-darwin-x64/')
    break
  default:
    throw 'Sorry, we are not supporting ' +  os.platform
}
