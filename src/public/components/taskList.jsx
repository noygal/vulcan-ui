var React = require('react');
var eventsDispatcher = require('../modules/events/eventsDispatcher.js');
var $ = require('jquery');
export class taskList extends React.Component {
    constructor(){
        super();
        this.state = {
            tasks:[]
        }
        eventsDispatcher.pathStore.listen((tasks) => {
            var list = []
            for (var tool in tasks) {
              if (tasks[tool]) tasks[tool].forEach((task) => {
                task.name = tool + ':' + task.name
                list.push(task)
              })
            }
            this.setState({
              tasks : list
            });
        })
         eventsDispatcher.taskStore.listen((status,eventObject,data) => {
           var newTasks = this.state.tasks.map(function(x){
              if(x.name == eventObject.name)
              {
                if(status == "started")
                {
                  x.error = null;
                  x.data = '';
                }
                var chunk = typeof data === "string" ? data.replace(/\n/g, "<br />") : '';
                x.status = status;
                x.data+= chunk;
                if(status === "exit"){
                    console.log(data)
                    x.error = data;
                }
              }
              return x;
          });
           this.setState({
                tasks : newTasks
              })
        })
    }

    handleClick(item){
        eventsDispatcher.runTask.triggerAsync(item);
    }
    render() {
       $("#mainSpinner").hide();
        return (
            <div className="commentBox">
            {
              this.state.tasks.map((item) => {
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
