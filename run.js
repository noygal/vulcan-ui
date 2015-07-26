#!/usr/bin/env node

var path = ''

require('shelljs/global')
var os = require('os')

switch (os.platform()) {
  case 'linux':
    exec(path + '/bin/vulcan-linux-x64/vulcan  &')
    break
  case 'win32':
    exec(path + '/start bin/vulcan-win32-x64/vulcan.exe')
    break
  case 'darwin':
    exec(path + '/open bin/vulcan-darwin-x64/vulcan.app &')
    break
  default:
    throw 'Sorry, we are not supporting ' +  os.platform
}
