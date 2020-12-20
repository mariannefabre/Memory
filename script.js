function main() {
  const cards = [];
  let turnsCount = 0;
  const flippedCards = [];

  let playButton = document.getElementById("play-button");
  playButton.addEventListener("click", initiateGame, true);
  let restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", initiateGame, true);

  function initiateGame() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("row").style.display = "flex";
    document.getElementById("restart-button").classList.remove("translate");
    document.getElementById("score").classList.remove("endGame");

    chronoStart();
    document.querySelectorAll(".icon").forEach((iconElement) => {
      if (iconElement.parentElement.classList.contains("fadeOut")) {
        iconElement.parentElement.classList.remove("fadeOut");
        iconElement.className = "icon";
      }
    });

    const cardNumber = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
    ];
    const icon = [
      ["\\f06d", 2],
      ["\\f1e2", 2],
      ["\\f083", 2],
      ["\\f810", 2],
      ["\\f1e3", 2],
      ["\\f57b", 2],
    ];

    // Empty the deck if it has already been initialized
    if (cards && cards.length) {
      // if array and array.length are truthy
      cards.splice(0, cards.length); // remove all elements and clean original array
    }
    cardNumber.forEach((number) => {
      let test = false;
      while (test == false) {
        let index = Math.floor(Math.random() * 6);
        if (icon[index][1] != 0) {
          cards.push([number, icon[index][0]]);
          icon[index][1]--;
          test = true;
        }
      }
    });
  }

  document.querySelectorAll(".icon").forEach((iconElement) => {
    iconElement.addEventListener("click", (showIcon) => {
      const matchingCard = cards.find((card) => card[0] == iconElement.id);
      const icon = matchingCard[1];
      displayResult(iconElement.id, icon);
      // $("#" + iconElement.id).parent().addClass("show");
      switch (icon) {
        case "\\f06d":
          $("#" + iconElement.id).addClass("icon1");
          break;
        case "\\f1e2":
          $("#" + iconElement.id).addClass("icon2");
          break;
        case "\\f083":
          $("#" + iconElement.id).addClass("icon3");
          break;
        case "\\f810":
          $("#" + iconElement.id).addClass("icon4");
          break;
        case "\\f1e3":
          $("#" + iconElement.id).addClass("icon5");
          break;
        case "\\f57b":
          $("#" + iconElement.id).addClass("icon6");
          break;
      }
    });
  });

  function displayResult(chosenCard, icon) {
    changeCursor(chosenCard, "initial");
    flippedCards.push([chosenCard, icon]);

    if (flippedCards.length === 2) {
      const previousCard = flippedCards[0][0];
      if (compareCards() === "match") {
        sleep(500).then(() => {
          removeCard(chosenCard);
          removeCard(previousCard);
          flippedCards.splice(0, flippedCards.length);
          turnsCount++;
          document.getElementById("count").innerHTML = turnsCount;
          if (numberOfCardsLeft() == 0) {
            chronoStop();
            let el = document.getElementById("score");
            $(el).addClass("endGame");
            let el2 = document.getElementById("restart-button");
            $(el2).addClass("translate");
          }
        });
      } else if (compareCards() === "different") {
        changeCursor(chosenCard, "pointer");
        changeCursor(previousCard, "pointer");
        // make it impossible to click on another card during this time:
        sleep(1000).then(() => {
          let lastClass = $("#" + chosenCard)
            .attr("class")
            .split(" ")
            .pop();
          $("#" + chosenCard).removeClass(lastClass);
          let previousLastClass = $("#" + previousCard)
            .attr("class")
            .split(" ")
            .pop();
          $("#" + previousCard).removeClass(previousLastClass);
        });
        flippedCards.splice(0, flippedCards.length);
        turnsCount++;
        document.getElementById("count").innerHTML = turnsCount;
      } else if (compareCards() === "same card") {
        flippedCards.pop();
      }
    }
  }

  function changeCursor(elementId, value) {
    document.getElementById(elementId).parentElement.style.cursor = value;
  }
  function removeCard(elementId) {
    const el = document.getElementById(elementId).parentElement;
    $(el).addClass("fadeOut");
  }
  function compareCards() {
    if (
      flippedCards[0][0] == flippedCards[1][0] &&
      flippedCards[0][1] == flippedCards[1][1]
    ) {
      return "same card";
    } else if (flippedCards[0][1] == flippedCards[1][1]) {
      return "match";
    } else {
      return "different";
    }
  }
  function numberOfCardsLeft() {
    let numberOfCardsLeft = cards.length;
    document.querySelectorAll(".icon").forEach((iconElement) => {
      if (iconElement.parentElement.classList.contains("fadeOut")) {
        numberOfCardsLeft--;
      }
    });
    return numberOfCardsLeft;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

main();
// Timer

let startTime = 0;
let start = 0;
let end = 0;
let diff = 0;
let timerID = 0;

function chrono() {
  end = new Date();
  diff = end - start;
  diff = new Date(diff);
  let sec = diff.getSeconds();
  let min = diff.getMinutes();
  let hr = diff.getHours() - 1;
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec;
  timerID = setTimeout("chrono()", 1000);
}
function chronoStart() {
  start = new Date();
  chrono();
}
function chronoStop() {
  clearTimeout(timerID);
  document.getElementById("row").style.display = "none";
}
function chronoReset() {
  document.getElementById("chronotime").innerHTML = "0:00:00";
  start = new Date();
}
