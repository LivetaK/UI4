document.addEventListener('DOMContentLoaded', function() {
const page = document.body.dataset.page;

if (page === "1") {
    const form = document.getElementById('pradinisPage');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const varas = form.elements['vardas'].value;
        const sudetingumoLygis = form.elements['sudetingumoLygis'].value;

        sessionStorage.setItem('zaidejoVardas', varas);
        sessionStorage.setItem('sudetingumoLygis', sudetingumoLygis);

        if (sudetingumoLygis === 'lengvas') {
            window.location.href = 'page2.html';
        } else if (sudetingumoLygis === 'vidutinis') {
            window.location.href = 'page3.html';
        } else if (sudetingumoLygis === 'sunkus') {
            window.location.href = 'page4.html';
        }
    });
    }
});



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
    }, 800);

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
