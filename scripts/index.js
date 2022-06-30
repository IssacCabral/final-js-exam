((ChooseButtonsController, DOM, document) => {
    'use strict'

    let chooseButtonsController = new ChooseButtonsController()

    function init() {
        chooseButtonsController.createButtons()
        chooseButtonsController.setChooseButtonInFirstTime()
        chooseButtonsController.addEventToButton()
        chooseButtonsController.foo()
    }

    init()

})(window.ChooseButtonsController, window.DOM, document)