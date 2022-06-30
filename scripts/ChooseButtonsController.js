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
            let numberButtons = new DOM('.number-selected')

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
            const lotofacilColor = "#7F3992"
            const megaSenaColor = "#01AC66"
            const quinaColor = "#F79C31"

            document.querySelectorAll('.choose-button').forEach(button => {
                if (!(button === this)) {
                    if (button.innerHTML === 'Lotofácil') {
                        button.style.color = lotofacilColor
                        button.style.border = "2px solid " + lotofacilColor
                        button.style.background = background
                    }
                    if (button.innerHTML === 'Mega-Sena') {
                        button.style.color = megaSenaColor
                        button.style.border = "2px solid " + megaSenaColor
                        button.style.background = background
                    }
                    if (button.innerHTML === 'Quina') {
                        button.style.color = quinaColor
                        button.style.border = "2px solid " + quinaColor
                        button.style.background = background
                    }
                }
            })
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
            // clear
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
                /** verificar a quantidade de números que já estão selecionados */
                let qtdButtonNumbersAlreadySelected = document.querySelectorAll('.number-selected').length
                if (qtdButtonNumbersAlreadySelected === min_and_max_number) {
                    return
                }

                if (min_and_max_number == ChooseButtonsController.counter) {
                    return
                }

                if (this.className === 'number-selected') {
                    return
                }

                ChooseButtonsController.selectedNumberButtons.push(this.innerHTML)

                this.className = 'number-selected'

                ChooseButtonsController.counter++
            })

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

        getSelectedButton(){
            return ChooseButtonsController.selectedButton
        }
    }

    window.ChooseButtonsController = ChooseButtonsController
})(window.AjaxRequest, window.DOM, window.CompleteGame, window.AddToCart)