((ChooseButtonsController, DOM, document) => {
    'use strict'

    let chooseButtonsController = new ChooseButtonsController()


    function init() {
        chooseButtonsController.createButtons()
        chooseButtonsController.addEventToButton()
    }

    init()

})(window.ChooseButtonsController, window.DOM, document)