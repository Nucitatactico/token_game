// --- GAME DATA ---
const data = {
    stress: [
        {
            title: "Human - Rag'n'Bone Man",
            sentence: "Do you see it clearer or are you deceived?",
            options: ["Do", "you", "see", "it", "clearer", "or", "are", "you", "deceived"],
            correct: ["deceived"],
            videoUrl: "https://www.youtube.com/embed/L3wKzyIN1yk?start=39&end=50"
        },
        {
            title: "Crazy - Gnarls Barkley",
            sentence: "But think twice, that's my only advice",
            options: ["But", "think", "twice", "that's", "my", "only", "advice"],
            correct: ["twice", "advice"],
            videoUrl: "https://www.youtube.com/embed/6VzM7CE3VoE?start=95&end=110"
        },
        {
            title: "Tragedy - Bee Gees",
            sentence: "Bet you didn't know you make me cry",
            options: ["Bet", "you", "didn't", "know", "you", "make", "me", "cry"],
            correct: ["cry"],
            videoUrl: "https://www.youtube.com/embed/xB8_hbRiVrs?start=74&end=86"
        },
        {
            title: "Shape of You - Ed Sheeran",
            sentence: "I'm in love with your body",
            options: ["I'm", "in", "love", "with", "your", "body"],
            correct: ["body"],
            videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8?start=10&end=20"
        }
    ],
    concatenation: [
        {
            title: "Instant Crush - Daft Punk",
            parts: [
                "I didn't want to anymore, oh oh oh<br>And we will never be alone again<br>'Cause it doesn't happen every day<br>Kinda ",
                " ", " ", " ", " ", 
                " friend<br>Can I give it up or give it away?<br>Now I thought about what I wanna say"
            ],
            answers: ["counted", "on", "you", "being", "a"],
            videoUrl: "https://www.youtube.com/embed/a5uQMwRMHcs?start=89&end=102"
        },
        {
            title: "Smells Like Teen Spirit - Nirvana",
            parts: [
                "I feel stupid and contagious<br>Here we are now, entertain us<br>A ",
                ", an ",
                "<br>A mosquito, my libido, yeah<br>Hey, yey"
            ],
            answers: ["mulatto", "albino"],
            videoUrl: "https://www.youtube.com/embed/hTWKbfoikeg?start=65&end=82"
        },
        {
            title: "Another One Bites the Dust - Queen",
            parts: [
                "Steve walks warily down the street<br>with ",
                " ", " way ", " ", 
                "<br>Ain't no sound but the sound of his feet<br>Machine guns ready to go"
            ],
            answers: ["the", "brim", "pulled", "down", "low"],
            videoUrl: "https://www.youtube.com/embed/rY0WxgSXdEE?start=20&end=30"
        },
        {
            title: "Viva La Vida - Coldplay",
            parts: [
                "I used to rule the world<br>Seas would rise when ",
                " ", 
                " the word"
            ],
            answers: ["I", "gave"],
            videoUrl: "https://www.youtube.com/embed/dvgZkm1xWPE?start=10&end=20"
        }
    ],
    mainIdea: [
        {
            title: "Fight Club Speech",
            options: [
                { text: "They are more capable than the world leads them to believe, what they desire today is nothing more than an artificial construct designed to deceive them.", correct: false },
                { text: "Even though they haven't lived through a complex global crisis, they deal every day with the fact that the world leads them to believe they are nothing, and that wears them down.", correct: true },
                { text: "Their generation needs to find an external cause, such as a war or an economic crisis, in order to feel alive and give meaning to its existence.", correct: false }
            ],
            videoUrl: "https://www.youtube.com/embed/chyRpj-971o?start=0&end=30"
        },
        {
            title: "La La Land Speech",
            options: [
                { text: "The girl believes that by not having to worry about auditions, she can avoid being judged and, finally, have time to go to school.", correct: false },
                { text: "Having had unfortunate experiences in the past led the girl to seek something else, which she found at school, but now she is tired of that world and wants nothing more to do with it.", correct: false },
                { text: "She is tired of having to deal with unfortunate situations, it has worn her out, and now she simply doesn't know whether she wants to move forward or not all because of the fear stemming from her past, which frustrates the guy.", correct: true }
            ],
            videoUrl: "https://www.youtube.com/embed/b65C_muXajk?start=0&end=30"
        },
        {
            title: "Jojo Rabbit Extract",
            options: [
                { text: "The dialogue reflects the intense psychological conditioning and naive nationalist indoctrination imposed on youth during wartime.", correct: true },
                { text: "The characters are discussing trivial school matters completely disconnected from the historical context of the war.", correct: false },
                { text: "The scene focuses purely on a comedic misunderstanding between two friends about cooking recipes.", correct: false }
            ],
            videoUrl: "https://www.youtube.com/embed/JSn28UMlIGI?start=0&end=30"
        },
        {
            title: "Dead Poets Society",
            options: [
                { text: "The teacher encourages students to blindly follow tradition and institutional rules without question.", correct: false },
                { text: "The professor inspires his students to seize the day and think for themselves, breaking away from conventional conformity.", correct: true },
                { text: "The students decide to drop out of school to pursue careers in professional acting.", correct: false }
            ],
            videoUrl: "https://www.youtube.com/embed/wrkWq0FAZ40?start=10&end=25"
        }
    ]
};

// --- GAME STATE ---
let currentTopic = "";
let answered = false;
let currentCardData = null;
let videoPlaysLeft = 2;

let gameState = {
    turn: 1,
    scores: { 1: 0, 2: 0, 3: 0 },
    lives: { 1: 2, 2: 2, 3: 2 },
    tokensLeft: {
        stress: 4,
        concatenation: 4,
        mainIdea: 4
    }
};

// --- DOM ELEMENTS ---
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const cardContent = document.getElementById("card-content");
const topicTitle = document.getElementById("current-topic-title");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const videoPlaceholder = document.getElementById("video-placeholder");

const gameHeader = document.querySelector(".game-header");
const hudEl = document.createElement("div");
hudEl.className = "game-hud";
gameHeader.parentNode.insertBefore(hudEl, gameHeader.nextSibling);

// --- HELPERS ---
function isPlayerAlive(player) {
    return gameState.lives[player] > 0;
}

function alivePlayers() {
    return [1, 2, 3].filter(p => isPlayerAlive(p));
}

function advanceTurn() {
    // Rotar entre jugadores vivos (1 → 2 → 3 → 1)
    const alive = alivePlayers();
    if (alive.length === 0) return;
    let next = gameState.turn;
    for (let i = 0; i < 3; i++) {
        next = next === 3 ? 1 : next + 1;
        if (isPlayerAlive(next)) {
            gameState.turn = next;
            return;
        }
    }
}

// --- NAVIGATION ---
document.querySelectorAll(".topic-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const topic = e.target.dataset.topic;
        if (gameState.tokensLeft[topic] <= 0) {
            alert("No tokens left for this topic!");
            return;
        }
        if (!isPlayerAlive(gameState.turn)) {
            advanceTurn();
            if (!isPlayerAlive(gameState.turn)) {
                checkGameOver();
                return;
            }
        }
        startGame(topic);
    });
});

document.getElementById("back-btn").addEventListener("click", returnToMenu);
nextBtn.addEventListener("click", nextTurnOrCard);

function startGame(topic) {
    currentTopic = topic;
    menuScreen.style.display = "none";
    gameScreen.style.display = "flex";

    const displayTitle = topic === "mainIdea" ? "Main Idea"
        : topic === "concatenation" ? "Concatenation"
        : "Stress";
    topicTitle.innerText = `${displayTitle} (Turn: Player ${gameState.turn})`;

    updateHUD();
    drawRandomCard();
}

function returnToMenu() {
    menuScreen.style.display = "flex";
    gameScreen.style.display = "none";
    refreshTopicButtons();
    updateHUD();
    checkGameOver();
}

// Oscurece y deshabilita los botones de tema sin tokens
function refreshTopicButtons() {
    document.querySelectorAll(".topic-btn").forEach(btn => {
        const topic = btn.dataset.topic;
        if (gameState.tokensLeft[topic] <= 0) {
            btn.disabled = true;
            btn.classList.add("exhausted");
        } else {
            btn.disabled = false;
            btn.classList.remove("exhausted");
        }
    });
}

function updateHUD() {
    const p1Class = isPlayerAlive(1) ? "" : "hud-player-dead";
    const p2Class = isPlayerAlive(2) ? "" : "hud-player-dead";
    const p3Class = isPlayerAlive(3) ? "" : "hud-player-dead";

    hudEl.innerHTML = `
        <div class="hud-row">
            <div class="hud-player ${p1Class}">P1: 🏆 ${gameState.scores[1]} pts | ❤️ ${gameState.lives[1]}</div>
            <div class="hud-player ${p2Class}">P2: 🏆 ${gameState.scores[2]} pts | ❤️ ${gameState.lives[2]}</div>
            <div class="hud-player ${p3Class}">P3: 🏆 ${gameState.scores[3]} pts | ❤️ ${gameState.lives[3]}</div>
        </div>
        <div class="hud-tokens">
            Tokens left — Stress: ${gameState.tokensLeft.stress} | Concatenation: ${gameState.tokensLeft.concatenation} | Main Idea: ${gameState.tokensLeft.mainIdea}
        </div>
        <div class="hud-turn">Current Turn: Player ${gameState.turn}</div>
    `;
}

// --- CARD LOGIC ---
function drawRandomCard() {
    answered = false;
    feedbackEl.innerText = "";
    feedbackEl.className = "";
    nextBtn.style.display = "none";
    videoPlaysLeft = 2;

    const deck = data[currentTopic];
    if (deck.length === 0) {
        alert("No more cards in this category!");
        returnToMenu();
        return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    currentCardData = deck.splice(randomIndex, 1)[0];

    setupVideoPlaceholder(currentCardData.videoUrl);

    cardContent.innerHTML = "";

    if (currentTopic === "stress") renderStress(currentCardData);
    if (currentTopic === "concatenation") renderConcatenation(currentCardData);
    if (currentTopic === "mainIdea") renderMainIdea(currentCardData);
}

function setupVideoPlaceholder(url) {
    if (!videoPlaceholder) return;

    // Si ya se agotaron las reproducciones de la tarjeta, no mostrar botón
    if (videoPlaysLeft <= 0) {
        videoPlaceholder.innerHTML = `
            <div id="video-wrapper">
                <p style="color: var(--dark-purple); font-weight: bold;">🎬 No plays left for this card</p>
            </div>
        `;
        return;
    }

    videoPlaceholder.innerHTML = `
        <div id="video-wrapper">
            <p style="color: var(--dark-purple); font-weight: bold; margin-bottom: 8px;">🎬 Multimedia Clip</p>
            <button id="play-media-btn" class="check-btn" style="padding: 8px 20px; font-size: 0.95rem;">▶ Play Video</button>
            <span id="play-counter" style="display: block; margin-top: 6px; font-size: 0.85rem; font-weight: bold; color: var(--dark-blue);">Plays left: ${videoPlaysLeft}</span>
        </div>
    `;

    const playBtn = document.getElementById("play-media-btn");
    const counterSpan = document.getElementById("play-counter");

    playBtn.addEventListener("click", () => {
        if (videoPlaysLeft <= 0) return;

        videoPlaysLeft--;
        counterSpan.innerText = `Plays left: ${videoPlaysLeft}`;

        // Iframe grande (420px de alto, ancho completo)
        videoPlaceholder.innerHTML = `
            <div style="position:relative; width:100%; height:420px;">
                <iframe src="${url}" width="100%" height="420px"
                    style="border:none; border-radius:12px;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
            <span style="display:block; margin-top:8px; font-size:0.85rem; font-weight:bold; color: var(--dark-blue);">
                Plays left: ${videoPlaysLeft}
            </span>
        `;

        // Si ya no quedan reproducciones, dejamos el iframe pero sin botón para volver a mostrarlo
        if (videoPlaysLeft <= 0) {
            // Añadimos un aviso opcional debajo (sin botón)
            const note = document.createElement("p");
            note.style.cssText = "margin-top:8px; font-size:0.8rem; font-weight:bold; color: var(--error);";
            note.innerText = "No more plays available for this card.";
            videoPlaceholder.appendChild(note);
        }
    });
}

// 1. STRESS
function renderStress(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = `${card.title} [Turn P${gameState.turn} - 1 pt]`;
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
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');

    if (correctWords.includes(cleanWord)) {
        btn.classList.add("correct");
        gameState.scores[gameState.turn] += 1;
        showFeedback(true, 1);
    } else {
        btn.classList.add("incorrect");
        gameState.lives[gameState.turn] -= 1;
        showFeedback(false, 0);
    }
}

// 2. CONCATENATION
function renderConcatenation(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = `${card.title} [Turn P${gameState.turn} - 2 pts]`;
    cardContent.appendChild(titleEl);

    const textEl = document.createElement("div");
    textEl.className = "concat-text";

    let answerIndex = 0;
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

    if (allCorrect) {
        gameState.scores[gameState.turn] += 2;
        showFeedback(true, 2);
    } else {
        gameState.lives[gameState.turn] -= 1;
        showFeedback(false, 0);
    }
}

// 3. MAIN IDEA
function renderMainIdea(card) {
    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = `${card.title} [Turn P${gameState.turn} - 3 pts]`;
    cardContent.appendChild(titleEl);

    const container = document.createElement("div");
    container.className = "main-idea-container";

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
        gameState.scores[gameState.turn] += 3;
        showFeedback(true, 3);
    } else {
        selectedDiv.classList.add("incorrect");
        gameState.lives[gameState.turn] -= 1;

        allOptionDivs.forEach((div) => {
            const originalOption = allOptionsData.find(opt => opt.text === div.innerText);
            if (originalOption && originalOption.correct) {
                div.classList.add("correct");
            }
        });

        showFeedback(false, 0);
    }
}

// --- UTILS & TURNS ---
function showFeedback(isCorrect, pointsEarned) {
    answered = true;
    if (gameState.tokensLeft[currentTopic] > 0) {
        gameState.tokensLeft[currentTopic]--;
    }

    if (isCorrect) {
        feedbackEl.innerText = `Correct! Player ${gameState.turn} earns ${pointsEarned} point(s).`;
        feedbackEl.className = "feedback-success";
    } else {
        const remaining = gameState.lives[gameState.turn];
        if (remaining <= 0) {
            feedbackEl.innerText = `Wrong! Player ${gameState.turn} loses their last life and is eliminated.`;
        } else {
            feedbackEl.innerText = `Wrong! Player ${gameState.turn} loses 1 life (${remaining} left).`;
        }
        feedbackEl.className = "feedback-error";
    }

    updateHUD();
    nextBtn.style.display = "block";
}

function nextTurnOrCard() {
    // Aviso si el jugador actual acaba de quedar eliminado
    if (!isPlayerAlive(gameState.turn)) {
        alert(`Player ${gameState.turn} has run out of lives (0/2) and is eliminated!`);
    }

    // Si solo queda un jugador vivo o ninguno, terminar
    if (alivePlayers().length <= 1) {
        endGame();
        return;
    }

    advanceTurn();

    const totalTokens = gameState.tokensLeft.stress + gameState.tokensLeft.concatenation + gameState.tokensLeft.mainIdea;
    if (totalTokens <= 0) {
        endGame();
        return;
    }

    returnToMenu();
}

function checkGameOver() {
    const totalTokens = gameState.tokensLeft.stress + gameState.tokensLeft.concatenation + gameState.tokensLeft.mainIdea;
    const alive = alivePlayers();

    if (totalTokens <= 0 || alive.length <= 1) {
        endGame();
    }
}

function endGame() {
    gameScreen.style.display = "none";
    menuScreen.style.display = "flex";

    const alive = alivePlayers();
    let winnerText = "";

    if (alive.length === 0) {
        // Nadie vivo: gana el que tenga más puntos (o empate)
        const maxScore = Math.max(...[1, 2, 3].map(p => gameState.scores[p]));
        const winners = [1, 2, 3].filter(p => gameState.scores[p] === maxScore);
        winnerText = winners.length > 1
            ? `It's a tie! Players ${winners.join(" & ")} with ${maxScore} points.`
            : `Player ${winners[0]} wins with ${maxScore} points!`;
    } else if (alive.length === 1) {
        const w = alive[0];
        winnerText = `Player ${w} is the last one standing and wins with ${gameState.scores[w]} points!`;
    } else {
        // Varios vivos: comparar puntos
        let winner = alive[0];
        alive.forEach(p => {
            if (gameState.scores[p] > gameState.scores[winner]) winner = p;
        });
        const maxScore = gameState.scores[winner];
        const tied = alive.filter(p => gameState.scores[p] === maxScore);
        winnerText = tied.length > 1
            ? `It's a tie! Players ${tied.join(" & ")} with ${maxScore} points.`
            : `Player ${winner} wins with ${maxScore} points!`;
    }

    const scoreboard = [1, 2, 3]
        .map(p => `<li>Player ${p}: ${gameState.scores[p]} pts — ${gameState.lives[p]} ❤️ ${isPlayerAlive(p) ? "" : "(eliminated)"}</li>`)
        .join("");

    menuScreen.innerHTML = `
        <h2 style="color: var(--dark-purple); text-align: center;">Game Over!</h2>
        <p style="text-align: center; font-size: 1.2rem; font-weight: bold;">${winnerText}</p>
        <ul style="list-style: none; padding: 0; text-align: center; font-weight: bold;">
            ${scoreboard}
        </ul>
        <p style="text-align: center; margin-top: 20px; font-weight: bold;">Do you want to play again?</p>
        <div style="text-align: center; margin-top: 10px; display: flex; gap: 15px; justify-content: center;">
            <button class="topic-btn" id="play-again-btn">Yes, Play Again</button>
            <button class="topic-btn" id="stay-btn">No, Stay Here</button>
        </div>
    `;

    document.getElementById("play-again-btn").addEventListener("click", () => location.reload());
    document.getElementById("stay-btn").addEventListener("click", () => {
        menuScreen.innerHTML = `
            <h2 style="color: var(--dark-purple); text-align: center;">Thanks for playing!</h2>
        `;
    });
}
