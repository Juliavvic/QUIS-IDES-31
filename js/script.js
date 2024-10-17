const quizData = [
    {
        question: "Qual é o maior bioma brasileiro?",
        choices: ["Amazônia", "Cerrado", "Caatinga", "Mata Atlântica"],
        correct: 0,
        explanation: "A Amazônia abriga a maior parte da biodiversidade do Brasil."
    },
    {
        question: "Qual bioma é caracterizado por ser um deserto semiárido?",
        choices: ["Pampa", "Mata Atlântica", "Caatinga", "Pantanal"],
        correct: 2,
        explanation: "A Caatinga é um bioma árido, adaptado a longos períodos de seca."
    },
    {
        question: "Qual bioma é conhecido pela maior biodiversidade de fauna e flora do mundo?",
        choices: ["Amazônia", "Cerrado", "Pantanal", "Caatinga"],
        correct: 0,
        explanation: "A Amazônia é o bioma com a maior diversidade de espécies do mundo."
    },
    {
        question: "Qual bioma brasileiro é conhecido como o berço das águas?",
        choices: ["Amazônia", "Pantanal", "Cerrado", "Mata Atlântica"],
        correct: 2,
        explanation: "O Cerrado é conhecido por sua importância na regulação do ciclo da água."
    },
    {
        question: "Qual bioma é predominantemente encontrado no sul do Brasil?",
        choices: ["Cerrado", "Pantanal", "Pampa", "Caatinga"],
        correct: 2,
        explanation: "O Pampa é caracterizado por campos abertos e vegetação rasteira."
    },
    {
        question: "Qual bioma tem a maior planície alagável do mundo?",
        choices: ["Pantanal", "Caatinga", "Amazônia", "Cerrado"],
        correct: 0,
        explanation: "O Pantanal é uma das maiores áreas alagadas do mundo, favorecendo a biodiversidade."
    },
    {
        question: "Qual bioma tem uma vegetação adaptada a longos períodos de seca?",
        choices: ["Pantanal", "Caatinga", "Pampa", "Cerrado"],
        correct: 1,
        explanation: "A Caatinga é um bioma árido, adaptado a longos períodos de seca."
    },
    {
        question: "Qual bioma é caracterizado por campos naturais e pampas?",
        choices: ["Pantanal", "Mata Atlântica", "Pampa", "Amazônia"],
        correct: 2,
        explanation: "O Pampa é uma área com rica fauna e flora de campos abertos."
    },
    {
        question: "O conhecimento tradicional indígena sobre a Amazônia contribui para:",
        choices: ["A preservação da biodiversidade", "A destruição florestal", "A monocultura", "A urbanização"],
        correct: 0,
        explanation: "O conhecimento tradicional indígena é vital para a preservação ambiental."
    },
    {
        question: "Saberes tradicionais são essenciais para:",
        choices: ["Preservação do meio ambiente", "Exploração desenfreada", "Tecnologia de ponta", "Destruição cultural"],
        correct: 0,
        explanation: "Os saberes tradicionais ajudam na conservação da biodiversidade."
    },
    {
        question: "A biodiversidade do Pantanal é resultado de:",
        choices: ["Inundações periódicas", "Desertificação", "Desmatamento", "Agricultura intensiva"],
        correct: 0,
        explanation: "As inundações periódicas no Pantanal favorecem a biodiversidade e a dinâmica do ecossistema."
    },
    {
        question: "A agroecologia é uma prática social que envolve:",
        choices: ["Produção sustentável", "Monocultura", "Desmatamento", "Exploração industrial"],
        correct: 0,
        explanation: "A agroecologia promove a produção sustentável e a conservação do meio ambiente."
    },
    {
        question: "As tecnologias sociais no Cerrado ajudam na:",
        choices: ["Conservação dos recursos hídricos", "Urbanização", "Produção industrial", "Queimadas"],
        correct: 0,
        explanation: "As tecnologias sociais ajudam a conservar os recursos hídricos."
    },
    {
        question: "Qual é o bioma brasileiro mais ameaçado pela urbanização?",
        choices: ["Mata Atlântica", "Pantanal", "Amazônia", "Cerrado"],
        correct: 0,
        explanation: "A Mata Atlântica é um bioma altamente ameaçado pela urbanização e exploração."
    },
    {
        question: "O conhecimento local das comunidades ribeirinhas na Amazônia é essencial para:",
        choices: ["Manejo sustentável dos recursos naturais", "Exploração do turismo", "Agronegócio", "Indústria"],
        correct: 0,
        explanation: "O conhecimento local é essencial para o manejo sustentável na Amazônia."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];
let incorrectQuestions = [];
let hintsUsed = 0;
const maxHints = 3;

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    incorrectQuestions = [];
    hintsUsed = 0;
    selectedQuestions = shuffleArray(quizData).slice(0, 7); // Seleciona 7 perguntas aleatórias
    document.getElementById("intro").style.display = "none"; // Esconder a capa
    document.getElementById("result").style.display = "none";
    document.getElementById("review").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("hint-btn").style.display = "inline-block"; // Exibir botão de dica
    showQuestion();
}

window.onload = function() {
    document.getElementById("start-btn").addEventListener("click", startQuiz);
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const nextBtn = document.getElementById("next-btn");

    // Mostrar a pergunta
    questionElement.textContent = selectedQuestions[currentQuestion].question;

    // Limpar as escolhas anteriores
    choicesElement.innerHTML = '';

    // Mostrar as escolhas
    selectedQuestions[currentQuestion].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => checkAnswer(index);
        choicesElement.appendChild(button);
    });

    // Ocultar o botão "Próxima Questão" inicialmente
    nextBtn.style.display = "none";
}

function checkAnswer(selected) {
    const correct = selectedQuestions[currentQuestion].correct;

    if (selected === correct) {
        score++;
    } else {
        incorrectQuestions.push({
            question: selectedQuestions[currentQuestion].question,
            selected: selected,
            correct: correct
        });
    }

    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "block";

    // Verifica se é a última pergunta
    if (currentQuestion === selectedQuestions.length - 1) {
        showResult();
    } else {
        currentQuestion++;
        showQuestion();
    }
}

function showResult() {
    const resultElement = document.getElementById("result");
    const reviewElement = document.getElementById("review");
    const restartBtn = document.getElementById("restart-btn");

    resultElement.style.display = "block";
    reviewElement.style.display = "block";
    restartBtn.style.display = "block";

    resultElement.innerHTML = `Você acertou ${score} de ${selectedQuestions.length} questões.`;

    if (score === selectedQuestions.length) {
        resultElement.innerHTML += "<br>Parabéns, você adquiriu uma premiação!";
    } else {
        resultElement.innerHTML += "<br>Mais sorte na próxima vez!";
    }

    // Mostrar revisão das perguntas erradas
    reviewElement.innerHTML = "<h2>Revisão das Respostas:</h2>";
    incorrectQuestions.forEach((item) => {
        const question = item.question;
        const userAnswer = selectedQuestions.find(q => q.question === question).choices[item.selected];
        const correctAnswer = selectedQuestions.find(q => q.question === question).choices[item.correct];
        const explanation = selectedQuestions.find(q => q.question === question).explanation;

        reviewElement.innerHTML += `
            <p><strong>${question}</strong><br>
            Sua resposta: ${userAnswer}<br>
            Resposta correta: ${correctAnswer}</p>
            <p><em>${explanation}</em></p>
        `;
    });
}

function askForHint() {
    if (hintsUsed >= maxHints) {
        alert("Você não tem mais dicas disponíveis.");
        return;
    }

    if (confirm("Você quer pedir uma dica? Isso reduzirá sua premiação. Deseja continuar?")) {
        hintsUsed++;
        const correctIndex = selectedQuestions[currentQuestion].correct;
        const hint = selectedQuestions[currentQuestion].choices[correctIndex];
        alert(`Dica: ${hint}. ${selectedQuestions[currentQuestion].explanation}`);
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}