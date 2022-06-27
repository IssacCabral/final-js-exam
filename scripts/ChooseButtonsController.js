(function (AjaxRequest, DOM) {
    'use strict'

    class ChooseButtonsController {
        #ajaxRequest
        #choose
        #chooseButtons
        selectedButton

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

        addEventToButton() {
            this.#chooseButtons = new DOM('.choose-button')
            this.#chooseButtons.on('click', this.handleRulesAndButtons)
        }

        handleRulesAndButtons() {

            if (ChooseButtonsController.prototype.selectedButton === this) {
                return
            }

            ChooseButtonsController.prototype.selectedButton = this

            ChooseButtonsController.prototype.setButtonColors.call(this)
            ChooseButtonsController.prototype.setRulesAndRenderNumbers.call(this)
        }

        clearChooseButtonsColors() {
            // console.log(ChooseButtonsController.prototype.selectedButton)
            // console.log(this)
            const background = "#FFFFFF"
            const lotofacilColor = "#7F3992"
            const megaSenaColor = "#01AC66"
            const quinaColor = "#F79C31"

            document.querySelectorAll('.choose-button').forEach(button => {
                if (!(button === this)) {
                    if(button.innerHTML === 'Lotofácil'){
                        button.style.color = lotofacilColor
                        button.style.border = "2px solid " + lotofacilColor
                        button.style.background = background
                    }
                    if(button.innerHTML === 'Mega-Sena'){
                        button.style.color = megaSenaColor
                        button.style.border = "2px solid " + megaSenaColor
                        button.style.background = background
                    }
                    if(button.innerHTML === 'Quina'){
                        button.style.color = quinaColor
                        button.style.border = "2px solid " + quinaColor
                        button.style.background = background
                    }
                }
            })
        }

        clearRulesAndButtons(){
            let rules = document.querySelector('.rules')
            let checkIfExistsRuleText = document.querySelector('.rule-text')
            if(checkIfExistsRuleText){
                rules.removeChild(checkIfExistsRuleText)
            }
        }  

        clearNumberButtons(){
            let game = document.querySelector('.game')
            let checkIfExistsNumberButtons = document.querySelector('.number-buttons-div')

            if(checkIfExistsNumberButtons.hasChildNodes()){
                checkIfExistsNumberButtons.innerText = ""
            }
            
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
                        numberButton.classList.add('number')
                        numberButton.innerHTML = i + 1
                        numberButtonsDiv.appendChild(numberButton)
                    }
                }
            })
        }
    }

    window.ChooseButtonsController = ChooseButtonsController
})(window.AjaxRequest, window.DOM)