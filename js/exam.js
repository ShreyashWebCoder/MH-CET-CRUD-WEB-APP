// API Call request
const API_KEY = "R7C7wp1I0Ux42wW6mc32M5PWuKSLd5pkZ2x6AtjH";
const API_URL =
  `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&difficulty=Medium&limit=10&tags=HTML`;

//   console.log(API_URL)


let loginStudentDone;
const getLoginStudent = () => {
  let studentData = sessionStorage.getItem("finalLogin");
  if (studentData !== null) {
    loginStudentDone = JSON.parse(studentData);
  } else {
    // location.href = "./login.html";
  }
  console.log(loginStudentDone);
};
getLoginStudent();



//Get Info. of Student
const getInfoStudent = () => {
  document.getElementById("studentName").innerText = loginStudentDone.name;
  document.getElementById("studentEmail").innerText = loginStudentDone.email;
  document.getElementById("studentEnrollNo").innerText =
    loginStudentDone.EnrollmentNo;
};
getInfoStudent();


let questionsSet = []
// getQuiz
const getQuiz = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      questionsSet = response ;
    })
    .catch((error) => { console.log(error) });

}
getQuiz()


//set Questions
const setQuestion =(queData)=>{
    console.log(queData)

}
setQuestion(questionsSet)








// const setQueNo = ()=>{
//   let queNo = document.getElementById("queNo")
// let ques = document.createElement("div");
// ques.style.width = "5vw"
// ques.style.height = "5vh"
// ques.style.backgroundColor ="red"
// queNo.appendChild(ques)


// }
// setQueNo()