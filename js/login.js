//get All Student-data
let arr = [];

let studentData = localStorage.getItem("LocStore_studentArr");
if (studentData !== null) {
  arr = [...JSON.parse(studentData)];
}
console.table(arr);


//login 
const loginStudent = () => {
  let EnrollmentNo = document.getElementById("enrollNo").value;
  let Password = document.getElementById("password").value;

  // console.log(Password, EnrollmentNo)

  if (EnrollmentNo.trim() !== "" && Password.trim() !== "") {
    let findSingleStudent = arr.find(
      (findStudent) => (findStudent.EnrollmentNo = Number(EnrollmentNo))
    );

    if (findSingleStudent !== undefined) {
      if (findSingleStudent.dob === Password) {
        delete findSingleStudent.dob;

        //sessionStorage
        sessionStorage.setItem("finalLogin", JSON.stringify(findSingleStudent));

        alert("LOGIN SUCCESSFULLY ....!!!");
        location.href = "./exam.html"

        // location.reload();
        // document.getElementById("loginForm").reset()
      } else {
        alert("Incorrect Password.");
      }
    } else {
      alert("This Student does not EXIST.");
    }
  } else {
    // alert("Please enter enrollement number & its password.");
    alert("Please fill EnrollmentNo. & Password. ");
  }

}


