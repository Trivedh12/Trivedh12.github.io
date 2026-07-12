/* =========================================================
   BIRTHDAY SURPRISE — SCRIPT.JS
   Edit the CUSTOMIZATION block below to change photos,
   captions, quiz questions, the letter, and the music file.
   ========================================================= */

/* ============ CUSTOMIZATION (edit freely) ============ */

const photos = [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg",
  "assets/images/photo5.jpg",
  "assets/images/photo6.jpg",
  "assets/images/photo7.jpg",
  "assets/images/photo8.jpg",
  "assets/images/photo9.jpg",
  "assets/images/photo10.jpg",
];

const captions = [
  "One of my favorite pictures of us. 🌸",

  "That smile deserves its own frame.",

  "Looking beautiful... as always. ✨",

  "Probably one of the happiest smiles I've ever seen. 😊",

  "Certified coolest person with the coolest hat. 😎",

  "One click, countless memories.",

  "Our final year, our crazy T-shirts, and a memory I'll never forget. 📸",

  "One of the most elegant pictures we've ever clicked together.",

  "Every college event somehow became more fun with you around.",

  "Ending our B.Tech with memories we'll carry forever. 🎓"
];

const questions = [
  "Will you continue tolerating my nonsense for another 100 years? 😌",
  "Promise we'll never become those friends who only say 'Happy Birthday' once a year? 😤",
  "Will you always stay my favorite girl best friend? 🎀",
];

// Each entry lists what should play when YES is pressed for that question index.
const yesAnimations = ["sparkleFlower", "confettiRibbon", "bigCelebration"];

const birthdayMessage = `Happy Birthday, Neha! 🌸

Four years ago, I never imagined that one random friendship in college would become one of the most important parts of my B.Tech journey.

Through assignments, festivals, random Hyderabad outings, college events, endless conversations, and all the little moments in between, you've always been there.

You somehow managed to be both the most cranky person and one of the kindest people I know. 😄

You get angry in five seconds…

…and somehow cool down even faster.

I still don't know how you do that.

Thank you for always helping me whenever I needed it.

Thank you for listening.

Thank you for trusting me.

Thank you for making college feel a little easier and a lot more fun.

Honestly, when I think back to these four years, so many memories have you in them.

From roaming around Hyderabad...

to clicking countless photos...

to laughing at the most random things...

those moments are something I'll always remember.

As our college chapter comes to an end, life might take us in different directions, but I genuinely hope this friendship never changes.

No matter how busy we become…

let's keep making random plans, going on random food trips, clicking way too many photos, and having those random conversations that somehow last for hours.

You deserve all the happiness in the world.

Keep smiling.

Keep annoying everyone.

Keep being the amazing person you've always been.

Happy Birthday, Neha.

Here's to many more years of friendship, laughter, and unforgettable memories.

🎂🌸✨

— Your Best Friend,
Trivedh`;

// Point this at your own instrumental Happy Birthday track (mp3),
// e.g. "assets/music/happy-birthday-instrumental.mp3".
// Left empty by default since no audio file is bundled.
const musicFile = "assets/music/birthday.mp3";

/* ============ END CUSTOMIZATION ============ */


/* =========================================================
   UTILITIES
   ========================================================= */
const $ = (id) => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;
const flowerEmojis = ["🌸", "🌷", "🌼", "🌺", "✿"];
const sparkleEmojis = ["✨", "⭐", "💫", "✦"];

function showScreen(el) {
  el.classList.remove("hidden");
  el.classList.add("fade-in");
}
function hideScreen(el, cb) {
  el.classList.add("fade-out");
  setTimeout(() => {
    el.classList.add("hidden");
    el.classList.remove("fade-out", "fade-in");
    if (cb) cb();
  }, 850);
}

/* =========================================================
   CUSTOM CURSOR (bow follows pointer)
   ========================================================= */
(function initCursor() {
  const cursor = $("cuteCursor");
  window.addEventListener("pointermove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  window.addEventListener("pointerdown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
  });
  window.addEventListener("pointerup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
})();

/* =========================================================
   SPARKLE / PETAL / CONFETTI / BALLOON / FIREWORK GENERATORS
   ========================================================= */
function spawnSparkles(count = 12, near = null) {
  const layer = $("sparkleLayer");
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = sparkleEmojis[Math.floor(rand(0, sparkleEmojis.length))];
    let x, y;
    if (near) {
      x = near.x + rand(-80, 80);
      y = near.y + rand(-80, 80);
    } else {
      x = rand(0, window.innerWidth);
      y = rand(0, window.innerHeight);
    }
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.fontSize = rand(0.8, 1.6) + "rem";
    layer.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

function spawnPetals(count = 18, duration = 6) {
  const layer = $("petalLayer");
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = flowerEmojis[Math.floor(rand(0, flowerEmojis.length))];
    p.style.left = rand(0, 100) + "vw";
    p.style.setProperty("--drift", rand(-60, 60) + "px");
    p.style.animationDuration = rand(duration - 2, duration + 3) + "s";
    p.style.fontSize = rand(1, 1.8) + "rem";
    layer.appendChild(p);
    setTimeout(() => p.remove(), (duration + 3) * 1000);
  }
}

function spawnConfetti(count = 40) {
  const layer = $("confettiLayer");
  const colors = ["#FFC1DA", "#F4C97A", "#E9DFFB", "#FFDCC2", "#F79CC2"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("span");
    c.className = "confetti-piece";
    c.style.left = rand(0, 100) + "vw";
    c.style.background = colors[Math.floor(rand(0, colors.length))];
    c.style.animationDuration = rand(2, 3.6) + "s";
    layer.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

function spawnBalloons(count = 8, duration = 8) {
  const layer = $("balloonLayer");
  const balloonEmojis = ["🎈"];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "balloon";
    b.textContent = balloonEmojis[0];
    b.style.left = rand(4, 92) + "vw";
    b.style.setProperty("--drift", rand(-40, 40) + "px");
    b.style.animationDuration = rand(duration - 2, duration + 4) + "s";
    b.style.fontSize = rand(2, 3.2) + "rem";
    layer.appendChild(b);
    setTimeout(() => b.remove(), (duration + 4) * 1000);
  }
}

function spawnFireworks(bursts = 6) {
  const layer = $("fireworkLayer");
  const colors = ["#F79CC2", "#F4C97A", "#E9DFFB", "#FFC1DA", "#fff"];
  for (let b = 0; b < bursts; b++) {
    setTimeout(() => {
      const cx = rand(15, 85);
      const cy = rand(10, 55);
      const particles = 22;
      for (let i = 0; i < particles; i++) {
        const f = document.createElement("span");
        f.className = "firework";
        const angle = (Math.PI * 2 * i) / particles;
        const dist = rand(60, 140);
        f.style.setProperty("--fx", Math.cos(angle) * dist + "px");
        f.style.setProperty("--fy", Math.sin(angle) * dist + "px");
        f.style.left = cx + "vw";
        f.style.top = cy + "vh";
        f.style.background = colors[Math.floor(rand(0, colors.length))];
        layer.appendChild(f);
        setTimeout(() => f.remove(), 1100);
      }
    }, b * 380);
  }
}

/* =========================================================
   1. LOADING SCREEN
   ========================================================= */
function initLoadingFlowers() {
  const container = $("loadingFlowers");
  for (let i = 0; i < 14; i++) {
    const f = document.createElement("span");
    f.className = "floating-flower";
    f.textContent = flowerEmojis[Math.floor(rand(0, flowerEmojis.length))];
    f.style.left = rand(0, 100) + "vw";
    f.style.animationDuration = rand(6, 12) + "s";
    f.style.animationDelay = rand(0, 6) + "s";
    container.appendChild(f);
  }
}

function runLoadingSequence() {
  initLoadingFlowers();
  const fill = $("loadingBarFill");
  const percentText = $("loadingPercent");
  let progress = 0;
  const interval = setInterval(() => {
    progress += rand(4, 12);
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        hideScreen($("loadingScreen"), () => {
          showScreen($("landingScreen"));
        });
      }, 500);
    }
    fill.style.width = progress + "%";
    percentText.textContent = Math.floor(progress) + "%";
  }, 220);
}

/* =========================================================
   2. LANDING PAGE — GIFT BOX OPEN
   ========================================================= */
function initGiftBox() {
  const box = $("giftBox");
  const wrap = $("giftBoxWrap");
  box.addEventListener("click", () => {
    if (box.classList.contains("opening")) return;
    box.classList.add("opening");
    const rect = wrap.getBoundingClientRect();
    spawnSparkles(20, { x: rect.left + rect.width / 2, y: rect.top });
    spawnPetals(16, 4);
    setTimeout(() => {
      hideScreen($("landingScreen"), () => {
        showScreen($("photoScreen"));
        startPhotoSequence();
      });
    }, 900);
  });
}

/* =========================================================
   3. PHOTO MEMORY SEQUENCE
   ========================================================= */
function startPhotoSequence() {
  const stage = $("polaroidStage");
  const progressWrap = $("photoProgress");
  progressWrap.innerHTML = "";
  photos.forEach(() => {
    const dot = document.createElement("span");
    dot.className = "dot";
    progressWrap.appendChild(dot);
  });
  const dots = progressWrap.querySelectorAll(".dot");

  let index = 0;

  function showNextPhoto() {
    if (index >= photos.length) {
      setTimeout(() => {
        hideScreen($("photoScreen"), () => {
          showScreen($("quizScreen"));
          startQuiz();
        });
      }, 1200);
      return;
    }

    const card = document.createElement("div");
    card.className = "polaroid";
    const rotation = rand(-8, 8).toFixed(1) + "deg";
    card.style.setProperty("--rot", rotation);

    const img = document.createElement("img");
    img.src = photos[index];
    img.alt = captions[index] || "memory";
    const cap = document.createElement("p");
    cap.className = "polaroid-caption";
    cap.textContent = captions[index] || "";

    card.appendChild(img);
    card.appendChild(cap);
    stage.appendChild(card);

    requestAnimationFrame(() => {
      card.classList.add("drop-in");
    });

    const rect = stage.getBoundingClientRect();
    spawnSparkles(8, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    dots[index].classList.add("active");

    const currentCard = card;
    const currentIndex = index;
    index++;

    setTimeout(() => {
      currentCard.classList.add("leaving");
      setTimeout(() => currentCard.remove(), 500);
      showNextPhoto();
    }, 2000);
  }

  showNextPhoto();
}

/* =========================================================
   4. FRIENDSHIP QUIZ
   ========================================================= */
let quizIndex = 0;

function startQuiz() {
  quizIndex = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const questionEl = $("quizQuestion");
  const noBtn = $("quizNoBtn");
  const yesBtn = $("quizYesBtn");

  noBtn.classList.remove("escaping");
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";

  questionEl.textContent = questions[quizIndex];

  yesBtn.onclick = () => handleYes();
  noBtn.onmouseenter = escapeNoButton;
  noBtn.addEventListener("touchstart", escapeNoButton, { passive: true });
  noBtn.onclick = (e) => {
    e.preventDefault();
    escapeNoButton();
  };
}

function escapeNoButton(e) {
  const noBtn = $("quizNoBtn");
  const container = $("quizCard").getBoundingClientRect();
  noBtn.classList.add("escaping");

  const btnRect = noBtn.getBoundingClientRect();
  const maxX = container.width - btnRect.width - 10;
  const maxY = container.height - btnRect.height - 10;

  const newX = rand(10, Math.max(10, maxX));
  const newY = rand(10, Math.max(10, maxY));
  const rotation = rand(-15, 15);

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
  noBtn.style.transform = `rotate(${rotation}deg)`;
}

function handleYes() {
  const rect = $("quizCard").getBoundingClientRect();
  const near = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  const animType = yesAnimations[quizIndex] || "sparkleFlower";

  if (animType === "sparkleFlower") {
    spawnSparkles(18, near);
    spawnPetals(10, 4);
  } else if (animType === "confettiRibbon") {
    spawnConfetti(45);
    spawnSparkles(10, near);
  } else if (animType === "bigCelebration") {
    spawnFireworks(5);
    spawnPetals(24, 5);
    spawnConfetti(50);
  }

  quizIndex++;
  if (quizIndex < questions.length) {
    setTimeout(renderQuizQuestion, 900);
  } else {
    setTimeout(() => {
      hideScreen($("quizScreen"), () => {
        showScreen($("fakeLoadScreen"));
        runFakeLoadingSequence();
      });
    }, 1200);
  }
}

/* =========================================================
   5. FAKE LOADING SEQUENCE
   ========================================================= */
function runFakeLoadingSequence() {
  const steps = [
    { el: "fl1", delay: 200 },
    { el: "fl2", delay: 900 },
    { el: "fl2bar", delay: 1300, isBar: true },
    { el: "fl3", delay: 2400 },
    { el: "fl3result", delay: 3100, text: "✅ Found: Neha" },
    { el: "fl4", delay: 3900 },
    { el: "fl4bar", delay: 4300, isBar: true },
    { el: "fl5", delay: 5400 },
  ];

  steps.forEach((step) => {
    setTimeout(() => {
      const node = $(step.el);
      if (step.isBar) {
        animateTextBar(node);
      }
      if (step.text) node.textContent = step.text;
      node.classList.add("show");
    }, step.delay);
  });

  setTimeout(() => {
    hideScreen($("fakeLoadScreen"), () => {
      showScreen($("cakeScreen"));
      runCakeCelebration();
    });
  }, 6600);
}

function animateTextBar(node) {
  const totalBlocks = 10;
  let filled = 0;
  const iv = setInterval(() => {
    filled++;
    node.textContent = "█".repeat(filled) + "░".repeat(totalBlocks - filled) + ` ${filled * 10}%`;
    if (filled >= totalBlocks) clearInterval(iv);
  }, 70);
}

/* =========================================================
   6. FINAL CELEBRATION — CAKE
   ========================================================= */
function runCakeCelebration() {
  spawnPetals(20, 7);

  setTimeout(() => {
    document.querySelectorAll(".candle").forEach((c, i) => {
      setTimeout(() => c.classList.add("lit"), i * 300);
    });
    spawnSparkles(20);
  }, 900);

  setTimeout(() => {
    $("birthdayBanner").classList.remove("hidden");
    spawnFireworks(6);
    spawnBalloons(10, 9);
    spawnConfetti(60);
  }, 2200);

  setTimeout(() => {
    hideScreen($("cakeScreen"), () => {
      showScreen($("letterScreen"));
      startTypewriterLetter();
    });
  }, 6800);
}

/* =========================================================
   7. TYPEWRITER LETTER
   ========================================================= */
function startTypewriterLetter() {
  const paperEl = $("letterPaper");
  paperEl.textContent = "";
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "typing-cursor";
  cursorSpan.textContent = "\u00A0";

  const text = birthdayMessage;
  let i = 0;
  const speed = 18; // ms per character

  function typeChar() {
    if (i < text.length) {
      paperEl.textContent = text.slice(0, i + 1);
      paperEl.appendChild(cursorSpan);
      i++;
      const char = text[i - 1];
      const delay = char === "\n" ? speed * 6 : speed;
      setTimeout(typeChar, delay);
    } else {
      cursorSpan.remove();
      const btn = $("finalClickBtn");
      btn.classList.remove("hidden");
      btn.classList.add("reveal");
    }
  }
  typeChar();
}

/* =========================================================
   8. FINAL ENDING
   ========================================================= */
function initFinalButton() {
  $("finalClickBtn").addEventListener("click", () => {
    hideScreen($("letterScreen"), () => {
      showScreen($("endingScreen"));
      spawnFireworks(8);
      spawnPetals(26, 8);
      spawnBalloons(12, 10);
      setTimeout(() => {
        $("endingFinalLine").classList.remove("hidden");
      }, 2200);
    });
  });
}

/* =========================================================
   MUSIC PLAYER
   ========================================================= */
function initMusicPlayer() {
  const audio = $("bgMusic");
  const toggleBtn = $("musicToggle");
  const panel = $("musicPanel");
  const playPauseBtn = $("playPauseBtn");
  const muteBtn = $("muteBtn");
  const volumeSlider = $("volumeSlider");
  const musicNote = $("musicNote");

  audio.volume = 0.5;

  if (musicFile) {
    audio.src = musicFile;
  } else {
    musicNote.textContent = "Add your Happy Birthday instrumental to assets/music and set musicFile in script.js.";
  }

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  playPauseBtn.addEventListener("click", () => {
    if (!musicFile) return;
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸ Pause";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶ Play";
    }
  });

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇 Unmute" : "🔈 Mute";
  });

  volumeSlider.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  // Attempt autoplay (browsers may block until user interacts).
  if (musicFile) {
    audio.play().then(() => {
      playPauseBtn.textContent = "⏸ Pause";
    }).catch(() => {
      // Autoplay blocked — wait for first user interaction.
      const resumeOnInteract = () => {
        audio.play().then(() => {
          playPauseBtn.textContent = "⏸ Pause";
        }).catch(() => {});
        window.removeEventListener("pointerdown", resumeOnInteract);
      };
      window.addEventListener("pointerdown", resumeOnInteract);
    });
  }
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initMusicPlayer();
  initGiftBox();
  initFinalButton();
  runLoadingSequence();
});
