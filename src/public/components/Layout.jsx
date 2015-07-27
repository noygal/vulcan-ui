var React = require('react');
var remote = require('remote');
var dialog = remote.require('dialog');
var taskList = require('./taskList.js');

export class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
        showSpinner : false,
        showAddBtn : true
    };

    this.openDirectory = this.openDirectory.bind(this);
      
  }
  componentDidMount(){
     eventsDispatcher.pathStore.listen(() => {
        this.setState({
          showSpinner : false,
          showAddBtn : true
        });      
    })
  }
  openDirectory(){
    var selected = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    if (!selected) {
        return;
    }
    this.setState({
        showSpinner : true,
        showAddBtn : false
    })
    var file = selected[0];
    eventsDispatcher.addPath.triggerAsync(file);

  }
  render() {
    var spinnerClass = "mdl-spinner mdl-js-spinner is-active is-upgraded" + (this.state.showSpinner ? " show" : "");
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">

          <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
           <div id="mainSpinner" className={spinnerClass}></div>
              <div className="mdl-layout__header-row">
                  <h3>Vulcan builder</h3>
              </div>
              <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark">
              {
                this.state.showAddBtn && ( <button onClick={this.openDirectory} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add">
                      <i className="material-icons">add</i>
                  </button>)
              }
                 
              </div>
          </header>

          <main className="mdl-layout__content">
              <div className="mdl-layout__tab-panel is-active" id="proj1">
                <taskList.taskList />
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
