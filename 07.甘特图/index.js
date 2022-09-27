import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';


const tasks ={
    data: [
        { id:1, text:"长篇故事", start_date:"2018/04/01",title:'devops定制化开发', user:{name:'杨超林（yangcl120）'},
            duration:18, progress:0.4, open:true },
        { id:2, text:"用户故事", start_date:"2018/04/02",title:'甘特图开发',user:{name:'杨超林（yangcl120）'},
            duration:8, progress:0.6, parent:1 },
        { id:3, text:"工作项", start_date:"2018/04/11",title:'甘特图demo开发',user:{name:'杨超林（yangcl120）'},
            duration:8, progress:0.6, parent:2 }
    ],
    links: [
        { id:1, source:1, target:2, type:"1" },
        { id:2, source:2, target:3, type:"0" }
    ]
}
export default class Gantt extends Component {
    componentDidUpdate() {
        gantt.render();
    }
    componentDidMount() {
        // gantt.scales = [
        //     { unit: "year", step: 1, format: "%Y" }
        // ];

        gantt.i18n.setLocale("cn");
        gantt.config.drag_mode = "ignore";
        gantt.config.date_format = "%Y/%m/%d"
        gantt.templates.task_text=function(start,end,task){
            return task.title+",<b> 负责人:</b> "+task.user.name;
        };
        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);
    }

    render() {
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            >
            </div>
            );
    }
}

ReactDOM.render(
    <Gantt tasks={tasks}/>,
    document.getElementById('app')
);
