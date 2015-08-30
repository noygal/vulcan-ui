var React = require('react');
var eventsDispatcher = require('../modules/events/eventsDispatcher.js');
var $ = require('jquery');
var _ = require('lodash');
export class taskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    eventsDispatcher.pathStore.listen((tasks) => {
      var list = [];
      for (var tool in tasks) {
        if (tasks[tool]) {
          tasks[tool].forEach((task) => {
            task.name = tool + ':' + task.name;
            task.type = tool;
            list.push(task);
          })
        }
      }

      this.setState({
        tasks: list
      });
    })
    eventsDispatcher.taskStore.listen((status, eventObject, data) => {
     
      var currentTask = _.find(this.state.tasks,function(x) {
        return x.name == eventObject.name;
      });
      currentTask = updateCurrentTask(currentTask, status, eventObject, data);


      function updateCurrentTask(currentTask, status, eventObject, data) {
        if (status == "started") {
          currentTask.error = null;
          currentTask.data = '';
        }
        var chunk = typeof data === "string" ? data.replace(/\n/g, "<br />") : '';
        currentTask.status = status;
        currentTask.data = currentTask.data.concat(chunk);
        if (status === "exit") {
          currentTask.error = data;
        }

      }
      this.setState(this.state);
    })
  }
  componentWillReceiveProps(nextProps) {
    var me = this.props;
  }
  handleClick(item) {
    eventsDispatcher.runTask.triggerAsync(item);
  }
  render() {
       var my = this;
    $("#mainSpinner").hide();
    return (
      <div className="commentBox">
             
            {
              this.state.tasks.filter(function(x){
                return x.type == my.props.tool;
              }).map((item) => {
                   var boundClick = this.handleClick.bind(this, item);
                  var classname = "section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp task-status-" + item.status;
                   return <section className={classname} >
                       
                       <header className="section__play-btn mdl-cell mdl-button mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
                          {
                            item.status == "started" ?
                             <i className="material-icons">av_timer</i> :
                           <i onClick={boundClick} className="material-icons">play_arrow</i>

                          }
                       </header>
                       <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                           <div className="">
                               <h4>{item.name}</h4>
                           </div>
                            <div style={{height:'105px',overflow:'auto'}}  dangerouslySetInnerHTML={{__html: item.data}}></div>
                            {
                              item.error ?
                               <i className="material-icons" style={{position:'absolute', top:'10px', right:'10px'}}>error</i> :
                                 (item.status == "exit" &&  <i className="material-icons" style={{position:'absolute', top:'10px', right:'10px'}}>done</i>)
                            }
                           { (item.status == "started" && <div className="taskStatus" style={{position:'absolute', bottom:'10px', right:'10px'}}>running...</div>) }

                       </div>
                   </section>
            })
                }
            </div>
    );

  }
}
