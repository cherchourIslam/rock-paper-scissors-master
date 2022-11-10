const buttonRule =document.querySelector('.rules-btn')
const buttonclose=document.querySelector('.close-btn')
const modalRule =document.querySelector('.modal')

const choiceArray =[
    {
        name:"paper",
        beat:"rock"
    },
    {
        name:"rock",
        beat:"lizard"
    },
    {
        name:"lizard",
        beat:"spock"
    },
    {
        name:"spock",
        beat:"scissors"
    },
    {
        name:"scissors",
        beat:"paper"
    },
    {
        name:"rock",
        beat:"scissors"
    },
    {
        name:"lizard",
        beat:"paper"
    },
    {
        name:"spock",
        beat:"rock"
    },
    {
        name:"scissors",
        beat:"lizard"
    },
    {
        name:"paper",
        beat:"spock"
    }
]

const buttonchoixArray =document.querySelectorAll('.choice-btn')
const main =document.querySelector('.main')
const resultDiv =document.querySelector('.result')
const resultDivs =document.querySelectorAll('.result-img')

const resultWinner =document.querySelector('.result-winner')
const resultText =document.querySelector('.result-text')
const playAgain =document.querySelector('.play-again')
const scoreNumber =document.querySelector('.score-number')
let score =0 

// logic de jeux

// get all element that get beat by the element choosed

buttonchoixArray.forEach(button =>{
    button.addEventListener('click',()=>{
        const choiceName =button.dataset.choice;
        const choiceObjectArray =new Array()

        choiceArray.forEach(element => { if(choiceName==element.name){
            choiceObjectArray.push({ name:element.name,
            beat:element.beat}) 
        }           
        });
       
        choose(choiceObjectArray)
    })
})

function choose(choiceObjectArray){
    const computerObjectArray = computerchoice()
    displayResult(choiceObjectArray,computerObjectArray)
    displayWinner(choiceObjectArray,computerObjectArray)
}


// get all element that get beat by the element choosed by computer

function computerchoice(){
    const number = Math.floor(Math.random()*choiceArray.length)
    const computerObjectArray =new Array()
    choiceArray.forEach(element => { if(choiceArray[number].name==element.name){
        computerObjectArray.push({ name:element.name,
        beat:element.beat}) 
    }           
    });

    return computerObjectArray
}

//------------------------------ see result -----------------------------------------------------------------

function  displayResult(choiceObjectArray,computerObjectArray){
    resultDivs.forEach((resultDiv,idx)=>{
     setTimeout(()=>{
        if(idx==0){
            resultDiv.innerHTML=`
            <div class="choice ${choiceObjectArray[idx].name}">
            <img src="images/icon-${choiceObjectArray[idx].name}.svg" alt="${choiceObjectArray[idx].name}"
            />
            </div>
            `
        }else{
            resultDiv.innerHTML=`
            <div class="choice ${computerObjectArray[idx].name}">
            <img src="images/icon-${computerObjectArray[idx].name}.svg" alt="${computerObjectArray[idx].name}"
            />
            </div>
            `
        }
            
     },idx*1000);
    });

    main.classList.toggle('hidden')
    modalRule.classList.toggle('hidden')
    buttonRule.classList.toggle('hidden')
    resultDiv.classList.toggle('hidden')

}

// --------------------- show the winner

function   displayWinner(choiceObjectArray,computerObjectArray){
 setTimeout(() => {
    
    var userWin = 0
    var computerWin = 0

    choiceObjectArray.forEach(element => {
        for (let index = 0; index < computerObjectArray.length; index++) {
            
            if(element.beat == computerObjectArray[index].name){
                userWin++;
            }else if(computerObjectArray[index].beat == element.name ){
                computerWin++;
            }
        }
        
    });


    if(userWin >computerWin ){
    
      setTimeout(() => {
        resultText.innerText="you win"
        playAgain.classList.toggle('hidden') 
        resultDivs[0].classList.toggle('winner')
        Reloadscore(1)
    }, 500);
    }else if(userWin <computerWin){
     
        setTimeout(() => {
            resultText.innerText="you lose"
            playAgain.classList.toggle('hidden') 
            resultDivs[1].classList.toggle('winner')
            Reloadscore(-1)
        }, 500);
       
    }else if(userWin == computerWin){
      
        setTimeout(() => {
            resultText.innerText="Draw"
            playAgain.classList.toggle('hidden') 
            resultDivs[0].classList.toggle('winner')
            resultDivs[1].classList.toggle('winner')
            Reloadscore(0)
        }, 500);
       
    }
 }, 1000);
 
    resultWinner.classList.toggle('hidden') 
    resultDiv.classList.toggle('show-winner')
}

function Reloadscore(point){
    score+=point
    scoreNumber.innerText=score
}

// show and hide rules

buttonRule.addEventListener('click',()=>{
    modalRule.classList.toggle('show-modal')
});
buttonclose.addEventListener('click',()=>{
    modalRule.classList.toggle('show-modal')
});

// try again


playAgain.addEventListener('click',()=>{

playAgain.classList.toggle('hidden')  
main.classList.toggle('hidden')
modalRule.classList.toggle('hidden')
buttonRule.classList.toggle('hidden')  
resultDiv.classList.toggle('hidden')
resultDiv.classList.toggle('show-winner')
resultDivs.forEach(element => {
    element.innerHTML =""
    element.classList.remove('winner')
});
 resultText.innerText=""
 resultWinner.classList.toggle('hidden')
 resultDivs.classList.toggle('show-winner')
 
 

})