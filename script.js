//---------------------------------------DEFINITIONER---------------------------------------//

let cards = Math.round(Math.random()* 52)
let listOfCards = []
let counter = 0
let listOfCardsCopy = []
let listWithLists = []

//---------------------------------------FUNKTIONER---------------------------------------//


function randomButton() { /* Låter användaren generera ett slumpmässigt antal stackar med ett slumpmässigt antal kort i sig */
    document.getElementById("submit").disabled = false /* Gör så att knappen går att trycka på om den tidigare varit disabled */
    randomCards = []
    trueOrFalse = false
    let cards = Math.round(Math.random()* 52)

    while (cards > 0) {
        i = Math.round(Math.random()* cards) + 1
        randomCards.push(i)
        cards = cards - i
    }

    randomCards = randomCards.sort(function(a, b) {
        return a - b
    })

    document.getElementById("lista").value = randomCards /* Importerar siffrorna man skrivit in till listan som används */
}

function submitButton() { /* Låter användaren skicka in sina val av korthögar */
    document.getElementById("submit").disabled = true /* Gör att det inte går att trycka på knappen igen för att undvika spamm */
    document.getElementById("skip").disabled = false /* Gör att det går att trycka på kanppen igen efter att den varit avstängd */
    document.getElementById("continue").disabled = false
    trueOrFalse = false
    let sum = 0
    let txt1List = []
    txt1 = document.getElementById("lista") /* Tar det man skriver in i inmatningsrutan och gör till en sträng */
    txt1List = txt1.value.split(",")

    for (let i = 0; i < txt1List.length; i++) {
        sum += Number(txt1List[i])
        txt1List[i] = Number(txt1List[i])
        if (typeof(txt1List[i]) != Number) {
            txt1List.pop([i])
        }
    }

    if (sum > 52) {
        console.log("Du kan inte använda fler än 52 kort.")
        document.getElementById("submit").disabled = false
    }

    else if (document.getElementById("lista").value == [""]) {
        console.log("Skriv in några högar med kort eller slumpa fram dem!")
        document.getElementById("submit").disabled = false
    }

    else {
        listOfCards = txt1List
        listOfCards = listOfCards.sort(function(a, b) {
            return a - b
        })
        listWithLists.push(listOfCards)
        console.log(listOfCards)
    }
}

function continueButton() { /* Låter en göra ett drag i taget */
    counter += 1
    listOfCardsCopy = listOfCards
    let newList = []

    for (let i = 0; i < listOfCards.length; i++) {
        if (listOfCards[i] > 1 ) {
            newList.push(listOfCards[i]-1)
        }
    }

    newList.push(listOfCards.length)
    listOfCards = newList
    listOfCards = listOfCards.sort(function(a, b) {
        return a - b
      })

    console.log(listOfCards)

    if (listOfCards.toString() == listOfCardsCopy.toString()) {
        document.getElementById("skip").disabled = true
        document.getElementById("continue").disabled = true
        document.getElementById("submit").disabled = true
        document.getElementById("random").disabled = true
        document.getElementById("lista").disabled = true
        console.log("Två drag upprepade sig efter varandra och patiansen gick ut. Grattis! Upptäckt efter " + counter + " drag.")
        document.getElementById("text").innerText = "Två drag upprepade sig efter varandra och patiansen gick ut. Grattis! Upptäckt efter " + counter + " drag."
        var paragraph = document.getElementById("text")
        paragraph.classList.toggle("highlight")
        listWithLists = []
        counter = 0
    }

    else if (listWithLists.toString().includes(listOfCards.toString())) {
        document.getElementById("skip").disabled = true
        document.getElementById("continue").disabled = true
        document.getElementById("submit").disabled = true
        document.getElementById("random").disabled = true
        document.getElementById("lista").disabled = true
        counter += 1
        console.log("Patiansen har upprepats och kan därför inte gå ut. Upptäckt efter " + counter + " drag.")
        document.getElementById("text").innerText = "Patiansen har upprepats och kan därför inte gå ut. Upptäckt efter " + counter + " drag." 
        var paragraph = document.getElementById("text")
        paragraph.classList.toggle("highlight")
        trueOrFalse = true
        listWithLists = []
        counter = 0
    }

    listWithLists.push(listOfCards)
}

function skipButton() { /* Gör alla drag tills patiansen antingen går ut eller visas omöjlig */
    while (listOfCards.toString() != listOfCardsCopy.toString() && trueOrFalse == false) {
        continueButton()
    }
    listWithLists = []
}

function resetButton() { /* Tömmer alla listor, textfältet och konsollen */
    listWithLists = []
    listOfCards = []
    listOfCardsCopy = []
    counter = 0
    document.getElementById("lista").value = " "
    document.getElementById("text").innerText = ""
    console.clear()
    var paragraph = document.getElementById("text")
    paragraph.classList.remove("highlight")
    document.getElementById("submit").disabled = true
    document.getElementById("random").disabled = false
    document.getElementById("lista").disabled = false
}

function textChange() { /* Gör så att man kan använda submitButton igen om man ändrar något i inmatningsrutan */
    document.getElementById("submit").disabled = false
}
