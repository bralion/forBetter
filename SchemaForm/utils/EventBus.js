
class EventBus {
    constructor() {
        this.cache = {}
    }
    on(name, func) {
        if (this.cache[name]) {
            this.cache[name].push(func)
        } else {
            this.cache[name] = [func]
        }
    }
    emit(name, params) {
        if (this.cache[name]) {
            const tasks = this.cache[name].slice()
            for (const func of tasks) {
                func(params)
            }
        }
    }
    off(name, func) {
        let tasks = this.cache[name]
        if (tasks) {
            const index = tasks.findIndex(fn => fn === func)
            if (index > 0) {
                tasks.splice(index, 1)
            } else {
                delete this.cache[name]
            }
        }
    }
}

const eventBus = new EventBus()
export default eventBus