import $ from "jquery";

$(function () {
  const WORD = "APPLE";
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
    const wordArray = WORD.split("");

    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === wordArray[i]) {
        tiles.eq(startIndex + i).addClass("correct");
        wordArray[i] = null; // Mark this letter as used
      }
    }

    for (let i = 0; i < 5; i++) {
      if (tiles.eq(startIndex + i).hasClass("correct")) continue;
      if (wordArray.includes(guessArray[i])) {
        tiles.eq(startIndex + i).addClass("present");
        wordArray[wordArray.indexOf(guessArray[i])] = null;
      } else {
        const letterButton = $(`button[data-key="${guessArray[i]}"]`);
        letterButton.addClass("disabled");
        disabledKeys.push(guessArray[i]);
        tiles.eq(startIndex + i).addClass("absent");
      }
    }
  }

  function resetInput() {
    currentGuess = "";
  }

  function handleKey(key) {
    console.log(disabledKeys);
    console.log(key);
    if (disabledKeys.includes(key)) return;
    if (key === "ENTER") {
      if (currentGuess.length === 5) {
        checkGuess();
        currentAttempt++;
        resetInput();
      }
    } else if (key === "BACKSPACE") {
      currentGuess = currentGuess.slice(0, -1);
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      currentGuess += key;
    }
    updateBoard();
  }

  $("#keyboard button").on("click", function () {
    const key = $(this).data("key");
    handleKey(key);
  });

  $(document).on("keydown", function (e) {
    e.preventDefault();
    const key = e.key.toUpperCase();
    handleKey(key);
  });

  createBoard();
});
