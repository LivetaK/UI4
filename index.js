document.addEventListener('DOMContentLoaded', function() {
const page = document.body.dataset.page;

if (page === "1") {
    const form = document.getElementById('pradinisPage');
    const resultsDiv = document.getElementById('resultsTable');

    const allResults = JSON.parse(sessionStorage.getItem('allResults')) || [];

    if (allResults.length > 0) {
        resultsDiv.innerHTML = '';
        allResults.forEach(result => {
            resultsDiv.innerHTML += `
                <p>Žaidėjas: <strong>${result.name}</strong>, Lygis: <strong>${result.level}</strong>, Moves: <strong>${result.moves}</strong></p>
            `;
        });
    } else {
        resultsDiv.innerHTML = `<p>Nėra rezultato</p>`;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const vardas = form.elements['vardas'].value;
        const sudetingumoLygis = form.elements['sudetingumoLygis'].value;

        sessionStorage.setItem('zaidejoVardas', vardas);
        sessionStorage.setItem('sudetingumoLygis', sudetingumoLygis);

        if (sudetingumoLygis === 'lengvas') {
            window.location.href = 'page2.html';
        } else if (sudetingumoLygis === 'vidutinis') {
            window.location.href = 'page3.html';
        } else if (sudetingumoLygis === 'sunkus') {
            window.location.href = 'page4.html';
        }
    });
    }else if (page === "2" || page === "3" || page === "4") {

        const cards = document.querySelectorAll('.kortele');

        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let movesCount = 0;
        let showMoves = document.getElementById('moves');

        const zaidejoVardas = sessionStorage.getItem('zaidejoVardas');
        const sudetingumoLygis = sessionStorage.getItem('sudetingumoLygis');

        const totalPairs = cards.length / 2;
        let porosSutampa = 0;

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


                movesCount++;
                showMoves.textContent = `Moves: ${movesCount}`;
                //ar sutampa
                match();
        };
        
        function match(){
            if (firstCard.getAttribute('name') === secondCard.getAttribute('name')){
                disableCards();
                porosSutampa++;
                if(porosSutampa === totalPairs){
                    endGame();
                }
            } else{
                unflipCards()
        
        }}
        
        function disableCards(){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
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
        function endGame() {
            const allResults = JSON.parse(sessionStorage.getItem('allResults')) || [];
            allResults.push({
                name: zaidejoVardas,
                level: sudetingumoLygis,
                moves: movesCount
            });
            sessionStorage.setItem('allResults', JSON.stringify(allResults));
            window.location.href = 'index.html';
        }
        
        (function shuffle(){
            cards.forEach(card =>{
                let randomsk = Math.floor(Math.random() * cards.length);
                card.style.order = randomsk;
            })
        }
        )();
        
        cards.forEach(card => card.addEventListener('click', flipCard));
    }
});


