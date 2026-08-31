const start = new Date("2026-08-01T15:00:00").getTime();

function updateCounter() {
  const now = Date.now();
  let diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

function showSecret() {
  const el = document.getElementById("secret");
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function openNote(note) {
  if (note.classList.contains("opened")) return;
  note.classList.remove("sealed");
  note.classList.add("opened");
  note.setAttribute("aria-label", "Opened note");
}

const memories = [
  "The random conversations that somehow turn into our favorite talks.",
  "That feeling when I see your name pop up on my screen.",
  "The little jokes that probably wouldn't make sense to anyone else.",
  "The moments where we can just be ourselves around each other.",
  "A reminder that our story is made from lots of tiny moments, not just big ones.",
  "One day, we'll look back at these early memories and smile.",
  "You make ordinary moments feel worth keeping.",
  "I'm grateful for every chance I get to know another little part of you."
  "First time we met."

];

function pickMemory() {
  const result = document.getElementById("memoryResult");
  const jar = document.getElementById("jar");
  const memory = memories[Math.floor(Math.random() * memories.length)];
  result.innerHTML = '<span class="tiny">a little memory</span><p>' + memory + '</p>';
  result.classList.remove("pop");
  void result.offsetWidth;
  result.classList.add("pop");
  jar.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(-4deg)" },
      { transform: "rotate(4deg)" },
      { transform: "rotate(0deg)" }
    ],
    { duration: 500 }
  );
}

/* Audio Player Logic */
function togglePlay(card) {
  const audio = card.querySelector("audio");
  const btn = card.querySelector(".play-btn");

  if (!audio) return;

  // Pause all other playing cards before playing the clicked one
  document.querySelectorAll(".player-card").forEach((otherCard) => {
    if (otherCard !== card) {
      const otherAudio = otherCard.querySelector("audio");
      const otherBtn = otherCard.querySelector(".play-btn");
      if (otherAudio) {
        otherAudio.pause();
      }
      otherCard.classList.remove("playing");
      if (otherBtn) otherBtn.textContent = "▶";
    }
  });

  if (audio.paused) {
    audio.play();
    card.classList.add("playing");
    btn.textContent = "❚❚";
  } else {
    audio.pause();
    card.classList.remove("playing");
    btn.textContent = "▶";
  }

  audio.onended = () => {
    card.classList.remove("playing");
    btn.textContent = "▶";
  };
}
