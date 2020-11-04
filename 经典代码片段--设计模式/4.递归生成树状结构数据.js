//递归修改树状结构数据  生成ant-design tree型数据
function trans2TreeData(data){
    let treeData = [];
    function loop (list,parentChildren = treeData){
        list = list || [];
        list.forEach(element => {
            let {id, name, isDir, children} = element;
            let isLeaf = !isDir;
            let node = {
                id,
                key:id,
                isLeaf,
                name,
                title:name,
                selectable:!isDir,
                children:[]
            }
            parentChildren.push(node);
            if(children &&children.length){
                loop(children,node.children);
            }
        });
    }
    loop(data);
    return treeData
}


/**以下是验证 */
// 要求原始数据结构---来源于后台
let data = [
    {
        name:'/',
        isDir:true,
        id:1,
        children:[
            {
                name:'一级目录1',
                isDir:true,
                id:1,
                children:[
                    {
                        name:'二级目录1',
                        isDir:true,
                        id:6,
                        children:[
                            
                        ]
                    },
                ]
            },
            {
                name:'一级目录2',
                isDir:true,
                id:2,
                children:[]
            },
            {
                name:'一级目录3',
                isDir:true,
                id:3,
                children:[]
            },
            {
                name:'一级目录4',
                isDir:true,
                id:4,
                children:[]
            },
            {
                name:'一级目录5',
                isDir:true,
                id:5,
                children:[]
            },

        ],
    }
]
let result = trans2TreeData(data);
console.log(result);