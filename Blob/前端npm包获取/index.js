const lock= require('./lock.json');
const download = require('download');
let res = [];
function getDep (dependencies){
  Object.keys(dependencies).map(item=>{
    if(dependencies[item].resolved){
      res.push(dependencies[item].resolved)
      if(dependencies[item].dependencies){
        getDep (dependencies[item].dependencies)
      }
    }
  })
}
getDep(lock.dependencies);
getDep(lock.packages);

console.log('一共' + res.length + '个包');
(async () => {
  await Promise.all(res.map(url => download(url, './res/')));
})();

