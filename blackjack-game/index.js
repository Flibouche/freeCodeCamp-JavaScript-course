// Définition d'un objet joueur avec un nom et un nombre de jetons
let player = {
  name: "Kevin",
  chips: 200,
};

// Déclaration de variables pour les cartes, la somme, et les messages du jeu
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// Récupération des éléments du DOM
let messageEl = document.getElementById("message-el");
let cardsEl = document.getElementById("cards-el");
let sumEl = document.getElementById("sum-el");

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + " : $" + player.chips;

// Fonction pour obtenir une carte aléatoire
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1; // Génère un nombre aléatoire entre 1 et 13
  if (randomNumber > 10) {
    // Si le nombre est supérieur à 10, retourne 10 (pour les figures)
    return 10;
  } else if (randomNumber === 1) {
    // Si le nombre est égal à 1, retourne 11 (pour l'As)
    return 11;
  } else {
    // Sinon, retourne le nombre
    return randomNumber;
  }
}

// Fonction pour démarrer le jeu
function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

// Fonction pour mettre à jour l'affichage du jeu
function renderGame() {
  cardsEl.textContent = "Cards : ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum : " + sum;

  // Détermine le message à afficher en fonction de la somme des cartes
  if (sum <= 20) {
    message = "Do you want to draw a new card ?";
  } else if (sum === 21) {
    message = "You've got Blackjack !";
    hasBlackJack = true;
  } else {
    message = "You're out of the game !";
    isAlive = false;
  }

  messageEl.textContent = message;
}

// Fonction pour tirer une nouvelle carte
function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

// Fonction pour lancer un dé
function rollDice() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}