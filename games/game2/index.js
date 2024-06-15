import $ from "jquery";
$(document).ready(function() {
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let currentQuestion = 0;

    const questions = [
        {
            mainImage: "/src/Games/Game2/Quiz Pictures/Party Drinking.jpg",
            correctOption: "/src/Games/Game2/Quiz Pictures/Take Uber.jpg",
            incorrectOption: "/src/Games/Game2/Quiz Pictures/Drive Drunk.jpg"
        },
        {
            mainImage: "/src/Games/Game2/Quiz Pictures/Yellow TrafficLight.jpg",
            correctOption: "/src/Games/Game2/Quiz Pictures/Brake.jpg",
            incorrectOption: "/src/Games/Game2/Quiz Pictures/Accelerate.jpg"
        },
        {
            mainImage: "/src/Games/Game2/Quiz Pictures/Bicicle.jpg",
            correctOption: "/src/Games/Game2/Quiz Pictures/Bicicenda.jpg",
            incorrectOption: "/src/Games/Game2/Quiz Pictures/Autopista.jpg"
        },
        {
            mainImage: "/src/Games/Game2/Quiz Pictures/PedestrianLight.jpg",
            correctOption: "/src/Games/Game2/Quiz Pictures/Crosswalk.jpg",
            incorrectOption: "/src/Games/Game2/Quiz Pictures/CrossIncorrectly.jpg"
        },
        {
            mainImage: "/src/Games/Game2/Quiz Pictures/Motorbike.jpg",
            correctOption: "/src/Games/Game2/Quiz Pictures/WithHelmet.jpg",
            incorrectOption: "/src/Games/Game2/Quiz Pictures/WithoutHelmet.jpg"
        }
    ];

    function startGame() {
        $('#startButton').hide();
        $('#app').hide();
        $('#gameArea').show();
        $('#scoreBoard').show();
        $('#timer').show();
        $('#questionText').show();
        currentQuestion = 0;
        loadQuestion(currentQuestion);
        gameInterval = setInterval(function() {
            timeLeft--;
            $('#timer').text('Tiempo: ' + timeLeft);
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                endGame();
            }
        }, 1000);
    }

    function loadQuestion(index) {
        if (index < questions.length) {
            $('#questionText').text("En base a la imagen de la izquierda, elija la mejor opción de la derecha");
            $('#mainImage').attr('src', questions[index].mainImage);
            const options = shuffle([questions[index].correctOption, questions[index].incorrectOption]);
            $('#option1 img').attr('src', options[0]);
            $('#option1').data('correct', options[0] === questions[index].correctOption);
            $('#option2 img').attr('src', options[1]);
            $('#option2').data('correct', options[1] === questions[index].correctOption);
        } else {
            clearInterval(gameInterval);
            endGame();
        }
    }

    function endGame() {
        if (score >= 3) {
            $('#gameArea').addClass('win');
            setTimeout(() => {
                alert('¡Felicidades! Has ganado el juego. Tu puntuación es: ' + score);
                resetGame();
            }, 2000);
        } else {
            $('#gameArea').addClass('lose');
            setTimeout(() => {
                alert('¡Inténtalo de nuevo! Tu puntuación es: ' + score);
                resetGame();
            }, 2000);
        }
    }

    function resetGame() {
        score = 0;
        timeLeft = 30;
        $('#scoreBoard').text('Puntuación: ' + score).hide();
        $('#timer').text('Tiempo: ' + timeLeft).hide();
        $('#gameArea').hide();
        $('#app').show();
        $('#startButton').show();
        $('#questionText').hide();

    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    $('#startButton').on('click', function() {
        startGame();
    });

    $('.imageButton').on('click', function() {
        const isCorrect = $(this).data('correct');
        if (isCorrect) {
            score++;
            $(this).addClass('correct');
        } else {
            $(this).addClass('incorrect');
        }
        $('#scoreBoard').text('Puntuación: ' + score);
        
        setTimeout(() => {
            currentQuestion++;
            loadQuestion(currentQuestion);
            $('.imageButton').removeClass('correct incorrect'); // Reset the classes
        }, 1000); // Wait for 1 second before moving to the next question
    });

    resetGame(); // Inicializa el juego en estado reseteado
});