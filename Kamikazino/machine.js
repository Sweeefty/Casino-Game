//tableau de symboles possibles
const symbols = [ "🍒", "🍇", "🍊", "🍓"];


//solde initial du joueur
let balance = 1000;

//références aux éléments HTML
const reels = document.querySelectorAll('.reel .symbol');
const balanceElement = document.getElementById('balance');
const betAmountInput = document.getElementById('bet-amount');
const placeBetButton = document.getElementById('place-bet-button');
const resultElement = document.getElementById('result');

// Fonction pour obtenir un symbole aléatoire
function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

// Fonction pour vérifier si les symboles sur les bobines sont alignés
function checkWin() {
  const symbol1 = reels[1].textContent;
  const symbol2 = reels[4].textContent;
  const symbol3 = reels[7].textContent;

  if (symbol1 === symbol2 && symbol2 === symbol3) {
    return true;
  } else {
    return false;
  }
}

// Fonction pour mettre à jour l'affichage du solde
function updateBalance(amount) {
  balance += amount;
  balanceElement.textContent = balance;
}

// Fonction pour lancer le jeu de machine à sous
function spinReels() {
  const betAmount = parseInt(betAmountInput.value);
  if (betAmount > balance) {
    resultElement.textContent = "Mise invalide. Vous n'avez pas suffisamment de fonds.";
    return;
  }

  // Réinitialiser le résultat
  resultElement.textContent = "";

  // Générer des symboles aléatoires
  reels.forEach(reel => {
    reel.textContent = getRandomSymbol();
  });

  // Vérifier le gain
  if (checkWin()) {
    const winAmount = betAmount * 2;
    updateBalance(winAmount);
    resultElement.textContent = `Félicitations ! Vous avez gagné ${winAmount}.`;
  } else {
    const lossAmount = betAmount;
    updateBalance(-lossAmount);
    resultElement.textContent = `Désolé, vous avez perdu ${lossAmount}. Essayez encore.`;
  }
}

// Gestionnaire d'événement pour le bouton "Placer la mise"
placeBetButton.addEventListener('click', spinReels);
