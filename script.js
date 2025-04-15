function startGame() {
  const username = document.getElementById('username').value.trim();
  const heart = document.getElementById('heartCheck').value;

  if (!username) {
    alert("Please enter your name.");
    return;
  }

  if (heart === "no") {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("motivationScreen").classList.remove("hidden");
    return;
  }

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("warningScreen").classList.remove("hidden");
}

function enterGhostWorld() {
  document.getElementById("warningScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  document.getElementById("playerName").textContent = document.getElementById("username").value.trim();
  startTimer();
  loadPuzzle();
}

let timeLeft = 60;
function startTimer() {
  const timer = document.getElementById("timer");
  const countdown = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert("⏰ Time's up! The ghost trapped you!");
      location.reload();
    }
  }, 1000);
}

function loadPuzzle() {
  const puzzles = [
    { question: "What disappears as soon as you say its name?", answer: "silence" },
    { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
    { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
    { question: "The more of me you take, the more you leave behind. What am I?", answer: "footsteps" },
    { question: "What has a face and two hands but no arms or legs?", answer: "clock" },
    { question: "You see a boat filled with people, yet there isn’t a single person on board. How?", answer: "all are married" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    { question: "If you drop me I'm sure to crack, but give me a smile and I'll always smile back. What am I?", answer: "mirror" }
  ];
  const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  document.getElementById("puzzleBox").innerHTML = `
    <p>${puzzle.question}</p>
    <input type="text" id="userAnswer" placeholder="Your answer here..." />
  `;
  window.currentAnswer = puzzle.answer.toLowerCase();
}

function submitAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.toLowerCase().trim();
  if (userAnswer === window.currentAnswer) {
    alert("✅ You survived... for now!");
    location.reload();
  } else {
    showPunishment();
  }
}

function showPunishment() {
  const horrorMovies = [
    "The Conjuring",
    "Hereditary",
    "Sinister",
    "The Babadook",
    "Insidious",
    "The Ring",
    "It Follows",
    "Paranormal Activity"
  ];
  const movie = horrorMovies[Math.floor(Math.random() * horrorMovies.length)];
  document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/02/88/70/42/360_F_288704290_6zTQAmnEn4kdWxIxvQ8PAmQtT3SBtYYq.jpg')";
  alert(`❌ Wrong answer! You're cursed.
Watch this horror movie: ${movie}`);
}

// Ghost Hunt Game
function startGhostHunt() {
  document.getElementById("gameScreen").classList.add("hidden");

  const huntContainer = document.createElement("div");
  huntContainer.id = "huntContainer";
  huntContainer.style.position = "relative";
  huntContainer.style.height = "400px";
  huntContainer.style.margin = "30px auto";
  huntContainer.style.border = "2px solid crimson";
  document.body.appendChild(huntContainer);

  let score = 0;
  let interval = setInterval(() => {
    const ghost = document.createElement("img");
    ghost.src = "https://i.pinimg.com/736x/23/58/11/235811c0ba8656a1cbad73cd3b67e122.jpg";
    ghost.style.position = "absolute";
    ghost.style.width = "100px";
    ghost.style.cursor = "pointer";
    ghost.style.left = Math.floor(Math.random() * (huntContainer.offsetWidth - 100)) + "px";
    ghost.style.top = Math.floor(Math.random() * (huntContainer.offsetHeight - 100)) + "px";

    ghost.onclick = function () {
      score++;
      ghost.remove();
      if (score >= 5) {
        clearInterval(interval);
        alert("👻 You defeated the haunting spirits!");
        location.reload();
      }
    };

    huntContainer.appendChild(ghost);

    setTimeout(() => {
      if (huntContainer.contains(ghost)) ghost.remove();
    }, 1000);
  }, 1500);

  setTimeout(() => {
    clearInterval(interval);
    alert("💀 The ghosts overwhelmed you...");
    location.reload();
  }, 20000);
}


// Ghost Hunt Game (Updated with on-screen messages)
function startGhostHunt() {
  document.getElementById("gameScreen").classList.add("hidden");

  const huntContainer = document.createElement("div");
  huntContainer.id = "huntContainer";
  huntContainer.style.position = "relative";
  huntContainer.style.height = "400px";
  huntContainer.style.margin = "30px auto";
  huntContainer.style.border = "2px solid crimson";
  document.body.appendChild(huntContainer);

  const messageBox = document.createElement("div");
  messageBox.id = "huntMessage";
  messageBox.style.textAlign = "center";
  messageBox.style.fontSize = "24px";
  messageBox.style.margin = "20px auto";
  messageBox.style.color = "white";
  document.body.appendChild(messageBox);

  let score = 0;
  let interval = setInterval(() => {
    const ghost = document.createElement("img");
    ghost.src = "https://i.pinimg.com/736x/23/58/11/235811c0ba8656a1cbad73cd3b67e122.jpg";
    ghost.style.position = "absolute";
    ghost.style.width = "100px";
    ghost.style.cursor = "pointer";
    ghost.style.left = Math.floor(Math.random() * (huntContainer.offsetWidth - 100)) + "px";
    ghost.style.top = Math.floor(Math.random() * (huntContainer.offsetHeight - 100)) + "px";

    ghost.onclick = function () {
      score++;
      ghost.remove();
      messageBox.innerText = `Ghost caught! (${score}/5)`;
      if (score >= 5) {
        clearInterval(interval);
        messageBox.innerText = "👻 You survived the ghost hunt!";
        setTimeout(() => location.reload(), 4000);
      }
    };

    huntContainer.appendChild(ghost);

    setTimeout(() => {
      if (huntContainer.contains(ghost)) ghost.remove();
    }, 1000);
  }, 1500);

  setTimeout(() => {
    if (score < 5) {
      clearInterval(interval);
      messageBox.innerText = "💀 The ghosts overwhelmed you... Watch 'The Conjuring' alone at night!";
      setTimeout(() => location.reload(), 6000);
    }
  }, 20000);
}
