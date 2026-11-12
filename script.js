// --- DATA ---
const data = {
    stress: [
        {
            title: "Human - Rag'n'Bone Man",
            sentence: "Do you see it clearer or are you deceived?",
            options: ["Do", "you", "see", "it", "clearer", "or", "are", "you", "deceived"],
            correct: ["deceived"]
        },
        {
            title: "Crazy - Gnarls Barkley",
            sentence: "But think twice, that's my only advice",
            options: ["But", "think", "twice", "that's", "my", "only", "advice"],
            correct: ["twice", "advice"]
        },
        {
            title: "Tragedy - Bee Gees",
            sentence: "Bet you didn't know you make me cry",
            options: ["Bet", "you", "didn't", "know", "you", "make", "me", "cry"],
            correct: ["cry"]
        }
    ],
    concatenation: [
        {
            title: "Instant Crush - Daft Punk",
            parts: [
                "I didn't want to anymore, oh oh oh<br>And we will never be alone again<br>'Cause it doesn't happen every day<br>Kinda ",
                " ",
                " ",
                " ",
                " ",
                " friend<br>Can I give it up or give it away?<br>Now I thought about what I wanna say"
            ],
            answers: ["counted", "on", "you", "being", "a"]
        },
        {
            title: "Smells Like Teen Spirit - Nirvana",
            parts: [
                "I feel stupid and contagious<br>Here we are now, entertain us<br>A ",
                ", an ",
                "<br>A mosquito, my libido, yeah<br>Hey, yey"
            ],
            answers: ["mulatto", "albino"]
        },
        {
            title: "Another One Bites the Dust - Queen",
            parts: [
                "Steve walks warily down the street<br>with ",
                " ",
                " way ",
                " ",
                "<br>Ain't no sound but the sound of his feet<br>Machine guns ready to go"
            ],
            answers: ["the", "brim", "pulled", "down", "low"]
        }
    ],
    mainIdea: [
        {
            title: "Fight Club Speech",
            options: [
                { text: "They are more capable than the world leads them to believe, what they desire today is nothing more than an artificial construct designed to deceive them.", correct: false },
                { text: "Even though they haven't lived through a complex global crisis, they deal every day with the fact that the world leads them to believe they are nothing, and that wears them down.", correct: true },
                { text: "Their generation needs to find an external cause, such as a war or an economic crisis, in order to feel alive and give meaning to its existence.", correct: false }
            ]
        },
        {
            title: "La La Land Speech",
            options: [
                { text: "The girl believes that by not having to worry about auditions, she can avoid being judged and, finally, have time to go to school.", correct: false },
                { text: "Having had unfortunate experiences in the past led the girl to seek something else, which she found at school, but now she is tired of that world and wants nothing more to do with it.", correct: false },
                { text: "She is tired of having to deal with unfortunate situations, it has worn her out, and now she simply doesn't know whether she wants to move forward or not all because of the fear stemming from her past, which frustrates the guy.", correct: true }
            ]
        },
        {
            title: "The Boy in the Striped Pajamas",
            options: [
                { text: "The beliefs the Nazis hold regarding what Jews are like, as well as the image they have been sold of their enemies, whom they do not actually know, this is made evident in their conversation.", correct: false },
                { text: "The conversation reflects the boy's lack of historical knowledge, in contrast to the girl's extensive knowledge regarding Jews and Germans.", correct: false },
                { text: "The Germans harbor a profound stigma regarding what Jews are like, they simply underestimate them and perceive them as demons they happen to fear.", correct: true }
            ]
        }
    ]
};

// --- STATE ---
let currentTopic = "";
let currentCardIndex = -1;
let answered = false;
let currentCardData = null;

// --- ELEMENTS ---
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const cardContent = document.getElementById("card-content");
const topicTitle = document.getElementById("current-topic-title");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

// --- NAVIGATION & INITIALIZATION ---
document.querySelectorAll(".topic-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        startGame(e.target.dataset.topic);
    });
});

document.getElementById("back-btn").addEventListener("click", returnToMenu);
nextBtn.addEventListener("click", drawRandomCard);

function startGame(topic) {
    currentTopic = topic;
    menuScreen.style.display = "none";
    gameScreen.style.display = "block";
    
    // Formatear título para mostrar
    let displayTitle = topic;
    if (topic === "mainIdea") displayTitle = "Main Idea";
    if (topic === "concatenation") displayTitle = "Concatenation";
    topicTitle.innerText = displayTitle;
    
    drawRandomCard();
}

function returnToMenu() {
    menuScreen.style.display = "flex";
    gameScreen.style.display = "none";
}

// --- CARD LOGIC ---
function drawRandomCard() {
    answered = false;
    feedbackEl.innerText = "";
    feedbackEl.className = "";
    nextBtn.style.display = "none";
    
    const deck = data[currentTopic];
    currentCardIndex = Math.floor(Math.random() * deck.length);
    currentCardData = deck[currentCardIndex];

    cardContent.innerHTML = "";
    
    if (currentTopic === "stress") renderStress(currentCardData);
    if (currentTopic === "concatenation") renderConcatenation(currentCardData);
    if (currentTopic === "mainIdea") renderMainIdea(currentCardData);
}

// 1. STRESS
function renderStress(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = card.title;
    cardContent.appendChild(titleEl);

    const sentenceEl = document.createElement("div");
    sentenceEl.className = "stress-sentence";
    sentenceEl.innerText = card.sentence;
    cardContent.appendChild(sentenceEl);

    const optionsEl = document.createElement("div");
    optionsEl.className = "word-options";

    card.options.forEach(word => {
        const btn = document.createElement("button");
        btn.className = "word-btn";
        btn.innerText = word;
        btn.addEventListener("click", () => checkStress(btn, word, card.correct));
        optionsEl.appendChild(btn);
    });

    cardContent.appendChild(optionsEl);
}

function checkStress(btn, word, correctWords) {
    if (answered) return;
    
    // Remover signos de puntuación para comparar
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    
    if (correctWords.includes(cleanWord)) {
        btn.classList.add("correct");
        showFeedback(true);
    } else {
        btn.classList.add("incorrect");
        showFeedback(false);
    }
}

// 2. CONCATENATION
function renderConcatenation(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = card.title;
    cardContent.appendChild(titleEl);

    const textEl = document.createElement("div");
    textEl.className = "concat-text";

    let answerIndex = 0;
    
    // Construir el texto con los inputs
    card.parts.forEach(part => {
        textEl.insertAdjacentHTML("beforeend", part);
        if (answerIndex < card.answers.length) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "blank-input";
            input.style.width = (card.answers[answerIndex].length * 12 + 20) + "px";
            textEl.appendChild(input);
            answerIndex++;
        }
    });

    cardContent.appendChild(textEl);

    const checkBtn = document.createElement("button");
    checkBtn.className = "check-btn";
    checkBtn.innerText = "Check Answer";
    checkBtn.addEventListener("click", () => checkConcatenation(card.answers));
    cardContent.appendChild(checkBtn);
}

function checkConcatenation(answers) {
    if (answered) return;
    
    const inputs = document.querySelectorAll(".blank-input");
    let allCorrect = true;

    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        if (userAnswer === answers[index].toLowerCase()) {
            input.classList.add("correct");
            input.disabled = true;
        } else {
            input.classList.add("incorrect");
            input.disabled = true;
            allCorrect = false;
        }
    });

    document.querySelector(".check-btn").style.display = "none";
    showFeedback(allCorrect);
}

// 3. MAIN IDEA
function renderMainIdea(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = card.title;
    cardContent.appendChild(titleEl);

    const container = document.createElement("div");
    container.className = "main-idea-container";

    // Barajar opciones
    const shuffledOptions = [...card.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const div = document.createElement("div");
        div.className = "idea-option";
        div.innerText = option.text;
        div.addEventListener("click", () => checkMainIdea(div, option.correct, card.options));
        container.appendChild(div);
    });

    cardContent.appendChild(container);
}

function checkMainIdea(selectedDiv, isCorrect, allOptionsData) {
    if (answered) return;

    const allOptionDivs = document.querySelectorAll(".idea-option");
    
    if (isCorrect) {
        selectedDiv.classList.add("correct");
        showFeedback(true);
    } else {
        selectedDiv.classList.add("incorrect");
        
        // Encontrar y revelar la respuesta correcta
        allOptionDivs.forEach((div, index) => {
            // Buscamos la opción en los datos originales para saber si es la correcta
            const originalOption = allOptionsData.find(opt => opt.text === div.innerText);
            if (originalOption && originalOption.correct) {
                div.classList.add("correct");
            }
        });
        
        showFeedback(false);
    }
}

// --- UTILS ---
function showFeedback(isCorrect) {
    answered = true;
    if (isCorrect) {
        feedbackEl.innerText = "Correct! Great job.";
        feedbackEl.className = "feedback-success";
    } else {
        feedbackEl.innerText = "Incorrect. Review the answer above.";
        feedbackEl.className = "feedback-error";
    }
    nextBtn.style.display = "block";
}
