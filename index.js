const cards = document.querySelectorAll('.kortele');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if(lockBoard) return;
    if (this === firstCard) return;


    this.classList.add('flip');

    if (!hasFlippedCard){
        //pirmas paspaudimas
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        //antras paspaudimas
        hasFlippedCard = false;
        secondCard = this;

        //ar sutampa
        match();
};

function match(){
    if (firstCard.getAttribute('name') === secondCard.getAttribute('name')){
        disableCards();
    } else{
        unflipCards()

}}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}
function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card =>{
        let randomsk = Math.floor(Math.random() * 12);
        card.style.order = randomsk;
    })
}
)();

cards.forEach(card => card.addEventListener('click', flipCard));
