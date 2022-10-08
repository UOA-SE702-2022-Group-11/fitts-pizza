function saveAttitudeRankingsData() {
    sessionStorage.setItem("A-s1", document.getElementById('A-s1').value);
    sessionStorage.setItem("A-s2", document.getElementById('A-s2').value);
    sessionStorage.setItem("A-s3", document.getElementById('A-s3').value);
    sessionStorage.setItem("A-s4", document.getElementById('A-s4').value);
    sessionStorage.setItem("A-s5", document.getElementById('A-s5').value);
    sessionStorage.setItem("A-s6", document.getElementById('A-s6').value);
    sessionStorage.setItem("A-s7", document.getElementById('A-s7').value);

    window.location.href="questionnaireResults.html";
}

function saveTheoryAnswersData() {
    sessionStorage.setItem("T-Q1", document.querySelector('input[name="Q1"]:checked').value);
    sessionStorage.setItem("T-Q2", document.querySelector('input[name="Q2"]:checked').value);
    sessionStorage.setItem("T-Q3", document.querySelector('input[name="Q3"]:checked').value);
    sessionStorage.setItem("T-Q4", document.querySelector('input[name="Q4"]:checked').value);
    sessionStorage.setItem("T-Q5", document.querySelector('input[name="Q5"]:checked').value);

    window.location.href = "attitudes.html";
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
