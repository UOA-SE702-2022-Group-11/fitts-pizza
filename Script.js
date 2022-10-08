function saveAttitudeRankingsData() {
  sessionStorage.setItem("A-s1", document.getElementById('A-s1').value);
  sessionStorage.setItem("A-s2", document.getElementById('A-s2').value);
  sessionStorage.setItem("A-s3", document.getElementById('A-s3').value);
  sessionStorage.setItem("A-s4", document.getElementById('A-s4').value);
  sessionStorage.setItem("A-s5", document.getElementById('A-s5').value);
  sessionStorage.setItem("A-s6", document.getElementById('A-s6').value);
  sessionStorage.setItem("A-s7", document.getElementById('A-s7').value);

  navigateToQuestionnaireResultsPage();
}

function saveTheoryAnswersData() {
  //Check all questions have been answered
  let theoryQuestionsCount = 5;
  let answeredQuestionCount = 0;
  var options;

  for (let i = 1; i < theoryQuestionsCount + 1; i++) {
    options = document.getElementsByName("Q"+i);
    
    for (let count = 0; count < options.length; count++) {
      if (options[count].checked) {
        answeredQuestionCount++;
        break;
      }
    }
  }

  if (answeredQuestionCount != theoryQuestionsCount) {
    //Not all questions were answered
    document.getElementById("theoryQuestionsIncompleteMessage").style.display = "block";
  } else {
    document.getElementById("theoryQuestionsIncompleteMessage").style.display = "none";
  }

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

function startPreTest() {
  sessionStorage.setItem("Pre-Test Complete", "false");

  window.location.href="questionnaire-pages/compare-contrast.html";
}

function navigateToQuestionnaireResultsPage() {
  let preTestComplete = sessionStorage.getItem("Pre-Test Complete");

  if (preTestComplete === "false") {
    sessionStorage.setItem("Pre-Test Complete", "true");
    window.location.href="pretestQuestionnaireResults.html";
  } else {
    window.location.href="posttestQuestionnaireResults.html";
  }
}

function handleDownloadResults() {
  const compareContrastResults = {
    CC1: sessionStorage.getItem("compareContrast1"),
    CC2: sessionStorage.getItem("compareContrast2"),
  }

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
  }

  const theoryAnswers =  {
    T_Q1: sessionStorage.getItem("T-Q1"),
    T_Q2: sessionStorage.getItem("T-Q2"),
    T_Q3: sessionStorage.getItem("T-Q3"),
    T_Q4: sessionStorage.getItem("T-Q4"),
    T_Q5: sessionStorage.getItem("T-Q5"),
  }

  const evaluationResults = {
    CompareContrast: compareContrastResults,
    Ranking: rankingResults,
    Attitude: attitudeResults,
    Theory: theoryAnswers,
  }

  const blob = new Blob([JSON.stringify(evaluationResults)], {
    type: "application/json",
  });

  document.getElementById("blob").href = window.URL.createObjectURL(blob);
}
