
//DATA_BASE

const data = [
    {id: 1, title: 'Молоко', price: 100, src: 'file:///C:/Users/kostuchenko/Desktop/NEW/касса%20—%20копия%20—%20копия/img/молоко.svg'},
    {id: 2, title: 'Хлеб', price: 200, src: 'file:///C:/Users/kostuchenko/Desktop/NEW/касса%20—%20копия%20—%20копия/img/хлеб.svg'},
    {id: 3, title: 'Шоколад', price: 300, src: 'file:///C:/Users/kostuchenko/Desktop/NEW/касса%20—%20копия%20—%20копия/img/шоколад.svg'},
    {id: 4, title: 'Вода', price: 400, src: 'file:///C:/Users/kostuchenko/Desktop/NEW/касса%20—%20копия%20—%20копия/img/вода.svg'},
]


//DOM

const form = document.querySelector('#form');
const cardUI = document.querySelector('#card');
const serch = document.querySelector('#serch');
const print = document.querySelector('#print');
const text = document.querySelector('#text');
const serchInput = document.querySelector('#serchInput');
const input = document.querySelector('#input');
const span = document.querySelector('span');

//Корзина товаров
let card = [];

//событе input

form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const item = data.find(el => el.id === Event.target[0].valueAsNumber) //найденное id значение

    if(item) { //есть ли такой товар
        card.push(getItem(item))
        Event.target[0].value = ''
    } else {
        alert("Товара нет")
    }


   while(cardUI.firstChild) { //удаляем дублирование элементов при вводе
        cardUI.firstChild.remove() 
    }
    
    updateUI()


})

//список товара при клике
input.addEventListener('click', function () {
    span.style.marginTop = '10px'
    span.style.fontWeight = '700';
    span.style.display = 'flex';
    span.style.justifyContent = 'space-between';
    span.style.flexDirection = 'column';
    span.style.alignItems = 'center';
    span.style.color = 'var(--color-btn-title)';
    span.textContent = `id: 1 - Молоко.  id: 2 - Хлеб.  id: 3 - Шоколад.  id: 4 - Вода.`
   
})

//ссумирование одинакового товара в UI

// const getItemData = (item) => {  //getItemData проверяет есть ли в коризне такой товар, если есть то изменяем существующий товар, а не добавляем новый
//     if(item.count) {
//         return `${item.title + " x" + item.count} __________ ${item.price * item.count}р__________________________${item.count}`
//     } else {
//         return`${item.title} __________ ${item.price}р\n` //если нет возвращаем такую строку
//     }
// }

//установка div элемента в UI
    
// const setItemInUICard = (item) => {  //создаём div элемент
//     const itemUI = document.createElement('div')
//     itemUI.textContent = getItemData(item) //добавляем текст контент

//     return itemUI // возвращаем созданный текст элемент
// }

//функция сравнения повторного товара в UI и ссумирование

const getItem = (item) => { 
    const element = card.find(el => el.id === item.id) //найденный первый элемент в массиве согласно переданному в параметре коллбэку
    const elementIndex = card.findIndex(el => el.id === item.id) //возвращает индекс первого найденного элемента в массиве элемента, подходящий под условие

    if(Boolean(element)) {
        card.splice(elementIndex, 1) //изменения содержимого массива путём удаления или замены
        return {
            ...element, //спрет оператор, превращает в массив
            count: element.count ? element.count + 1 : 2 //если товар в карточке есть, кол-во товара прибавляется
        }
    }
    return item
}

// const updateUI = () => {
//     cardUI.innerHTML = ''
//     card.forEach(item => cardUI.appendChild(setNewCardUI(item))) //отображение товара не карточке
//     text.textContent = `Итого:__________${card.reduce((acc, el) => acc += el.count ? el.count * el.price : el.price, 0)}рублей`
// }
// input.addEventListener('click', (e) => {
//     e.preventDefault();


 
const setNewCardUI = (item) => {

//функция списка при клике

const newCardUI = document.createElement('div')
newCardUI.style.display = 'flex';
newCardUI.style.justifyContent = 'space-between'

const img = document.createElement('img')
img.src = item.src
img.style.width = '30px';
img.style.height = '30px';
img.style.marginRight = '10px'
img.title = `ID товара: ${item.id}`
    

const nameTitle = document.createElement('span')
nameTitle.style.marginTop = '13px'
nameTitle.textContent = item.title
nameTitle.title = `ID товара: ${item.id}`

const countConteiner = document.createElement('div')
countConteiner.style.marginRight = '15px'
countConteiner.style.display = 'flex'
countConteiner.style.alignItems = 'center'
countConteiner.style.gap = '5px'

const plusBtn = document.createElement('button')
plusBtn.textContent = '+'
plusBtn.style.height = '20px';
plusBtn.style.width = '20px';
plusBtn.style.right = '25px';
plusBtn.style.borderRadius = '5px';
plusBtn.style.backgroundColor = 'var(--color-btn-title)';
plusBtn.style.color = 'var(--color-white)';
plusBtn.style.border = 'none';
plusBtn.style.cursor = 'pointer'
plusBtn.addEventListener('click', () => {
    item.count = (item.count || 1) + 1
    updateUI()
})

const minusBtn = document.createElement('button')
minusBtn.textContent = '-'
minusBtn.style.height = '20px';
minusBtn.style.width = '20px';
minusBtn.style.right = '25px';
minusBtn.style.borderRadius = '5px';
minusBtn.style.backgroundColor = 'var(--color-btn-title)';
minusBtn.style.color = 'var(--color-white)';
minusBtn.style.border = 'none';
minusBtn.style.cursor = 'pointer'
minusBtn.addEventListener('click', () => {
    if(item.count > 1) {
        item.count -= 1
    } else {
        card = card.filter(el => el.id !== item.id)
    }
    updateUI()
})

const countProduct = document.createElement('span')
countProduct.style.marginRight = '30px'
countProduct.textContent =  `${item.count || 1} x`

const countPrice = document.createElement('span')
countPrice.textContent = item.count || 1
countPrice.textContent = `${(item.count || 1) * item.price}р`

countConteiner.appendChild(countProduct)
countConteiner.appendChild(plusBtn)
countConteiner.appendChild(minusBtn)
countConteiner.appendChild(countPrice)

newCardUI.appendChild(img)
newCardUI.appendChild(nameTitle)
newCardUI.appendChild(countConteiner)

return newCardUI

}

const updateUI = () => {
    cardUI.innerHTML = ''
    card.forEach(item => cardUI.appendChild(setNewCardUI(item))) //отображение товара на карточке
    text.textContent = `Итого:__________${card.reduce((acc, el) => acc += el.count ? el.count * el.price : el.price, 0)}рублей`
}


//принт функция


const prinTotal = (card) => {

const printDiv = document.createElement ('div')
printDiv.style.top = '50%'
printDiv.style.left = '50%'
printDiv.style.transform = 'translate(-50%, -50%)'
printDiv.style.height = '300px'
printDiv.style.width = '600px'
printDiv.style.position = 'fixed'
printDiv.style.display = 'flex'
printDiv.style.justifyContent = 'space-between'
printDiv.style.flexDirection = 'column'
printDiv.style.alignItems = 'center'
printDiv.style.fontWeight = '700'
printDiv.style.border = '1px solid var(--color-btn-title)'
printDiv.style.backgroundColor = 'var(--color-white)'
printDiv.style.borderRadius = '5px'


const titlePrint = document.createElement ('span')
titlePrint.style.alignItems = 'center'
titlePrint.style.marginTop = '20px'
titlePrint.style.color = 'var(--color-btn-title)'
titlePrint.textContent = 'Ваш чек'
titlePrint.style.fontWeight = '700'


const sum = document.createElement ('span')
sum.style.color = 'var(--color-btn-title)'
sum.textContent = `Итого:____________${card.reduce((acc, el) => acc += el.count ? el.count * el.price : el.price, 0)}____рублей`


// кнопка удаления

const btnClose = document.createElement ('button')
btnClose.style.width = '150px'
btnClose.style.height = '30px'
btnClose.style.borderRadius = '5px'
btnClose.style.backgroundColor = 'var(--color-btn-title)'
btnClose.style.color = 'var(--color-white)'
btnClose.textContent = 'ЗАКРЫТЬ'
btnClose.addEventListener('click', () => {
    printDiv.remove()
})

//Эффект наведения
btnClose.addEventListener('mouseover', () => {
    btnClose.style.backgroundColor = 'rgba(191, 96, 36, 0.3)';
    btnClose.style.border = '1px solid var(--color-btn-title)';
    btnClose.style.color = 'var(--color-btn-title)';
    btnClose.style.transition = 'all 0.3s';
});

btnClose.addEventListener('mouseout',  () => {
    btnClose.style.width = '150px'
btnClose.style.height = '30px'
btnClose.style.borderRadius = '5px'
btnClose.style.backgroundColor = 'var(--color-btn-title)'
btnClose.style.color = 'var(--color-white)'
btnClose.textContent = 'ЗАКРЫТЬ';
});

//Создание элементов
document.body.appendChild(printDiv)

printDiv.appendChild(titlePrint)
printDiv.appendChild(sum)
printDiv.appendChild(btnClose)


return printDiv



}


print.addEventListener('click', () => {
    prinTotal(card)
})


input.addEventListener('click', (e) => {
    e.preventDefault();

    const getlist = (item) => {

        const textId = document.createElement('span')
        textId.textContent = `fdfdlfdl`
        list.appendChild(textId)
    }

    return getlist

    
})


