import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { registerMicroApps,setDefaultMountApp,runAfterFirstMounted, start } from 'qiankun';


registerMicroApps([
  {
    name: 'vue1', // app name registered
    entry: '//localhost:8080',
    container: '#micro-container',
    activeRule: '/vue1',
  },
  {
    name: 'pm_oms',
    entry: "http://localhost:8081/",
    container: '#micro-container',
    activeRule: '/pm_oms',
  },
],{
    beforeLoad:function (app){
        console.log(app,'beforeLoad')
    },
    beforeMount:function (app){
        console.log(app,'beforeMount')
    },
    afterMount:function (app){
        console.log(app,'afterMount')
    },
    beforeUnmount:function (app){
        console.log(app,'beforeUnmount')
    },
    afterUnmount:function (app){
        console.log(app,'afterUnmount')
    },

});

start();

runAfterFirstMounted(() => console.log('开启埋点'));
setDefaultMountApp('vue2')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)


