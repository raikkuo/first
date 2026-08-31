// ==========================================
// MONTHSARY COUNTER
// ==========================================

// August 1, 2026 at 3:00 PM
const start = new Date("2026-08-01T15:00:00").getTime();

function updateCounter() {
  const now = Date.now();

  // Prevent negative numbers if the website is opened before the start date
  let diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  // Update the HTML
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Run immediately
updateCounter();

// Update every second
setInterval(updateCounter, 1000);


// ==========================================
// SECRET NOTE
// ==========================================

function showSecret() {
  const el = document.getElementById("secret");

  if (el.style.display === "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}


// ==========================================
// LITTLE NOTES
// ==========================================

function openNote(note) {
  // Don't allow an already-opened note to close again
  if (note.classList.contains("opened")) {
    return;
  }

  note.classList.remove("sealed");
  note.classList.add("opened");

  note.setAttribute("aria-label", "Opened note");
}


// ==========================================
// MEMORY JAR
// ==========================================

const memories = [
  "The random conversations that somehow turn into our favorite talks.",

  "That feeling when I see your name pop up on my screen.",

  "The little jokes that probably wouldn't make sense to anyone else.",

  "The moments where we can just be ourselves around each other.",

  "A reminder that our story is made from lots of tiny moments, not just big ones.",

  "One day, we'll look back at these early memories and smile.",

  "You make ordinary moments feel worth keeping.",

  "I'm grateful for every chance I get to know another little part of you.",

  "First time we met."
];

function pickMemory() {
  const result = document.getElementById("memoryResult");
  const jar = document.getElementById("jar");

  const memory =
    memories[Math.floor(Math.random() * memories.length)];

  result.innerHTML =
    '<span class="tiny">a little memory</span>' +
    "<p>" +
    memory +
    "</p>";

  // Restart animation
  result.classList.remove("pop");
  void result.offsetWidth;
  result.classList.add("pop");

  // Shake the jar
  jar.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(-4deg)" },
      { transform: "rotate(4deg)" },
      { transform: "rotate(0deg)" }
    ],
    {
      duration: 500
    }
  );
}


// ==========================================
// AUDIO PLAYER
// ==========================================

function togglePlay(card) {
  const audio = card.querySelector("audio");
  const btn = card.querySelector(".play-btn");

  if (!audio) {
    return;
  }

  // Pause every other song
  document.querySelectorAll(".player-card").forEach((otherCard) => {

    if (otherCard !== card) {

      const otherAudio =
        otherCard.querySelector("audio");

      const otherBtn =
        otherCard.querySelector(".play-btn");

      if (otherAudio) {
        otherAudio.pause();
      }

      otherCard.classList.remove("playing");

      if (otherBtn) {
        otherBtn.textContent = "▶";
      }
    }
  });

  // Play / pause selected song
  if (audio.paused) {

    audio.play()
      .then(() => {
        card.classList.add("playing");
        btn.textContent = "❚❚";
      })
      .catch((error) => {
        console.error("Audio could not be played:", error);
      });

  } else {

    audio.pause();

    card.classList.remove("playing");

    btn.textContent = "▶";
  }

  // Reset button when song finishes
  audio.onended = () => {
    card.classList.remove("playing");
    btn.textContent = "▶";
  };
}
