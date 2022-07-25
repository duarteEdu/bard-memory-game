const cardArray = [
    {
        name: 'bard',
        img: './images/bard.jpg'
    },
    {
        name: 'bard-bard',
        img: './images/bard-bard.jpg'
    },
    {
        name: 'austronaut-bard',
        img: './images/austronaut-bard.jpg'
    },
    {
        name: 'elderwood-bard',
        img: './images/elderwood-bard.jpg'
    },
    {
        name: 'snow-day-bard',
        img: './images/snow-day-bard.jpg'
    },
    {
        name: 'meeps',
        img: './images/meeps.jpg'
    },
    {
        name: 'bard',
        img: './images/bard.jpg'
    },
    {
        name: 'bard-bard',
        img: './images/bard-bard.jpg'
    },
    {
        name: 'austronaut-bard',
        img: './images/austronaut-bard.jpg'
    },
    {
        name: 'elderwood-bard',
        img: './images/elderwood-bard.jpg'
    },
    {
        name: 'snow-day-bard',
        img: './images/snow-day-bard.jpg'
    },
    {
        name: 'meeps',
        img: './images/meeps.jpg'
    },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDislay = document.querySelector('#grid');
const resultDislay = document.querySelector('#result');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', './images/blank.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDislay.append(card);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');

    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
        resultDislay.textContent = 'Você clicou na mesma imagem :/';
        cards[optionOneId].setAttribute('src', './images/blank.jpg');
        cards[optionTwoId].setAttribute('src', './images/blank.jpg');
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        resultDislay.textContent = 'Nice!';
        cards[optionOneId].setAttribute('src', './images/nice.png');
        cards[optionOneId].removeEventListener('click', flipCard);

        cards[optionTwoId].setAttribute('src', './images/nice.png');
        cards[optionTwoId].removeEventListener('click', flipCard);

        cardsWon.push(cardsChosen);

        scoreUpdate(10);
    } else {
        cards[optionOneId].setAttribute('src', './images/blank.jpg');
        cards[optionTwoId].setAttribute('src', './images/blank.jpg');
        resultDislay.textContent = 'Tente outra vez!';
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === (cardArray.length / 2)) {
        resultDislay.textContent = 'Você encontrou todos!';
    }
}

// "this" se refere ao card clicado nesse caso
function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

let score = 0;

function scoreUpdate(x) {
    $({ score: 0 }).animate({ score: x }, {
        duration: 1000,
        easing: "linear",
        step: function (now, fx) {
            $("#score").html(score + Math.floor(now));
        },
        queue: false,
        complete: function (now, fx) {
            score += x;
        }
    });
    $("#tag").html("");
    $("#tag").append(`+${x}`).fadeIn({
        duration: 700,
        easing: "linear",
        step: function (now, fx) {
            $(this).css("top", -55 * now + "px");
        }
    }).fadeOut({
        duration: 300,
        step: function (now, fx) {
            $(this).css("top", -55 * (2 - now) + "px");
        }
    });
}

createBoard();