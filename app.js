import {
    dataHouses,
    startHouses
} from "./dataHouses.js";

const housesArea = document.querySelector('.houses-area')
const form = document.querySelector('.form')
let cities = [...document.querySelectorAll(`input[name="city"]`)]
let squares = [...document.querySelectorAll(`input[name="squares"]`)]
const formRange = document.querySelector('.form__range')
let currentHouses;

const renderHouses = (arr) => {
    arr.forEach(element => {
        const {
            id,
            name,
            img,
            price,
            city,
            bathroom,
            bedroom,
            square,
            description
        } = element
        element = `
        <div class="house" id-house="${id}">
                <img src="${img}" alt="house" class="house__img">
                <div class="house__top">
                    <h3 class="house__title">${name}</h3>
                    <div class="house__location"><i class="fa-solid fa-location-dot house__location-icon"></i><span
                            class="house__location-city">${city}, USA</span></div>
                </div>
    
                <div class="house__info">
                    <div class="house__info-stats"><i class="fa-solid fa-bath"></i><span
                            class="house__info-bathroom">Bathroom: ${bathroom}</span></div>
                    <div class="house__info-stats"><i class="fa-solid fa-bed"></i><span class="house__info-bedroom">Bedroom:
                            ${bedroom}</span></div>
                    <div class="house__info-stats"><i class="fa-solid fa-table-cells-large"></i><span
                            class="house__info-squares">${square} sq ft</span></div>
                </div>
    
                <div class="house__description">
                    <p class="house__description-text">${description}</p>
                </div>
                <div class="house__line"></div>
    
                <div class="house__bottom">
                    <p class="house__bottom-price">${price}$</p>
                    <button class="house__bottom-btn">Ask an advisor</button>
                </div>
            </div>
        `
        housesArea.innerHTML += element
    })
    if (housesArea.childNodes.length === 0) {
        housesArea.innerHTML = `<div style="display: flex; justify-content: center;">
        <p style="margin: 1.25rem 0; text-align: center;">No Results. Please change the parameters.</p>
        </div>`
    }
}

// function filterHouse (e) {
//     e.preventDefault();
//     currentHouses = []
//     let cities = document.querySelectorAll(`input[name="city"]`)
//     cities.forEach((city,index) => {
//         if(city.checked)  {
//             const filterCity = dataHouses.filter(house => house.city === city.id && city.checked)
//             const filtered = {...filterCity}
//             console.log(filterCity)
//             // const filtered = Object.assign({}, ...filterCity)
//             // console.log(filtered)
//             // currentHouses.push(filterCity)
//             currentHouses.push(filtered)
//             // console.log(currentHouses)
//             housesArea.innerHTML = ''
//             renderHouses(currentHouses)
//         }
//     })
//     // console.log(currentHouses)
// }

renderHouses(startHouses)

cities.forEach((city, index) => {
    city.addEventListener('input', () => {
        if (city.id === 'miami' || city.id === 'new-york' || city.id === 'dallas' || city.id === 'los-angeles') {
            const filterCity = dataHouses.filter(house => house.city === city.id && house.price < formRange.value)
            currentHouses = filterCity
            housesArea.innerHTML = ''
            renderHouses(currentHouses)
            console.log(city.id)
        }
    })
})

formRange.addEventListener('input', () => {
    housesArea.innerHTML = ''
    squares.forEach(square => {
        cities.forEach(city => {
            if (city.checked && square.checked) {
                const filterRange = dataHouses.filter(house => house.price < formRange.value && house.city === city.id)
                currentHouses = filterRange
                renderHouses(currentHouses)
            }
        })
    })
})

squares.forEach(square => {
    square.addEventListener('input', () => {
        housesArea.innerHTML = ''
        console.log(square.id)
        if (square.id === 'below') {
            const filterSquares = dataHouses.filter(house => house.square <= 1000 && house.price < formRange.value)
            currentHouses = filterSquares
        } else if (square.id === 'middle') {
            const filterSquares = dataHouses.filter(house => house.square >= 1001 && house.square <= 1500 && house.price < formRange.value)
            currentHouses = filterSquares
        } else if (square.id === 'above') {
            const filterSquares = dataHouses.filter(house => house.square >= 1501 && house.price < formRange.value)
            currentHouses = filterSquares
        } else if (square.id === 'all') currentHouses = dataHouses
        renderHouses(currentHouses)
    })
})


const inputRange = document.querySelector('.form__range')
const priceAmount = document.querySelector('.form__price-amount')
let price = inputRange.value
priceAmount.innerHTML = `Max Price: ` + price + "$"

inputRange.addEventListener('input', () => {
    price = inputRange.value
    priceAmount.innerHTML = `Max Price: ` + price + "$"
})

const btnFilter = document.querySelector('.form__btn')

// btnFilter.addEventListener('click', filterHouse)