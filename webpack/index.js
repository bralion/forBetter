/**
 * @file entry file
 * @author yangcl120
 */

import React, {Component,createRef} from 'react';
import ReactDOM from 'react-dom';

class Test extends Component {

    constructor(props) {
        super(props);
    }
    consolelog(){
        console.log('我是子组件方法')
    }
    render(){
        return (<div>
                <Test1 ref = {this.props.ref1}></Test1>
        </div>)
    }
}

class Test1 extends Component {

    constructor(props) {
        super(props);
    }
    consolelog(){
        console.log('我是子组件1方法')
    }
    render(){
        return (<div>
            {'我是子组件1'}
        </div>)
    }
}
function Test2(Component1){
    return (<div><Component1></Component1>  </div>)
}
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            showSetting: false
        };
        this.ref = createRef()
        this.Test3 = Test2(Test1)

    }
    render() {
        return (<div className="container1">
            {'我是主组件'}
            <button onClick={this.click.bind(this)}>点击</button>
            <div >ycl</div>
            <Test2 ref={this.ref} ></Test2>
        </div>);
    }

    click() {
      this.ref.current.consolelog()
    }

}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);

import {forwardRef} from 'react'
const insertErrorBoundary = WrappedComponent =>{
    class ErrorBoundary extends React.Component{
        state ={
            error:false
        }
        logErrorToService(err,errorInfo={},name=''){

        }
        componentDidCatch(error, errorInfo) {
            this.setState({error:true},()=>{
                this.logErrorToService(err,errInfo,WrappedComponent.name)
            })
        }
        render(){
            const forwardRef = this.props.forwardRef
            if(this.state.error){
                return <p>组件异常...</p>
            }
            <WrappedComponent ref={forwardRef} {...this.props}/>
        }
    }
    return forwardRef((props,forwardRef)=><ErrorBoundary {...props} forwardRef={forwardRef}></ErrorBoundary>)
}

