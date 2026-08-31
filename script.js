/* ==================================================
   MONTHSARY DATE
================================================== */

/*
   August 1, 2026 at 3:00 PM

   IMPORTANT:
   The month starts at 3:00 PM.
*/

const startDate = new Date("2026-08-01T15:00:00");


/* ==================================================
   TIME COUNTER
================================================== */

function updateCounter() {

  const now = new Date();

  let difference = now - startDate;


  /*
     If the date has not happened yet,
     show the remaining time instead.
  */

  if (difference < 0) {

    difference = Math.abs(difference);

    document.getElementById("counterLabel").textContent =
      "until our beginning ♡";

  } else {

    document.getElementById("counterLabel").textContent =
      "since our beginning ♡";

  }


  const totalSeconds =
    Math.floor(difference / 1000);


  const days =
    Math.floor(totalSeconds / 86400);


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  document.getElementById("days").textContent =
    days;


  document.getElementById("hours").textContent =
    hours;


  document.getElementById("minutes").textContent =
    minutes;


  document.getElementById("seconds").textContent =
    seconds;

}


/*
   Run immediately so the counter doesn't
   wait one second before showing.
*/

updateCounter();


/*
   Update every second.
*/

setInterval(updateCounter, 1000);



/* ==================================================
   SECRET NOTE
================================================== */

function showSecret() {

  const secret =
    document.getElementById("secret");


  if (secret.style.display === "block") {

    secret.style.display = "none";

  } else {

    secret.style.display = "block";

  }

}



/* ==================================================
   LITTLE NOTES
================================================== */

function openNote(note) {

  /*
     Once a note has been opened,
     it stays opened.
  */

  if (note.classList.contains("opened")) {
    return;
  }


  note.classList.remove("sealed");

  note.classList.add("opened");

}



/* ==================================================
   SONG PLAYER
================================================== */

function togglePlay(card) {

  const audio =
    card.querySelector("audio");

  const playButton =
    card.querySelector(".play-btn");


  /*
     Stop every other song first.
  */

  document
    .querySelectorAll(".player-card")
    .forEach(otherCard => {

      const otherAudio =
        otherCard.querySelector("audio");

      const otherButton =
        otherCard.querySelector(".play-btn");


      if (otherCard !== card) {

        otherAudio.pause();

        otherAudio.currentTime = 0;

        otherCard.classList.remove("playing");

        otherButton.textContent = "▶";

      }

    });


  /*
     Play / pause selected song.
  */

  if (audio.paused) {

    audio.play()
      .then(() => {

        card.classList.add("playing");

        playButton.textContent = "❚❚";

      })
      .catch(error => {

        console.log(
          "Audio could not play:",
          error
        );

      });

  } else {

    audio.pause();

    card.classList.remove("playing");

    playButton.textContent = "▶";

  }


  /*
     When the song finishes,
     reset the button.
  */

  audio.onended = function () {

    card.classList.remove("playing");

    playButton.textContent = "▶";

  };

}



/* ==================================================
   MEMORY JAR
================================================== */

const memories = [

  "The little conversations that somehow turn into hours. ♡",

  "That moment when we realized how comfortable we were with each other.",

  "Every random joke that made us laugh way too much.",

  "The little check-ins that make an ordinary day feel special.",

  "Our first picture together. ♡",

  "Our first date c:",

  "Every time you make me smile without even trying.",

  "The moments where we can just be ourselves together.",

  "The little things about you that I keep remembering throughout the day.",

  "One month with you already feels like such a beautiful memory. ♡"

];


function pickMemory() {

  const result =
    document.getElementById("memoryResult");


  const randomIndex =
    Math.floor(
      Math.random() * memories.length
    );


  const memory =
    memories[randomIndex];


  result.innerHTML = `
    <span class="tiny">a little memory ♡</span>
    <p>${memory}</p>
  `;


  /*
     Restart animation every time
     the button is pressed.
  */

  result.classList.remove("pop");


  void result.offsetWidth;


  result.classList.add("pop");

}



/* ==================================================
   CLICKING THE JAR
================================================== */

const jar =
  document.getElementById("jar");


if (jar) {

  jar.addEventListener(
    "click",
    pickMemory
  );

}
