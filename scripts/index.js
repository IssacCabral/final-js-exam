(() => {
    'use strict'

    let $lotoButton = document.querySelector('button[data-js="loto-button"]')

    console.log($lotoButton)

    $lotoButton.addEventListener('click', function(){
        console.log('Clicou em mim baby')
    })
})()