$(document).ready(function() {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            $("#time").text(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showScore();
            }
        }, 1000);
    }

    function createQuiz() {
        questions.forEach((q, index) => {
            const questionHtml = `
                <div class="question" id="question-${index}">
                    <p>${q.question}</p>
                    ${q.options.map(option => `
                        <span class="option" data-answer="${q.answer}">${option}</span>
                    `).join('')}
                </div>
            `;
            $('#quiz').append(questionHtml);
        });
        $(`#question-${currentQuestionIndex}`).show().addClass('animate__animated animate__fadeIn');
    }

    function showScore() {
        $('#quiz').hide();
        $('#score').text(`Tu puntaje es: ${score} de ${questions.length}`).fadeIn().addClass('animate__bounceIn');
    }

    $('#quiz').on('click', '.option', function() {
        const selected = $(this).text();
        const correct = $(this).data('answer');
        if (selected === correct) {
            $(this).addClass('correct animate__animated animate__flash');
            score++;
        } else {
            $(this).addClass('incorrect animate__animated animate__shakeX');
        }
        $(this).siblings().off('click');
        setTimeout(function() {
            $(`#question-${currentQuestionIndex}`).fadeOut(function() {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    $(`#question-${currentQuestionIndex}`).fadeIn().addClass('animate__animated animate__fadeIn');
                } else {
                    clearInterval(timerInterval);
                    showScore();
                }
            });
        }, 1000); 
    });

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            createQuiz();
            startTimer();
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});