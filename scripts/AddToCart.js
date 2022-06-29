((window, AjaxRequest, document) => {
    'use strict'

    class AddToCart{
        static handleClickAddToCartButton(){
            AddToCart.isNecessaryAddValuesInCart(this())
        }

        static isNecessaryAddValuesInCart(chooseButton){
            let counterNumberButtonSelected = document.querySelectorAll('.number-selected').length
            if(counterNumberButtonSelected === 0){
                alert('Complete algum jogo para poder adicionar ao CART!')
                return
            }

            let data = JSON.parse(new AjaxRequest().loadData())
            let min_and_max_number

            data.types.forEach(gameType => {
                if(gameType.type === chooseButton.innerHTML){
                    min_and_max_number = gameType.min_and_max_number
                }
            })

            if(min_and_max_number !== counterNumberButtonSelected){
                alert(`selecione ${min_and_max_number} números`)
                return
            }

            AddToCart.createNewCartItem(chooseButton)
        }

        static createNewCartItem(chooseButton){
            let items = document.querySelector('.items')
            
            let selectedNumberButtons = document.querySelectorAll('.number-selected')
            
            let item = document.createElement('div')
            item.className = 'item'
            item.style.display = 'flex'
            item.style.alignItems = 'center'
            item.style.justifyContent = 'left'
            item.style.marginBottom = '7px'

            let trashButton = this.createTrashButton()            
            item.appendChild(trashButton)
            
            let verticalBar = this.createVerticalBar(chooseButton)
            
            item.appendChild(verticalBar)
            
            let itemContent = this.createItemContent(selectedNumberButtons, chooseButton)
            item.appendChild(itemContent)

            items.appendChild(item)
        }

        static createTrashButton(){
            let button = document.createElement('button')
            button.style.width = '20px'
            button.style.background = 'none'
            button.style.border = 'none'
            button.style.marginRight = '7px'

            let imgTrash = document.createElement('img')
            imgTrash.src = '../assets/trash_gray.png'
            imgTrash.width = '7px'
            imgTrash.height = '25px'
            imgTrash.style.cursor = 'pointer'
            imgTrash.style.background = ''

            button.appendChild(imgTrash)
            return button

        }

        static createVerticalBar(chooseButton){
            let colorVerticalBar = chooseButton.style.background
            let verticalBar = document.createElement('div')
            verticalBar.style.width = '4px'
            verticalBar.style.height = '50px'
            verticalBar.style.borderRadius = '100px 0px 0px 100px'
            verticalBar.style.background = colorVerticalBar
            verticalBar.style.marginRight = '7px'

            return verticalBar
        }

        static createItemContent(selectedNumberButtons, chooseButton){
            let itemContent = document.createElement('div')
            itemContent.className = 'item-content'
            itemContent.style.width = '150px'

            let numbersDiv = this.getContentOfSelectedNumberButtons(selectedNumberButtons)
            let gamePrice = this.createGamePrice(chooseButton)

            itemContent.appendChild(numbersDiv)
            itemContent.appendChild(gamePrice)

            return itemContent
        }

        static getContentOfSelectedNumberButtons(selectedNumberButtons){
            let numbersDiv = document.createElement('div')

            let numbers = document.createElement('p')
            numbers.style.fontSize = '12px'
            numbers.style.fontWeight = '500'
            numbers.style.wordBreak = 'break-word'
            
            let selectedNumberButtonsToString = []

            selectedNumberButtons.forEach(numberButton => {
                selectedNumberButtonsToString.push(numberButton.innerHTML)
            })

            numbers.innerHTML = selectedNumberButtonsToString.toString()

            numbersDiv.appendChild(numbers)
            return numbersDiv
        }

        static createGamePrice(chooseButton){
            let gamePrice = document.createElement('div')
            gamePrice.style.display = 'flex'            
            gamePrice.className = 'game-price'
            gamePrice.style.marginTop = '3px'

            let type = this.getType(chooseButton)
            let price = this.getPrice(chooseButton)

            gamePrice.appendChild(type)
            gamePrice.appendChild(price)

            return gamePrice
        }

        static getType(chooseButton){
            let type = document.createElement('div')
            type.innerHTML = chooseButton.innerHTML
            type.style.color = chooseButton.style.background
            type.style.fontWeight = '600'
            type.style.fontStyle = 'italic'
            type.style.fontSize = '13px'

            return type
        }

        static getPrice(chooseButton){
            let price = document.createElement('div')
            price.innerHTML = 'R$ '
            price.style.fontSize = '13px'
            price.style.marginLeft = '13px'

            let data = JSON.parse(new AjaxRequest().loadData())

            data.types.forEach(game => {
                if(game.type === chooseButton.innerHTML){
                    price.innerHTML += game.price
                }
            })

            return price
        }

    }

    window.AddToCart = AddToCart
})(window, window.AjaxRequest, document)