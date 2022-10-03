function handleCompareContrastQuestionAnswers() {
  compareContrast1 = document.getElementById("compareContrast1").value;
  compareContrast2 = document.getElementById("compareContrast2").value;
  compareContrast3 = document.getElementById("compareContrast3").value;
  sessionStorage.setItem("compareContrast1", compareContrast1);
  sessionStorage.setItem("compareContrast2", compareContrast2);
  sessionStorage.setItem("compareContrast3", compareContrast3);
  window.location.href = "../Test.html";
}
