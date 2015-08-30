var React = require('react');
var remote = require('remote');
var dialog = remote.require('dialog');
var taskList = require('./taskList.js');
var _ = require('lodash');
export class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            showSpinner: false,
            showAddBtn: true,
            tools: ['npm', 'grunt', 'gulp'],
            defaultTool: 'gulp',
            showToolMenu: false
        };

        this.openDirectory = this.openDirectory.bind(this);
        this.toolClicked = this.toolClicked.bind(this);
    }
    componentDidMount() {
      var me = this;
        eventsDispatcher.pathStore.listen((parsedPath) => {
            var newState = _.assign(me.state, {
                showSpinner: false,
                showAddBtn: true,
                showToolMenu: true,
                tools : me.state.tools.filter(function(x){
                  return parsedPath[x];
                })
            });

            newState.defaultTool = newState.tools[0];

            me.setState(newState);
        })
    }
    toolClicked(tool) {
        this.state.defaultTool = tool;
        this.setState(this.state);
    }
    openDirectory() {
        var selected = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (!selected) {
            return;
        }
        this.setState({
            showSpinner: true,
            showAddBtn: false
        })
        var file = selected[0];
        eventsDispatcher.addPath.triggerAsync(file);

    }
    render() {
        var spinnerClass = "mdl-spinner mdl-js-spinner is-active is-upgraded" + (this.state.showSpinner ? " show" : "");
        var toolClicked = this.toolClicked;
        var my = this;
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">

          <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
           <div id="mainSpinner" className={spinnerClass}></div>
              <div className="mdl-layout__header-row">
                  <h3>Vulcan builder</h3>
              </div>
              <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark">
                { 
                  this.state.showToolMenu &&
                  this.state.tools.map(function(tool){
                        var boundClick = toolClicked.bind(this, tool);
                        var classNameText = "mdl-layout__tab is-active " + (my.state.defaultTool == tool ? "selected" : "");
                        return  <a onClick={boundClick} className={classNameText}>{tool}</a>
                  })
                }
              {
                this.state.showAddBtn && ( <button onClick={this.openDirectory} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add">
                      <i className="material-icons">add</i>
                  </button>)
              }
                  
        
       
              </div>
          </header>

          <main className="mdl-layout__content">
        
              <div className="mdl-layout__tab-panel is-active" id="proj1">
                <taskList.taskList tool={my.state.defaultTool} />
              </div>
             
              <footer className="mdl-mega-footer">
                  <div className="mdl-mega-footer--middle-section">
                      Tikal Fuzeday - Don't expect something to work
                  </div>
              </footer>
          </main>
      </div>
        );
    }
}
