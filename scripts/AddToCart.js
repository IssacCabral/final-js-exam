((window, AjaxRequest, document) => {
    'use strict'

    class AddToCart {
        static totalCartValue = 0;
        static itemId = 0
        static counterNumberButtonSelected

        static handleClickAddToCartButton() {
            AddToCart.isNecessaryAddValuesInCart(this())
        }

        static isNecessaryAddValuesInCart(chooseButton) {
            this.counterNumberButtonSelected = document.querySelectorAll('.number-default.active').length
            if (this.counterNumberButtonSelected === 0) {
                alert('Complete algum jogo para poder adicionar ao CART!')
                return
            }

            const gameData = JSON.parse(new AjaxRequest().loadData())
            let min_and_max_number

            gameData.types.forEach(gameType => {
                if (gameType.type === chooseButton.innerHTML) {
                    min_and_max_number = gameType.min_and_max_number
                }
            })

            if (min_and_max_number !== this.counterNumberButtonSelected) {
                alert(`selecione ${min_and_max_number - this.counterNumberButtonSelected} números`)
                return
            }

            AddToCart.createNewCartItem(chooseButton)
            this.counterNumberButtonSelected = 0
        }

        static checkIfIsNecessaryAddScroll() {
            const items = document.querySelector('.items')
            // mostrar a barrinha do scroll apenas se houverem 3 itens no carrinho
            if (items.children.length >= 0 && items.children.length < 3) {
                items.style.overflowY = 'hidden'

            }else if(items.children.length >= 3){
                items.style.overflowY = 'scroll'
            }
        }

        static createNewCartItem(chooseButton) {
            let items = document.querySelector('.items')

            

            let selectedNumberButtons = document.querySelectorAll('.number-default.active')

            let item = document.createElement('div')
            item.className = 'item'
            item.style.display = 'flex'
            item.style.alignItems = 'center'
            item.style.justifyContent = 'left'
            item.style.marginBottom = '7px'
            item.id = ++AddToCart.itemId

            let trashButton = this.createTrashButton()
            item.appendChild(trashButton)

            let verticalBar = this.createVerticalBar(chooseButton)

            item.appendChild(verticalBar)

            let itemContent = this.createItemContent(selectedNumberButtons, chooseButton)
            item.appendChild(itemContent)

            items.appendChild(item)

            //Limpar cartela após adicionar item
            this.cleanCart()

            // Associar o evento de click à lixeira
            trashButton.addEventListener('click', this.handleClickTrashButton.bind(item.id, items, itemContent))

            this.checkIfIsNecessaryAddScroll()
        }

        static createTrashButton() {
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

        static createVerticalBar(chooseButton) {
            let colorVerticalBar = chooseButton.style.background
            let verticalBar = document.createElement('div')
            verticalBar.style.width = '4px'
            verticalBar.style.height = '50px'
            verticalBar.style.borderRadius = '100px 0px 0px 100px'
            verticalBar.style.background = colorVerticalBar
            verticalBar.style.marginRight = '7px'

            return verticalBar
        }

        static createItemContent(selectedNumberButtons, chooseButton) {
            let itemContent = document.createElement('div')
            itemContent.className = 'item-content'
            itemContent.style.width = '150px'

            let numbersDiv = this.getContentOfSelectedNumberButtons(selectedNumberButtons)
            let gamePrice = this.createGamePrice(chooseButton)

            itemContent.appendChild(numbersDiv)
            itemContent.appendChild(gamePrice)

            return itemContent
        }

        static getContentOfSelectedNumberButtons(selectedNumberButtons) {
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

        static createGamePrice(chooseButton) {
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

        static getType(chooseButton) {
            let type = document.createElement('div')
            type.innerHTML = chooseButton.innerHTML
            type.style.color = chooseButton.style.background
            type.style.fontWeight = '600'
            type.style.fontStyle = 'italic'
            type.style.fontSize = '13px'

            return type
        }

        static getPrice(chooseButton) {
            let price = document.createElement('div')
            price.style.fontSize = '13px'
            price.style.marginLeft = '13px'
            price.className = 'price'

            let data = JSON.parse(new AjaxRequest().loadData())

            let sum = 0;
            data.types.forEach(game => {
                if (game.type === chooseButton.innerHTML) {
                    sum += game.price
                }
            })

            //USando a lib INTL para conversão de moedas
            const convertToRealCurrency = Intl.NumberFormat('pt-br', {
                currency: 'BRL',
                style: 'currency'
            });

            AddToCart.totalCartValue += sum;

            //Esse código soma o valor total do carrinho de compras
            const totalValueCartElementHtml = document.querySelector('span.totalValueCart');
            totalValueCartElementHtml.innerHTML = convertToRealCurrency.format(AddToCart.totalCartValue);

            price.innerHTML = convertToRealCurrency.format(sum);

            return price
        }

        static handleClickTrashButton(items, itemContent) {
            let subtraction = Number(itemContent.children[1].children[1].innerHTML.split(';')[1].replace(',', '.'))
            AddToCart.totalCartValue -= subtraction;

            //USando a lib INTL para conversão de moedas
            const convertToRealCurrency = Intl.NumberFormat('pt-br', {
                currency: 'BRL',
                style: 'currency'
            });

            //Esse código soma o valor total do carrinho de compras
            const totalValueCartElementHtml = document.querySelector('span.totalValueCart');
            totalValueCartElementHtml.innerHTML = convertToRealCurrency.format(AddToCart.totalCartValue);

            let itemToRemove = document.getElementById(this)
            items.removeChild(itemToRemove)

            AddToCart.checkIfIsNecessaryAddScroll()
        }

        static cleanCart() {
            let numberButtons = document.querySelectorAll('.number-default.active')
            numberButtons.forEach(number => {
                number.className = 'number-default'
            })
        }

    }

    window.AddToCart = AddToCart
})(window, window.AjaxRequest, document)