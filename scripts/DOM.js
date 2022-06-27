((window, document) => {
    'use strict'

    class DOM{
        #elements

        constructor(nodes){
            this.#elements = document.querySelectorAll(nodes)
        }

        on(event, callback){
            Array.prototype.forEach.call(this.#elements, (item) => {
                item.addEventListener(event, callback)
            })
        }

        get(index) {
            if(!index)
                return this.#elements[0]
            return this.#elements[index]  
        }
    }

    window.DOM = DOM
})(window, document)