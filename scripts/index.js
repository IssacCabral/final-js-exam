((ChooseButtonsController) => {
    'use strict'

    const chooseButtonsController = new ChooseButtonsController()

    function init() {
        chooseButtonsController.createButtons()
        chooseButtonsController.setChooseButtonInFirstTime()
        chooseButtonsController.addEventToButton()
    }

    init()

})(window.ChooseButtonsController)