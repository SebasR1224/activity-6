const today = new Date().toISOString().split("T")[0];
const lastPlayedDate = localStorage.getItem("lastPlayedDate");

const captions = [
  { time: 0, text: "Buenos días Moor... \n" },
  { time: 3.3, text: " ¿Cómo amaneció?\n" },
  { time: 6.5, text: " ¿Ya desayunó? \n" },
  { time: 9.3, text: " ¿Comió arepita?," },
  { time: 10, text: " Huevito  \n" },
  { time: 11, text: " ¿Quiere Milito Papi?" },
];

const fullText = captions.map((c) => c.text).join(""); // Texto completo
const textDisplay = document.getElementById("textDisplay");
const audioElement = document.getElementById("dailyAudio");
let captionIndex = 0;

// Mostrar el texto completo por defecto si el audio no se reproduce
if (lastPlayedDate === today) {
  textDisplay.innerHTML = fullText;
  textDisplay.style.opacity = 1;
} else {
  document.body.addEventListener(
    "click",
    function () {
      audioElement.play();

      audioElement.ontimeupdate = function () {
        if (
          captionIndex < captions.length &&
          audioElement.currentTime >= captions[captionIndex].time
        ) {
          textDisplay.innerHTML += captions[captionIndex].text;
          captionIndex++;
          textDisplay.style.opacity = 1;
        }
      };

      localStorage.setItem("lastPlayedDate", today);
    },
    { once: true }
  );
}
