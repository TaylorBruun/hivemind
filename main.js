
let clickUpgrade = {
    price: 15,
    owned: 1,
}

let beesUpgrade = {
    price: 10,
    owned: 0,
    
}

let beesPowerUpgrade = {
    price: 10,
    owned: 0,
}

let bankUpgrade = {
    price: 100,
    owned: 0,
}

class Bee {
    constructor(top, left){
        this.top = top
        this.left = left
    }
}





let upgrades = {clickUpgrade, beesUpgrade, beesPowerUpgrade, bankUpgrade}

let currHoney = 1000
let interestRate = 0.01
let beeArray = []


function newBee(){
 
    let bee = new Bee(Math.floor(Math.random()*100), Math.floor(Math.random()*100))
    beeArray.push(bee)
    beeDrawer()
    
}

function clickMine(){
    currHoney += clickUpgrade.owned
    updateHoney()
}

function updateHoney(){
    
    document.getElementById('honey-count').innerHTML = `<h1 class="text-center">Honey<p>🍯</p><br><p class="mb-3 pb-3">${Math.floor(currHoney)}</p></h1>`
}


function buyUpgrade(upgradeType) {
    if (currHoney >= upgradeType.price * (upgradeType.owned + 1)) {
        currHoney -= upgradeType.price * (upgradeType.owned + 1)
        upgradeType.owned += 1
        updateHoney()
        updateStats()
        if (upgradeType == beesUpgrade) {
            newBee()
        }
    }
}

function collectAuto(){
    currHoney = currHoney * (1+ (bankUpgrade.owned * (interestRate)))
    // should get 1% more honey per power
    currHoney += beesUpgrade.owned * (1 + (beesPowerUpgrade.owned/100) )
    updateHoney()
}





function updateClickStats(){
    document.getElementById('click-price').innerText = `Price: ${clickUpgrade.price * (clickUpgrade.owned + 1)}`
    document.getElementById('click-owned').innerText = `Owned: ${clickUpgrade.owned}`
}
function updateBeesStats(){
    document.getElementById('bees-price').innerText = `Price: ${beesUpgrade.price * (beesUpgrade.owned + 1)}`
    document.getElementById('bees-owned').innerText = `Owned: ${beesUpgrade.owned}`
}
function updateBeesPowerStats(){
    document.getElementById('power-price').innerText = `Price: ${beesPowerUpgrade.price * (beesPowerUpgrade.owned + 1)}`
    document.getElementById('power-owned').innerText = `Owned: ${beesPowerUpgrade.owned}`
}
function updateBankStats(){
    document.getElementById('bank-price').innerText = `Price: ${bankUpgrade.price * (bankUpgrade.owned + 1)}`
    document.getElementById('bank-owned').innerText = `Owned: ${bankUpgrade.owned}`
}

function updateStats(){
    updateClickStats()
    updateBeesPowerStats()
    updateBankStats()
    updateBeesStats()
}

function beeDrawer(){
    let template =''
    beeArray.forEach(bee => {
       template += `<p style="left: ${bee.left}%; top: ${bee.top}%" class="bee m-0 mdi mdi-bee"></p>`

    });
    document.getElementById('flightpath-window').innerHTML = template
}


function beeWander(){
    let bees = document.querySelectorAll('.bee')
    bees.forEach(bee => {
let posX = parseInt(bee.style.left)
let posY = parseInt(bee.style.top)
        posY += (Math.round(Math.random() * 2 -1))*4
        posX += (Math.round(Math.random() * 2 -1))*4
    //    NOTE upper and lower bounds for bee wandering
        if(posY >= 95){
            posY = 95
        }
        if(posY <= 0){
            posY = 0
        }
        if(posX >= 95){
            posX = 95
        }
        if(posX <= 0){
           posX = 0
        }
        bee.style.top = posY + '%'
        bee.style.left = posX + '%'
    });
    // beeDrawer()
    
}

function updateAllStats(){}


setInterval(collectAuto, 1000)
setInterval(beeWander, 2000)


updateHoney()
updateStats()