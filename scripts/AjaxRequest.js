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


    // function AjaxRequest(){
    //     this.ajax = new XMLHttpRequest()
    //     this.PATH = '../data/games.json'
    //     this.response = ''
    // }

    // AjaxRequest.prototype.loadData = function(){
    //     this.ajax.open('GET', this.PATH)
    //     this.ajax.send()

    //     this.ajax.addEventListener('readystatechange', function(){
    //         if(this.readyState === 4 && this.status === 200){
    //             AjaxRequest.response = this.responseText
    //         }
    //     })
    // }

    // AjaxRequest.prototype.isReady = function(){
    //     return this.ajax.readyState === 4 && this.ajax.status === 200
    // }

    // AjaxRequest.prototype.getResponse = function(){
    //     this.loadData()
    //     return this.response
    // }

    window.AjaxRequest = AjaxRequest
})(window)