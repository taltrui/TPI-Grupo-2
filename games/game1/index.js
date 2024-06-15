const WORDS = [
  "CALLE",
  "NORMA",
  "RADAR",
  "FRENO",
  "PEAJE",
  "LUCES",
  "CINTO",
  "CURVA",
  "RAMPA",
  "SEÑAL",
  "PARAR",
  "MULTA",
  "CRUCE",
  "VIAJE",
  "CEDER",
];

$(function () {
  const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
  console.log(WORD)
  const MAX_ATTEMPTS = 6;
  let currentAttempt = 0;
  let currentGuess = "";
  const disabledKeys = [];

  function createBoard() {
    const board = $("#board");
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      for (let j = 0; j < 5; j++) {
        board.append('<div class="tile"></div>');
      }
    }
  }

  function resetGame() {
    location.reload();
  }

  function updateBoard() {
    const tiles = $("#board .tile");
    const startIndex = currentAttempt * 5;
    for (let i = 0; i < 5; i++) {
      tiles.eq(startIndex + i).text(currentGuess[i] ?? "");
    }
  }

  function checkGuess() {
    const tiles = $("#board .tile");
    const startIndex = currentAttempt * 5;
    const guessArray = currentGuess.split("");
    const originalWordArray = WORD.split("");
    const wordArray = WORD.split("");

    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === wordArray[i]) {
        tiles.eq(startIndex + i).addClass("correct");
        wordArray[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (tiles.eq(startIndex + i).hasClass("correct")) continue;
      if (originalWordArray.includes(guessArray[i])) {
        if (wordArray.includes(guessArray[i])) {
          tiles.eq(startIndex + i).addClass("present");
        } else {
          tiles.eq(startIndex + i).addClass("absent");
        }
        wordArray[wordArray.indexOf(guessArray[i])] = null;
        continue;
      } else {
        const letterButton = $(`button[data-key="${guessArray[i]}"]`);
        letterButton.addClass("disabled");
        disabledKeys.push(guessArray[i]);
        tiles.eq(startIndex + i).addClass("absent");
      }
    }

    if (currentAttempt === MAX_ATTEMPTS - 1 && currentGuess !== WORD) {
      const result = $("#result");
      result.addClass("lost show");
      result.append(`<p>¡Perdiste!</p>`);
      result.append(`<p>La palabra era: ${WORD}</p>`);
      const reset = $("#reset");
      reset.addClass("show");
      reset.on("click", resetGame)
    }

    if (currentGuess === WORD) {
      const result = $("#result");
      result.addClass("won show");
      result.append(`<p>¡Ganaste!</p>`);
      const reset = $("#reset");
      reset.addClass("show");
      reset.on("click", resetGame)
    }
  }

  function resetInput() {
    currentGuess = "";
  }

  function handleKey(key) {
    if (disabledKeys.includes(key)) return;
    if (key === "ENTER") {
      if (currentGuess.length === 5) {
        checkGuess();
        currentAttempt++;
        resetInput();
      }
    } else if (key === "BACKSPACE") {
      currentGuess = currentGuess.slice(0, -1);
    } else if (currentGuess.length < 5 && /^[A-ZÑ]$/.test(key)) {
      currentGuess += key;
    }
    updateBoard();
  }

  $("#keyboard button").on("click", function () {
    const key = $(this).data("key");
    handleKey(key);
  });

  $(document).on("keydown", function (e) {
    const key = e.key.toUpperCase();
    if (key === "ENTER" || key === "BACKSPACE") {
      e.preventDefault();
    }
    handleKey(key);
  });

  createBoard();
});
