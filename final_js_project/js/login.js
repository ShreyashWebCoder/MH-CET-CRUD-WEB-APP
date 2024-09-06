// for get all the students data

let studentArr = [];

let studentData = localStorage.getItem("studentArrData")
if(studentData !== null){
    studentArr = [...JSON.parse(studentData)]
}





// login function

const login = () =>{
    let enrollmentNo = document.getElementById("enrollmentNo").value;
    let password = document.getElementById("password").value;

    if(enrollmentNo.trim() !== "" && password.trim() !== ""){

        let singleStudent = studentArr.find((studentObj)=>(
            studentObj.enrollmentNo === Number(enrollmentNo)
        ))

        if(singleStudent !== undefined){
            if(singleStudent.dob === password){

                delete singleStudent.dob;
                
                sessionStorage.setItem("loggedIn", JSON.stringify(singleStudent))
                console.log("Login successfully")
                location.href = "./exam.html";
            }else{
                console.error("Wrong Password")
            }
        }else{
            console.error("This user dosnt exist")
        }


    }else{
        console.error("Please provide enrollment No & password")
    }
}

// https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Medium&limit=5&tags=HTML,JavaScript

// Ujl8AVT7uZsMu1rqrV1BfqwzXfG6oX1f0KYH6fbq