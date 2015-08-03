# vulcan-ui

![](https://raw.githubusercontent.com/noygal/vulcan-ui/master/docs/vulcan.gif)

## Installation

You can install vulcan-ui with npm, gulp is needed for the build process.
```
npm install -g gulp
npm install -g vulcan-ui
```

If your npm require root privileges to install global packages then you can either [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions), or you can use the ```usafe-perm``` flag.
```
sudo npm install -g --unsafe-perm vulcan-ui
```

Now you can lunch the vulcan application from the terminal.
```
vulcan
```

## Build

If you're having problems with the installation process, or you prefer to get the get hold of the binaries, you can build the application on your local machine.

#### Clone/fork this repository
```
git clone https://github.com/noygal/vulcan-ui.git
```
#### Install dependencies
```
npm install -g gulp
npm install
```
#### Build vulcan-ui
```
gulp bin
```

The binaries should be in the ```bin``` folder.

## Acknowledgments

This project is the child of [Tikal](http://www.tikalk.com/) 16th fuse day contest, the original team members are:
- [matanwerbner](http://github.com/matanwerbner)
- [chertkovalex](http://github.com/chertkovalex)
- [GabiAxel](http://github.com/GabiAxel)
- [zivr](http://github.com/zivr)
- [noygal](http://github.com/noygal)
