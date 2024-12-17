const myArray = ["Apple", "Banana", "Grape", "Cherry", "Kiwi", "Peach", "Pineapple", "Mango", "Orange"]
let shuffleArray = [];
let firstCard = null;
let secondCard = null;
let cardContainer = document.getElementById('card-container');
let pointContainer= document.getElementById('point')
let attemptContainer=document.getElementById('attempt')
let failAttemptContainer=document.getElementById('fail_attempt')
let alertContainer=document.getElementById('alert')
let point=0
let attempt=0
const detailArray=["red","yellow","purple","dark red","brown","pink","rough","sour","orange"]
const keyValuepair= {
    "Apple":"red",
    "Banana":"yellow",
    "Grape":"purple",
    "Cherry":"dark red",
    "Kiwi":"brown",
    "Peach":"pink",
    "Pineapple":"rough",
    "Mango":"sour",
    "Orange":"orange"
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

function compare( firstCard, secondCard) {
    let content1 = firstCard.children[1].textContent;
    let content2 = secondCard.children[1].textContent;
    let value1=keyValuepair[content1]
    let value2=keyValuepair[content2]
    
    attempt+=1;
    attemptContainer.textContent="Attempts: "+attempt
    setTimeout(function() {
        if(value1!=content2 && value2!=content1 ) {
            // CODE HERE: Compare and update the style to be block
            firstCard.children[0].style.display = 'block';
            secondCard.children[0].style.display = 'block';
            failAttemptContainer.textContent="Fail attempts: "+(attempt-point)
            if ((attempt-point) >5) {
                alertContainer.textContent="Be careful"
            }
            // END CODE
        } else {
            point+=1
            pointContainer.textContent="Points: "+point
        }
    }, 500);
}

function init() {
    let combineArray = myArray.concat(detailArray); // concat method
    
    shuffleArray = shuffle(combineArray);

    for(let i = 0; i < shuffleArray.length; i++) {
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = `card${i+1}`;

        // CODE HERE: Create a new div with class 'hidden-card'
        let hiddenCard = document.createElement('div')
        hiddenCard.className = "hidden-card"
        // END CODE

        // CODE HERE: Create a new p with class 'content'
        let contentElement = document.createElement('p');
        contentElement.className = 'content'
        contentElement.textContent = shuffleArray[i]
        // END CODE

        // CODE HERE: Append hiddenCard and content to newCard
        newCard.appendChild(hiddenCard)
        newCard.appendChild(contentElement)
        // END CODE

        newCard.addEventListener('click', function(event) {
            this.children[0].style.display = 'none'            
            // END CODE

            if(firstCard && secondCard) {
                console.log('both not empty')
                return;
            }
            if(firstCard == null) {
                firstCard = this;
            } else {
                if(secondCard == null) {
                    secondCard = this;
                }
            }
            if(firstCard && secondCard) {
                compare(firstCard, secondCard)
                firstCard = null;
                secondCard = null;  
            }
        })
        cardContainer.appendChild(newCard);
    }
}
init()