((window, AjaxRequest, document) => {
    'use strict'

    class CompleteGame {

        static handleClickCompleteGameButton() {
            if (this().selectedNumbers.length === 0) {
                return
            }

            CompleteGame.isNecessaryGenerateRandomNumbers(this())
        }

        static isNecessaryGenerateRandomNumbers(info) {
            const selectedNumbers = info.selectedNumbers
            const gameType = info.chooseButton.innerHTML
            let range

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

            this.generateRandomNumbers({ selectedNumbers, min_and_max_number_in_game_selected, range })
        }

        static generateRandomNumbers(info) {
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

            console.log(randomNumbers)
        }

        static returnDataInAjaxRequest() {
            let ajaxRequest = new AjaxRequest()
            let data = JSON.parse(ajaxRequest.loadData())
            return data
        }
    }

    window.CompleteGame = CompleteGame
})(window, window.AjaxRequest, document)