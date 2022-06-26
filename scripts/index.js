(() => {
    'use strict'

    function init(){
        const ajax = new XMLHttpRequest
        ajax.open('GET', '../data/games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', function(){
            if(isReady.call(this)){
                console.log(this.responseText)
            }
        })
    }

    function isReady(){
        return this.readyState === 4 && this.status === 200
    }

    init()
})()