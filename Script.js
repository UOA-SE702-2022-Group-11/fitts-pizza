function saveAttitudeRankingsData() {
    sessionStorage.setItem("A-s1", document.getElementById('A-s1').value);
    sessionStorage.setItem("A-s2", document.getElementById('A-s2').value);
    sessionStorage.setItem("A-s3", document.getElementById('A-s3').value);
    sessionStorage.setItem("A-s4", document.getElementById('A-s4').value);
    sessionStorage.setItem("A-s5", document.getElementById('A-s5').value);
    sessionStorage.setItem("A-s6", document.getElementById('A-s6').value);
    sessionStorage.setItem("A-s7", document.getElementById('A-s7').value);

    //NEED TO ADD PAGE NAVIGATION TO NEXT PAGE
}

function saveTheoryAnswersData() {
    sessionStorage.setItem("T-Q1", document.querySelector('input[name="Q1"]:checked').value);
    sessionStorage.setItem("T-Q2", document.querySelector('input[name="Q2"]:checked').value);
    sessionStorage.setItem("T-Q3", document.querySelector('input[name="Q3"]:checked').value);
    sessionStorage.setItem("T-Q4", document.querySelector('input[name="Q4"]:checked').value);
    sessionStorage.setItem("T-Q5", document.querySelector('input[name="Q5"]:checked').value);

    //NEED TO ADD PAGE NAVIGATION TO NEXT PAGE
}