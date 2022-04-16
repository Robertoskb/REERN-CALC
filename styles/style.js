const el = document.getElementById('b')
const button = document.querySelector('.button')
const checkDevice = Modernizr.touchevents 

if (!checkDevice){
    el.addEventListener('mouseenter', () => el.classList.add('enter'))
    el.addEventListener('mouseout', () => el.classList.remove('enter', 'mousedown'))

    el.addEventListener('mousedown', () => el.classList.add('mousedown'))
    el.addEventListener('mouseup', () => el.classList.remove('mousedown'))

}

else{
    el.addEventListener('touchstart', () => el.classList.add('touchenter'))
    el.addEventListener('touchend', () => el.classList.remove('touchenter'))
    
}


function logResult(){
    createtags.style.display = 'block'
    button.style.display = 'none'
    
}

function getoutResult(){
    createtags.style.display = 'none'
    button.style.display = 'block'
}




