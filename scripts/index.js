(function (AjaxRequest) {
    'use strict'

    function init() {
        createChooseButtons()
    }

    function createChooseButtons() {
        let $choose = document.querySelector('[data-js="choose"]')
        
        let ajaxRequest = new AjaxRequest()
        let data = JSON.parse(ajaxRequest.loadData())

        data.types.forEach(element => {
            let button = document.createElement('button')

            button.innerHTML = element.type
            button.style.color = element.color
            button.style.border = "2px solid " + element.color
            button.style.background = "#FFFFFF"

            button.classList.add('button')

            $choose.appendChild(button)
        })
    }


    init()
})(window.AjaxRequest)