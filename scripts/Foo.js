((DOM, ChooseButtonsController, document) => {
    'use strict'

    class Foo {

        handleNumberButtons() {
            let chooseButtonsController = new ChooseButtonsController()
            chooseButtonsController.createButtons()
            chooseButtonsController.addEventToButton()

            let numberButtons = new DOM('.number')

            console.log(numberButtons)
        }

    }

    window.Foo = Foo
})(window.DOM, window.ChooseButtonsController, document)