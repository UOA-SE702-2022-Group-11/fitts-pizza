function saveAttitudeRankingsData() {
  sessionStorage.setItem("A-s1", document.getElementById("A-s1").value);
  sessionStorage.setItem("A-s2", document.getElementById("A-s2").value);
  sessionStorage.setItem("A-s3", document.getElementById("A-s3").value);
  sessionStorage.setItem("A-s4", document.getElementById("A-s4").value);
  sessionStorage.setItem("A-s5", document.getElementById("A-s5").value);
  sessionStorage.setItem("A-s6", document.getElementById("A-s6").value);
  sessionStorage.setItem("A-s7", document.getElementById("A-s7").value);

  navigateToQuestionnaireResultsPage();
}

function saveTheoryAnswersData() {
  //Check all questions have been answered
  let theoryQuestionsCount = 5;
  let answeredQuestionCount = 0;
  var options;

  for (let i = 1; i < theoryQuestionsCount + 1; i++) {
    options = document.getElementsByName("Q" + i);

    for (let count = 0; count < options.length; count++) {
      if (options[count].checked) {
        answeredQuestionCount++;
        break;
      }
    }
  }

  if (answeredQuestionCount != theoryQuestionsCount) {
    //Not all questions were answered
    document.getElementById("theoryQuestionsIncompleteMessage").style.display =
      "block";
  } else {
    document.getElementById("theoryQuestionsIncompleteMessage").style.display =
      "none";
  }

  sessionStorage.setItem(
    "T-Q1",
    document.querySelector('input[name="Q1"]:checked').value
  );
  sessionStorage.setItem(
    "T-Q2",
    document.querySelector('input[name="Q2"]:checked').value
  );
  sessionStorage.setItem(
    "T-Q3",
    document.querySelector('input[name="Q3"]:checked').value
  );
  sessionStorage.setItem(
    "T-Q4",
    document.querySelector('input[name="Q4"]:checked').value
  );
  sessionStorage.setItem(
    "T-Q5",
    document.querySelector('input[name="Q5"]:checked').value
  );

  window.location.href = "attitudes.html";
}

var clicksTotal = []; // length 3 array, index is task number
var misClicks = []; // length 3x2 array, index is task number, value is [quantity, description]
var completionTime = []; // length 3 array, index is task number

function dummyResults() {
  clicksTotal = [40, 43, 45];
  misClicks = [
    [0, ""],
    [3, "Pizza select"],
    [5, "Toppings select"],
  ];
  completionTime = [147, 170, 163];
}
function loadResults(){
  alert('test')
  clicksTotal = [];
  misClicks = [];
  completionTime = [];
  let totMisClicks = 0;
  let catMisClicks = 0;
  let topMisClicks = 0;

  let dataString1 = window.sessionStorage.getItem("data1");
  alert(dataString1);
  let data1 = JSON.parse(dataString1);

  clicksTotal.push(data1.clicks);
  totMisClicks += data1.missClicks;
  catMisClicks += data1.categoryMissClicks;
  topMisClicks += data1.toppingMissClicks;
  completionTime.push(data1.time);
  alert(clicksTotal);
  alert(completionTime);

  let dataString2 = window.sessionStorage.getItem("data2");
  let data2 = JSON.parse(dataString2);

  clicksTotal.push(data2.clicks);
  totMisClicks += data2.missClicks;
  catMisClicks += data2.categoryMissClicks;
  topMisClicks += data2.toppingMissClicks;
  completionTime.push(data2.time);

  let dataString3 = window.sessionStorage.getItem("data3");
  let data3 = JSON.parse(dataString3);

  clicksTotal.push(data3.clicks);
  totMisClicks += data3.missClicks;
  catMisClicks += data3.categoryMissClicks;
  topMisClicks += data3.toppingMissClicks;
  completionTime.push(data1.time);

  misClicks = [
      [totMisClicks, ""],
      [catMisClicks, "Pizza select"],
      [topMisClicks, "Toppings select"],
  ]
  alert(misClicks)
}

function generateResults() {
  loadResults();

  var clicksPerSec = [];

  for (var i = 0; i < clicksTotal.length; i++) {
    clicksPerSec.push(clicksTotal[i] / completionTime[i]);
  }

  for (var i = 0; i < clicksTotal.length; i++) {
    let heading = document.createElement("h2");

    heading.textContent = "Task " + (i + 1);
    document.getElementById("tableParent").appendChild(heading);

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById("tableParent").appendChild(table);

    let r1 = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");

    th1.innerHTML = "Metric";
    th2.innerHTML = "Score";
    th3.innerHTML = "Description";

    r1.appendChild(th1);
    r1.appendChild(th2);
    r1.appendChild(th3);
    thead.appendChild(r1);

    let className1 =
      Math.max.apply(0, completionTime) == completionTime[i]
        ? "worstTask"
        : Math.min.apply(0, completionTime) == completionTime[i]
        ? "bestTask"
        : "";
    let className2 =
      Math.max.apply(
        Math,
        misClicks.map((x) => x[0])
      ) == misClicks[i][0]
        ? "worstTask"
        : Math.min.apply(
            Math,
            misClicks.map((x) => x[0])
          ) == misClicks[i][0]
        ? "bestTask"
        : "";
    let className3 =
      Math.min.apply(
        Math,
        clicksPerSec.map((x, y) => clicksTotal[y] / completionTime[y])
      ) ==
      clicksTotal[i] / completionTime[i]
        ? "worstTask"
        : Math.max.apply(
            Math,
            clicksPerSec.map((x, y) => clicksTotal[y] / completionTime[y])
          ) ==
          clicksTotal[i] / completionTime[i]
        ? "bestTask"
        : "";

    createTableRow(tbody, "Total time", completionTime[i], "", className1);
    createTableRow(
      tbody,
      "Total misclicks",
      misClicks[i][0],
      misClicks[i][1],
      className2
    );
    createTableRow(
      tbody,
      "Clicks per second",
      clicksTotal[i] / completionTime[i],
      "",
      className3
    );
  }
}

function createTableRow(table, metric, score, desc, className) {
  let r = document.createElement("tr");
  let d1 = document.createElement("td");
  let d2 = document.createElement("td");
  let d3 = document.createElement("td");

  r.className = className;

  d1.innerHTML = metric;
  d2.innerHTML = score;
  d3.innerHTML = desc;

  r.appendChild(d1);
  r.appendChild(d2);
  r.appendChild(d3);
  table.appendChild(r);
}

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

  window.location.href = "theory.html";
}

function startPreTest() {
  sessionStorage.setItem("Pre-Test Complete", "false");

  window.location.href = "questionnaire-pages/testIntro.html";
}

function navigateToQuestionnaireResultsPage() {
  let preTestComplete = sessionStorage.getItem("Pre-Test Complete");

  if (preTestComplete === "false") {
    sessionStorage.setItem("Pre-Test Complete", "true");
    window.location.href = "pretestQuestionnaireResults.html";
  } else {
    window.location.href = "posttestQuestionnaireResults.html";
  }
}

function handleDownloadResults() {
  const compareContrastResults = {
    CC1: sessionStorage.getItem("compareContrast1"),
    CC2: sessionStorage.getItem("compareContrast2"),
  };

  const rankingResults = {
    R1: sessionStorage.getItem("rankingChoice1"),
    R2: sessionStorage.getItem("rankingChoice2"),
    R3: sessionStorage.getItem("rankingChoice3"),
    R4: sessionStorage.getItem("rankingChoice4"),
    R5: sessionStorage.getItem("rankingChoice5"),
  };

  const attitudeResults = {
    A_s1: sessionStorage.getItem("A-s1"),
    A_s2: sessionStorage.getItem("A-s2"),
    A_s3: sessionStorage.getItem("A-s3"),
    A_s4: sessionStorage.getItem("A-s4"),
    A_s5: sessionStorage.getItem("A-s5"),
    A_s6: sessionStorage.getItem("A-s6"),
    A_s7: sessionStorage.getItem("A-s7"),
  };

  const theoryAnswers = {
    T_Q1: sessionStorage.getItem("T-Q1"),
    T_Q2: sessionStorage.getItem("T-Q2"),
    T_Q3: sessionStorage.getItem("T-Q3"),
    T_Q4: sessionStorage.getItem("T-Q4"),
    T_Q5: sessionStorage.getItem("T-Q5"),
  };

  const evaluationResults = {
    CompareContrast: compareContrastResults,
    Ranking: rankingResults,
    Attitude: attitudeResults,
    Theory: theoryAnswers,
  };

  const blob = new Blob([JSON.stringify(evaluationResults)], {
    type: "application/json",
  });

  document.getElementById("blob").href = window.URL.createObjectURL(blob);
}
let numOrderItems = 0;

function addItem(item) {
  goodClick();
  const order = document.getElementById("current-order-list");

  const checkedItems = new Set();
  for (const orderItem of order.children) {
    checkedItems.add(orderItem.textContent);
  }
  if (checkedItems.has(item + "x")) {
    return false;
  }

  let itemNode = document.createElement("li");
  numOrderItems++;
  itemNode.className = "orderItem" + numOrderItems;
  const itemText = document.createTextNode(item);
  let itemBtn = document.createElement("button");
  itemBtn.innerHTML = "x";
  itemBtn.style.color = "red";
  itemBtn.style.marginLeft = "0.5rem";
  itemBtn.className = "orderItem" + numOrderItems;
  itemBtn.addEventListener("click", (event) => {
    goodClick();
    let nodesToDelete = document.getElementsByClassName(event.target.className);
    nodesToDelete[0].parentNode.removeChild(nodesToDelete[0]);
  });

  itemNode.appendChild(itemText);
  itemNode.appendChild(itemBtn);
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
let toppingClicks = 0;
let categoryClicks = 0;
let goodClicks = 0;

function missclick() {
  clicks += 1
  sessionStorage.setItem("clicks", clicks)
  alert(clicks - goodClicks);
}
function toppingClick(){
  toppingClicks += 1;
  let toppingMissClicks = clicks - toppingClicks;
  sessionStorage.setItem("toppingMissClicks", toppingMissClicks)
}
function categoryCLick(){
  categoryClicks += 1;
  let categoryMissClicks = clicks - toppingClicks;
  sessionStorage.setItem("categoryMissClicks", categoryMissClicks)
}
function goodClick() {
  goodClicks += 1;
}
function getClicks(){
  let missClicks = clicks - goodClicks;
  sessionStorage.setItem("missClicks", missClicks);
  return missClicks;
}
function start() {
  let timeStart = Date.now();
  sessionStorage.setItem("timeStart", timeStart);
  alert(timeStart);
}
function end() {
  let timeEnd = Date.now();
  sessionStorage.setItem("timeEnd", timeEnd);
  alert(timeEnd);
  getClicks()
}
function showVariables() {
  alert('show')
  let output = sessionStorage.getItem("timeStart");
  alert(output);
}
function getTimeSpan() {
  let timeStart = sessionStorage.getItem("timeStart");
  let timeEnd = sessionStorage.getItem("timeEnd");
  let duration = timeEnd - timeStart;
  alert(duration);
  return duration;
}
function getData(version){
  alert('test');
  let clicks = sessionStorage.getItem("clicks");
  let missClicks = sessionStorage.getItem("missClicks");
  let toppingMissClicks = sessionStorage.getItem("toppingMissClicks");
  let categoryMissClicks = sessionStorage.getItem("categoryMissClicks");
  duration = getTimeSpan()
  let data = {
    time : duration,
    clicks : clicks,
    missClicks : missClicks,
    toppingMissClicks : toppingMissClicks,
    categoryMissClicks : categoryMissClicks
  }
  let dataString = JSON.stringify(data)
  sessionStorage.setItem("data"+version, dataString)
  alert(dataString)
  var a = document.createElement("a");
  var file = new Blob([dataString], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = "data"+version+".js";
  a.click();
}
function changeVersion(version){
  getData(version)
  clicks = 0;
  toppingClicks = 0;
  categoryClicks = 0;
  goodClicks = 0;
  sessionStorage.setItem("clicks", 0);
  sessionStorage.setItem("toppingMissClicks", 0);
  sessionStorage.setItem("categoryMissClicks", 0);
  sessionStorage.setItem("missClicks", 0);

}

let currentOrder = 0;

const orders = [
  ["Thin Base", "Pepperoni", "Cheese", "Tomato Sauce"],
  ["Large Base", "Bacon", "Pepperoni", "Chicken", "Cheese", "BBQ Sauce"],
  ["Small Base", "Chicken", "Brie", "Cranberry Sauce"],
];

function checkOrder() {
  let correctItemCount = 0;

  const currentOrderItems =
    document.getElementById("current-order-list").children;

  if (currentOrderItems.length !== orders[currentOrder].length) {
    return false;
  }

  for (const currentOrderItem of currentOrderItems) {
    for (const orderItem of orders[currentOrder]) {
      if (orderItem + "x" === currentOrderItem.textContent) {
        correctItemCount++;
      }
    }
  }

  return correctItemCount === orders[currentOrder].length;
}

function submitOrder() {
  goodClick();
  if (checkOrder()) {
    currentOrder++;
    numOrderItems = 0;
    document.getElementById("order-list").innerHTML = "";
    document.getElementById("current-order-list").innerHTML = "";
    if (currentOrder < 3) {
      for (const orderItem of orders[currentOrder]) {
        const order = document.getElementById("order-list");
        const itemNode = document.createElement("li");
        const itemText = document.createTextNode(orderItem);
        itemNode.appendChild(itemText);
        order.appendChild(itemNode);
      }
      alert("Good job, let's move on to the next order.");
    } else {
      document.getElementById("order-list").innerHTML = "No more orders";
      document.getElementById("nextTaskBtn").style.display = "block";
    }
  } else {
    alert("Sorry, but this order is not quite right. Keep trying.");
  }
}

function processConsentDetails() {
  researcherName = document.getElementById("researcherName").value;
  sessionNumber = document.getElementById("sessionNumber").value;
  consented = document.querySelector("#consent").checked;

  //Check if participant consents
  if (!consented) {
    //Participant does not consent
    document.getElementById("needConsentMessage").style.display = "block";
    return;
  } else {
    document.getElementById("needConsentMessage").style.display = "none";
  }

  sessionStorage.setItem("Researcher_Name", researcherName);
  sessionStorage.setItem("Session_Number", sessionNumber);
  sessionStorage.setItem("Consented", consented);

  window.location.href = "Intro.html";
}
