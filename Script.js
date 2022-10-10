var clicksTotal = [] // length 3 array, index is task number
var misClicks = [] // length 3x2 array, index is task number, value is [quantity, description]
var completionTime = [] // length 3 array, index is task number

function dummyResults() {
	clicksTotal = [40, 43, 45]
	misClicks = [[0, ""], [3, "Pizza select"], [5, "Toppings select"]]
	completionTime = [147, 170, 163]
}

function generateResults() {
	dummyResults();

	var clicksPerSec = []

	for (var i = 0; i < clicksTotal.length; i++) {
		clicksPerSec.push(clicksTotal[i] / completionTime[i])
	}

	for (var i = 0; i < clicksTotal.length; i++) {
		let heading = document.createElement('h2')

		heading.textContent = "Task " + (i+1)
		document.getElementById('tableParent').appendChild(heading);

		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		document.getElementById('tableParent').appendChild(table);

		let r1 = document.createElement('tr');
		let th1 = document.createElement('th');
		let th2 = document.createElement('th');
		let th3 = document.createElement('th');

		th1.innerHTML = "Metric";
		th2.innerHTML = "Score";
		th3.innerHTML = "Description";

		r1.appendChild(th1);
		r1.appendChild(th2);
		r1.appendChild(th3);
		thead.appendChild(r1);

		let className1 = Math.max.apply(0, completionTime) == completionTime[i]
			? "worstTask" :
			Math.min.apply(0, completionTime) == completionTime[i] ? "bestTask" : "";
		let className2 = Math.max.apply(Math, misClicks.map(x => x[0])) == misClicks[i][0]
			? "worstTask" :
			Math.min.apply(Math, misClicks.map(x => x[0])) == misClicks[i][0] ? "bestTask" : "";
		let className3 = Math.min.apply(Math, clicksPerSec.map((x, y) => clicksTotal[y] / completionTime[y])) == clicksTotal[i] / completionTime[i]
			? "worstTask" : 
			Math.max.apply(Math, clicksPerSec.map((x, y) => clicksTotal[y] / completionTime[y])) == clicksTotal[i] / completionTime[i]
			? "bestTask" : "";

		createTableRow(tbody, "Total time", completionTime[i], "", className1)
		createTableRow(tbody, "Total misclicks", misClicks[i][0], misClicks[i][1], className2)
		createTableRow(tbody, "Clicks per second", clicksTotal[i] / completionTime[i], "", className3)
	}
}

function createTableRow(table, metric, score, desc, className) {
	let r = document.createElement('tr');
	let d1 = document.createElement('td');
	let d2 = document.createElement('td');
	let d3 = document.createElement('td');

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

function processConsentDetails() {
	researcherName = document.getElementById("researcherName").value;
	sessionNumber = document.getElementById("sessionNumber").value;
	consented = document.querySelector('#consent').checked;

	//Check if participant consents
	if (!consented) {
		//Participant does not consent
		document.getElementById("needConsentMessage").style.display = "block";
		return
	} else {
		document.getElementById("needConsentMessage").style.display = "none";
	}

	sessionStorage.setItem("Researcher_Name", researcherName);
	sessionStorage.setItem("Session_Number", sessionNumber);
	sessionStorage.setItem("Consented", consented);

	window.location.href = "Intro.html";
}