(function(window){
    'use strict'

    class AjaxRequest{
        #ajax
        #PATH

        constructor(){
            this.#ajax = new XMLHttpRequest()
            this.#PATH = '../data/games.json'
        }

        loadData(){
            this.#ajax.open('GET', this.#PATH, false)
            this.#ajax.send()

            if(this.isReady()){
                return this.#ajax.responseText
            }
        }

        isReady(){
            return this.#ajax.status === 200
        }
    }

    window.AjaxRequest = AjaxRequest
})(window)