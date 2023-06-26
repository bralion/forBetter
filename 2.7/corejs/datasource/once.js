class Once {
    static scriptsAppended = [];
    static stylesAppended = [];
    /**
     *
     * @param {Object} obj
     * @param {String} store
     * @param {String} src
     */
    has(obj) {
        let el = this.find(obj);
        return el ? true : false;
    }

    find(obj) {
        let src = null,
            store = null,
            exitEl = null;
        obj.src && ((src = "src"), (store = "scriptsAppended"));
        obj.href && ((src = "href"), (store = "stylesAppended"));
        if (!src || !store) {
            console.warn("参数缺失");
            return null;
        }

        Once[store].forEach(el => {
            let findName, findSrc;

            if (el[src] && obj[src] && el[src] == obj[src]) {
                findSrc = true;
            }

            if (el.name && obj.name && el.name == obj.name) {
                findName = true;
            }

            // 查找元素包含src，name和src全匹配视为找到，如果不包含src，name相同视为找到
            if(obj[src]){
                findSrc && findName && (exitEl = el);
            }else{
                findName && (exitEl = el);
            }

            // if (el.name && obj.name && el.name == obj.name) {
            //     return (exitEl = el);
            // } else if (el[src] && obj[src] && el[src] == obj[src]) {
            //     return (exitEl = el);
            // }
        });
        return exitEl;
    }

    add(obj, type) {
        let idx;

        type = type || "scriptsAppended";
        idx = Once[type].findIndex(v=>v.name === obj.name);

        // 存在name一样的则更新
        if(idx!==-1){
            Once[type].splice(idx,1,obj);
        }else{
            return Once[type].push(obj);
        }
    }

    createScript(obj) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        // script.async = true;
        // script.defer = true;
        script.src = obj.src;
        obj.name && script.setAttribute("name", obj.name);
        document.head.appendChild(script);
        return script;
    }
    createStyle(obj) {
        const clink = document.createElement("link");
        clink.rel = "stylesheet";
        clink.href = obj.href;
        obj.name && clink.setAttribute("name", obj.name);
        document.head.appendChild(clink);
        return clink;
    }
    /**
     *
     * @param {Object} obj  {[name], src}
     */
    loadStyle(obj) {
        let link = null;
        if (!this.has(obj)) {
            link = this.createStyle(obj);
            //添加到记录中
            let p = new Promise((resolve, reject) => {
                link.onload = () => resolve();
                link.onerror = () => reject();
            });
            this.add(
                { name: obj.name, href: obj.href, promise: p },
                "stylesAppended"
            );
            return p;
        } else {
            return this.find(obj).promise;
        }
    }

    loadScript(obj) {
        let script = null;
        if (!this.has(obj)) {
            script = this.createScript(obj);
            //添加到记录中
            let p = new Promise((resolve, reject) => {
                script.onload = () => resolve();
                script.onerror = (e) => reject(e);
            });
            this.add({ name: obj.name, src: obj.src, promise: p });
            return p;
        } else {
            return this.find(obj).promise;
        }
    }
}

export default new Once();
