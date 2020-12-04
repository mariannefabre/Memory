const cards = [];

function initiateGame() {
  document.getElementById("overlay").style.display = "none";
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

  if (cards && cards.length) {
    // if array and array.length are truthy
    arr.splice(0, arr.length); // remove all elements and clean original array
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
  console.log(cards);
}

function displayIcon(cardNumber) {
  console.log(cardNumber);
  const icon = cards[0][1];
  console.log(icon);
  switch (icon) {
    case "\\f06d":
      $("#" + cardNumber).addClass("one");
      sleep(1500).then(() => {
        $(".icon.one").removeClass("one");
      });
      break;
    case "\\f1e2":
      $("#" + cardNumber).addClass("two");
      sleep(1500).then(() => {
        $(".icon.two").removeClass("two");
      });
      break;
    case "\\f083":
      $("#" + cardNumber).addClass("three");
      sleep(1500).then(() => {
        $(".icon.three").removeClass("three");
      });
      break;
    case "\\f810":
      $("#" + cardNumber).addClass("four");
      sleep(1500).then(() => {
        $(".icon.four").removeClass("four");
      });
      break;
    case "\\f1e3":
      $("#" + cardNumber).addClass("five");
      sleep(1500).then(() => {
        $(".icon.five").removeClass("five");
      });
      break;
    case "\\f57b":
      $("#" + cardNumber).addClass("six");
      sleep(1500).then(() => {
        $(".icon.six").removeClass("six");
      });
      break;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* let $x = $('span.icon');
  console.log($x.prop("content"));
  $x.prop("content", "\\f257");
  console.log($x.prop("content"));
   */
/* console.log($("#" + cardNumber));
  console.log($("#" + cardNumber).prop("content"));
  $("#" + cardNumber).prop("content", "\\f257");
  console.log($("#" + cardNumber).prop("content"));
 */
/*   $("#"+cardNumber).toggleClass("scissors");
  sleep(1200).then(() => {
    $(".icon.scissors").removeClass("scissors");
  }); 
}
  
  
    document.getElementById('demo').style = "Color: red";*/
