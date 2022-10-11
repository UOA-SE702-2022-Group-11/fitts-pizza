function handleCompareContrastQuestionAnswers() {
  compareContrast1 = document.getElementById("compareContrast1").value;
  compareContrast2 = document.getElementById("compareContrast2").value;
  sessionStorage.setItem("compareContrast1", compareContrast1);
  sessionStorage.setItem("compareContrast2", compareContrast2);
  window.location.href = "ranking.html";
}
function handleRankingQuestions() {
  let choices = [];
  choices.push(document.getElementById("choice1").value);
  choices.push(document.getElementById("choice2").value);
  choices.push(document.getElementById("choice3").value);
  choices.push(document.getElementById("choice4").value);
  choices.push(document.getElementById("choice5").value);

  // Checks no empty rankings
  let checkEmpty;
  let answeredCount = 0;
  for (let i = 0; i < choices.length; i++) {
    checkEmpty = document.getElementById(`choice${i + 1}`).validity.valid;
    checkEmpty && (answeredCount = answeredCount + 1);
  }
  if (answeredCount == choices.length) {
    document.getElementById("emptyRankingErrorMessage").style.display = "none";
  } else {
    document.getElementById("emptyRankingErrorMessage").style.display = "block";
    return;
  }

  // Checks for duplicates
  //reference https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
  const checkDuplicates = new Set(choices).size !== choices.length;
  if (checkDuplicates) {
    document.getElementById("duplicateErrorMessage").style.display = "block";
    return;
  }

  for (let i = 0; i < choices.length; i++) {
    sessionStorage.setItem(
      `rankingChoice${i + 1}`,
      document.getElementById(`choice${i + 1}`).value
    );
  }

  window.location.href = "questionnaireResults.html";
}

function handleDownloadResults() {
  const rankingResults = {
    1: sessionStorage.getItem("rankingChoice1"),
    2: sessionStorage.getItem("rankingChoice2"),
    3: sessionStorage.getItem("rankingChoice3"),
    4: sessionStorage.getItem("rankingChoice4"),
    5: sessionStorage.getItem("rankingChoice5"),
  };

  const blob = new Blob([JSON.stringify(rankingResults)], {
    type: "application/json",
  });

  document.getElementById("blob").href = window.URL.createObjectURL(blob);
}
function addItem(item) {
  goodClick();
  const order = document.getElementById("order-list");
  const itemNode = document.createElement("li");
  const itemText = document.createTextNode(item);
  itemNode.appendChild(itemText);
  order.appendChild(itemNode);
}
function changeCategory(categoryId) {
  goodClick();
  const containers = document.getElementsByClassName("items-container");
  for (const container of containers) {
    container.style.display = "none";
  }

  const categoryBtns = document.getElementsByClassName("category-btn");
  for (const categoryBtn of categoryBtns) {
    categoryBtn.style.backgroundColor = "whitesmoke";
    categoryBtn.style.borderRadius = "0.2rem";
    categoryBtn.style.borderWidth = "thin";
  }

  document.getElementById(categoryId).style.display = "flex";
  document.getElementById(categoryId + "-category-btn").style.backgroundColor =
    "palegreen";
}
let clicks = 0;
let goodClicks = 0;
function missclick() {
  clicks += 1;
  alert(clicks - goodClicks);
}
function goodClick() {
  goodClicks += 1;
}
let timeStart = 0;
let timeEnd = 0;
function start() {
  timeStart = Date.now();
}
function end() {
  timeEnd = Date.now();
}
function getTimeSpan() {
  return timeEnd - timeStart;
}
