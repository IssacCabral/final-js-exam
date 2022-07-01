(function (AjaxRequest, DOM, CompleteGame, AddToCart) {
    'use strict'

    class ChooseButtonsController {
        #ajaxRequest
        #choose
        #chooseButtons

        // selectedButton
        static selectedButton
        static selectedNumberButtons = []
        static counter = 0

        constructor() {
            this.#ajaxRequest = new AjaxRequest()
            this.#choose = document.querySelector('[data-js="choose"]')
        }

        createButtons() {
            let data = JSON.parse(this.#ajaxRequest.loadData())

            data.types.forEach(element => {
                let button = document.createElement('button')

                button.innerHTML = element.type
                button.style.color = element.color
                button.style.border = "2px solid " + element.color
                button.style.background = "#FFFFFF"

                button.classList.add('choose-button')

                this.#choose.appendChild(button)
            })
        }

        setChooseButtonInFirstTime() {
            this.handleRulesAndButtons.call(document.querySelector('.choose-button'))
        }

        // Lembrar de depois, tentar criar classes para cada chamada
        // dessas callbacks e passar as informações necessárias
        // para que essas classes trabalhem
        addEventToButton() {
            this.#chooseButtons = new DOM('.choose-button')
            this.#chooseButtons.on('click', this.handleRulesAndButtons)

            let clearGameButton = new DOM('#clear-game')
            clearGameButton.on('click', this.handleClickClearGame)

            let completeGameButton = new DOM('#complete-game')
            completeGameButton.on('click', CompleteGame.handleClickCompleteGameButton.bind(this.getSelectedNumbersAndChooseButton))

            let addToCartButton = new DOM('#add-to-cart')
            addToCartButton.on('click', AddToCart.handleClickAddToCartButton.bind(this.getSelectedButton));
        }

        handleClickClearGame() {
            let numberButtons = new DOM('.number-default.active')

            numberButtons.getAll().forEach(button => {
                button.className = 'number-default'
                ChooseButtonsController.counter = 0
                ChooseButtonsController.selectedNumberButtons = []
            })
        }

        handleRulesAndButtons() {

            if (ChooseButtonsController.selectedButton === this) {
                return
            }

            ChooseButtonsController.selectedButton = this

            ChooseButtonsController.selectedNumberButtons = []
            ChooseButtonsController.counter = 0

            ChooseButtonsController.prototype.setButtonColors.call(this)
            ChooseButtonsController.prototype.setRulesAndRenderNumbers.call(this)
        }

        clearChooseButtonsColors() {
            const background = "#FFFFFF"

            let gameRgbColors = []
            let data = JSON.parse(new AjaxRequest().loadData())
            data.types.forEach(game => {
                gameRgbColors.push(ChooseButtonsController.convertToRgb(game.color))
            })

            document.querySelectorAll('.choose-button').forEach((button, i) => {
                if (!(button === this)) {
                    button.style.color = gameRgbColors[i]
                    button.style.border = '2px solid ' + gameRgbColors[i]
                    button.style.background = background
                }
            })
        }

        static convertToRgb(color) {

            /* Check for # infront of the value, if it's there, strip it */
            if (color.substring(0, 1) == '#') {
                color = color.substring(1);
            }

            var rgbColor = {};

            /* Grab each pair (channel) of hex values and parse them to ints using hexadecimal decoding */
            rgbColor.rChannel = parseInt(color.substring(0, 2), 16);
            rgbColor.gChannel = parseInt(color.substring(2, 4), 16);
            rgbColor.bChannel = parseInt(color.substring(4), 16);

            let rgb = `rgb(${rgbColor.rChannel}, ${rgbColor.gChannel}, ${rgbColor.bChannel})`

            return rgb;
        }

        clearRulesAndButtons() {
            let rules = document.querySelector('.rules')
            let checkIfExistsRuleText = document.querySelector('.rule-text')
            if (checkIfExistsRuleText) {
                rules.removeChild(checkIfExistsRuleText)
            }
        }

        clearNumberButtons() {
            let checkIfExistsNumberButtons = document.querySelector('.number-buttons-div')
            if (checkIfExistsNumberButtons.hasChildNodes()) checkIfExistsNumberButtons.innerText = ""
        }

        setButtonColors() {
            // primeiro limpa, depois seta
            ChooseButtonsController.prototype.clearChooseButtonsColors.call(this)
            ChooseButtonsController.prototype.clearRulesAndButtons.call(this)
            ChooseButtonsController.prototype.clearNumberButtons.call(this)

            let backgroundColorChooseButton = this.style.background
            let chooseButtonColor = this.style.color
            let colorToApplyInButtons = this.style.color

            let completeGameButton = document.querySelector('#complete-game')
            let clearGameButton = document.querySelector('#clear-game')
            let addToCartButton = document.querySelector('#add-to-cart')

            /**Set Colors in Selected Button */
            this.style.color = backgroundColorChooseButton
            this.style.background = chooseButtonColor
            this.style.border = "2px solid " + backgroundColorChooseButton

            const arrayButtons = [completeGameButton, clearGameButton]

            arrayButtons.forEach(button => {
                button.style.border = '1px solid ' + colorToApplyInButtons
                button.style.color = colorToApplyInButtons
            })

            /**Set colors in addToCartButton */
            addToCartButton.style.background = colorToApplyInButtons
            addToCartButton.style.border = '1px solid ' + colorToApplyInButtons
        }

        setRulesAndRenderNumbers() {
            let rule = document.querySelector('.rules')
            let ruleText = document.createElement('p')

            let numberButtonsDiv = document.querySelector('.number-buttons-div')

            let ajaxRequest = new AjaxRequest()
            let data = JSON.parse(ajaxRequest.loadData())

            data.types.forEach(element => {
                if (element.type === this.innerHTML) {
                    ruleText.appendChild(document.createTextNode(element.description))
                    ruleText.classList.add('rule-text')
                    rule.appendChild(ruleText)
                }
            })
            data.types.forEach(element => {
                if (element.type === this.innerHTML) {
                    // generate numberButtons
                    let range = element.range

                    for (let i = 0; i < range; i++) {
                        let numberButton = document.createElement('button')
                        numberButton.className = 'number-default'

                        numberButton.innerHTML = i + 1
                        numberButtonsDiv.appendChild(numberButton)
                    }
                }
            })

            ChooseButtonsController.prototype.selectNumberButtonsEvent()
        }

        selectNumberButtonsEvent() {
            let data = ChooseButtonsController.prototype.returnDataInAjaxRequest()
            let min_and_max_number

            data.types.forEach(element => {
                if (element.type === ChooseButtonsController.selectedButton.innerHTML) {
                    min_and_max_number = element.min_and_max_number
                }
            })


            let numberButtons = new DOM('.number-default')
            numberButtons.on('click', function () {
                const hasMaxNumbersSelected = document.querySelectorAll('.number-default.active').length == min_and_max_number
                if(this.classList.contains('active') && hasMaxNumbersSelected){
                    this.classList.remove('active')
                }
                if(hasMaxNumbersSelected) return 

                this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')  


                ChooseButtonsController.selectedNumberButtons.push(this.innerHTML)

            })


        }

        foo() {
            // let numberButtonsSelected = new DOM('.number-default.active')
            // numberButtonsSelected.on('click', function () {
            //     let indexOfSelectedNumber = ChooseButtonsController.selectedNumberButtons.indexOf(this.innerHTML)
            //     this.className = 'number-default'
            //     ChooseButtonsController.selectedNumberButtons.splice(indexOfSelectedNumber, 1)
            //     console.log(ChooseButtonsController.selectedNumberButtons)
            // })
        }

        returnDataInAjaxRequest() {
            let ajaxRequest = new AjaxRequest()
            let data = JSON.parse(ajaxRequest.loadData())
            return data
        }

        getSelectedNumbersAndChooseButton() {
            return {
                selectedNumbers: ChooseButtonsController.selectedNumberButtons,
                chooseButton: ChooseButtonsController.selectedButton
            }
        }

        getSelectedButton() {
            return ChooseButtonsController.selectedButton
        }
    }

    window.ChooseButtonsController = ChooseButtonsController
})(window.AjaxRequest, window.DOM, window.CompleteGame, window.AddToCart)