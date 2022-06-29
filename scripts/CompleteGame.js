((window, AjaxRequest, ChooseButtonsController, document) => {
    'use strict'

    class CompleteGame {
        static alreadyClick = false
        static arr = []

        static handleClickCompleteGameButton() {
            CompleteGame.isNecessaryGenerateRandomNumbers(this())
        }

        static isNecessaryGenerateRandomNumbers(info) {
            const selectedNumbers = info.selectedNumbers
            const gameType = info.chooseButton.innerHTML
            let range

            // if(this.arr.length > selectedNumbers.length){
            //     return
            // }

            // // preciso checar novamente os numeros selecionados
            // // após já ter gerado alguns números aleatórios e clicar 
            // // novamente no botão de completar o game
            let dataRequest = this.returnDataInAjaxRequest().types
            let min_and_max_number_in_game_selected

            dataRequest.forEach(game => {
                if (game.type === gameType) {
                    min_and_max_number_in_game_selected = game.min_and_max_number
                    range = game.range
                    return
                }
            })

            if (selectedNumbers.length === min_and_max_number_in_game_selected) return

            this.generateRandomNumbers({
                selectedNumbers,
                min_and_max_number_in_game_selected,
                range,
                chooseButton: info.chooseButton
            })
        }

        static generateRandomNumbers(info) {
            // solução para quando já tiverem sido gerados números aleatórios e 
            // o usuário tentar gerar novamente
            let arrAux = document.querySelectorAll('.number-selected')
            if(arrAux.length > info.selectedNumbers.length){
                return
            }

            let qtdRandomNumbersToBeGenerated = info.min_and_max_number_in_game_selected - info.selectedNumbers.length
            let randomNumbers = []

            while (randomNumbers.length < qtdRandomNumbersToBeGenerated) {
                let randomNumber = Math.floor(Math.random() * Number(info.range) + 1)
                let aux = true

                for (let i = 0; i < info.selectedNumbers.length; i++) {
                    if (randomNumber === Number(info.selectedNumbers[i])) {
                        aux = false
                        break
                    }
                }

                if (aux === false) {
                    continue
                }

                for (let i = 0; i < randomNumbers.length; i++) {
                    if (randomNumbers[i] === randomNumber) {
                        aux = false
                        break
                    }
                }

                if (aux === false) {
                    continue
                }

                randomNumbers.push(randomNumber)
                continue
            }

            CompleteGame.completeNumbers({ info, randomNumbers })
        }

        static completeNumbers(infoAndRandomNumbers) {
            let { randomNumbers } = infoAndRandomNumbers

            let numberButtonsDefault = document.querySelectorAll('.number-default')

            numberButtonsDefault.forEach(numberButtonDefault => {
                if (randomNumbers.indexOf(Number(numberButtonDefault.innerHTML)) !== -1) {
                    numberButtonDefault.className = 'number-selected'
                }
            })
            this.alreadyClick = true


        }

        static returnDataInAjaxRequest() {
            let ajaxRequest = new AjaxRequest()
            let data = JSON.parse(ajaxRequest.loadData())
            return data
        }
    }

    window.CompleteGame = CompleteGame
})(window, window.AjaxRequest, window.ChooseButtonsController, document)