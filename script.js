let attempts = 0; let bulls = 0; let cows = 0;
let secretNumber = generateSecretNumber();
console.log(secretNumber);

let roundStats = {
  round: 1,
  wins: 0,
  loses: 0
}

function guessAnswer() {
  let guess = document.getElementById("guessInput").value;
  let secretString = secretNumber.join('');
  bulls = 0; cows = 0;

  const checkGuessLength = new Set(guess);

  if (guess.length !== checkGuessLength.size || guess.length !== 4) {
    document.getElementById("logsArea").value += `${guess} is invalid, please enter a number consisting of exactly 4 different digits.\n`;
    return null;
  }

  attempts += 1;

  for (let i = 0; i < 4; i += 1) {
    if (secretString[i] === guess[i]) {
      bulls += 1;
    } else if (secretString.includes(guess[i])) {
      cows += 1;
    }
  }

  if (bulls === 4) {
    document.getElementById("logsArea").value += `${secretString} | Well done, you have won ${attempts} tests.\n`;
    roundStats.wins += 1;
    return playAgain();
  } else if (attempts === 10) {
    document.getElementById("logsArea").value += `${secretString} | Too bad, you lost!\n`;
    roundStats.loses += 1;
    return playAgain();
  }

  document.getElementById("logsArea").value += `${guess} - ${bulls}B ${cows}C, try: ${attempts}\n`;
}

function playAgain() {
  roundStats.round += 1;
  printGameStats();
  attempts = 0; bulls = 0; cows = 0;
  secretNumber = generateSecretNumber();
}

function printGameStats() {
  const gameStats = document.getElementById("gameStats");
  gameStats.innerHTML = `R: ${roundStats.round} | V: ${roundStats.wins} | D: ${roundStats.loses}`;
}

function generateSecretNumber() {
  const numbers = Array.from({ length: 9}, (v, k) => k + 1);
  let currentIndex = numbers.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]];
  }

  return numbers.slice(0, 4);
}

function logsCleared() {
  document.getElementById("logsArea").value = "";
}

function giveRules() {
  alert("Enter a number made up of 4 different digits in the box next to 'Guess'. The computer compares it with the secret code and gives you two clues: the numbers 'bulls' (B) and cows (C). What does that mean? A 'bulls' is a digit that is present in both codes at the same position. A 'cows' is a digit that is present in both codes but in a different position. For example, if the passcode is 7512 and you try 5392, the response will be '1B 1C' (1 bull 1 cow). That's all!")
}