var exec = require('child_process').exec
var path = require('path')
var psTree = require('ps-tree');

var kill = function(pid, signal, callback) {
  signal = signal || 'SIGKILL';
  callback = callback || function() {};
  var killTree = true;
  if (killTree) {
    psTree(pid, function(err, children) {
      [pid].concat(
        children.map(function(p) {
          return p.PID;
        })
      ).forEach(function(tpid) {
        try {
          process.kill(tpid, signal)
        } catch (ex) {}
      });
      callback();
    });
  } else {
    try {
      process.kill(pid, signal)
    } catch (ex) {}
    callback();
  }
};

export default class TaskRunner {
  constructor(cmd) {
    this._child = exec(path.basename(cmd), {
      cwd: path.dirname(cmd)
    }, function(error, stdout, stderr) {});
    this._child.stdout.on('data', (data) => {
      this._updateHandler(data)
    });
    this._child.stderr.on('data', (data) => {
      this._errorHandler(data)
    });
    this._child.on('close', (code) => {
      this._exitHandler(code);
    });
  }
  onUpdate(handler) {
    this._updateHandler = handler
    return this;
  }
  onError(handler) {
    this._errorHandler = handler
    return this;
  }
  onExit(handler) {
    this._exitHandler = handler
    return this;
  }
  kill() {
    var isWin = /^win/.test(process.platform);
    if (!isWin) {
      kill(this._child);
    } else {
      exec('taskkill /PID ' + this._child + ' /T /F', function(error, stdout, stderr) {});
    }
  }
}

// var x = new TaskRunner('gulp');
// x.onUpdate((update)=>{
//   console.log('update');
//   console.log(update);
// })
// .onExit((exit)=>{
//   console.log('exit');
//   console.log(exit);
// })

// var exec = require('child_process').exec;
// var child = exec('gulp', {cwd: '/Users/gal/dev/playground-base' }, function(error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//         console.log('exec error: ' + error);
//     }
// });
// child.stdout.on('data', function(data) {
//     console.log('stdout: ' + data);
// });
// child.stderr.on('data', function(data) {
//     console.log('stdout: ' + data);
// });
// child.on('close', function(code) {
//     console.log('closing code: ' + code);
// });
//
// var psTree = require('ps-tree');
//
// var kill = function (pid, signal, callback) {
//     signal   = signal || 'SIGKILL';
//     callback = callback || function () {};
//     var killTree = true;
//     if(killTree) {
//         psTree(pid, function (err, children) {
//             [pid].concat(
//                 children.map(function (p) {
//                     return p.PID;
//                 })
//             ).forEach(function (tpid) {
//                 try { process.kill(tpid, signal) }
//                 catch (ex) { }
//             });
//             callback();
//         });
//     } else {
//         try { process.kill(pid, signal) }
//         catch (ex) { }
//         callback();
//     }
// };
//
// setTimeout(()=>{
//   kill(child.pid);
// }, 10000)
