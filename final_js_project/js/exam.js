// for session storage data

let loggedInStudent;

let studentData = sessionStorage.getItem("loggedIn")
if(studentData !== null){

    loggedInStudent = JSON.parse(studentData)

}else{
    
    location.href = "./login.html";

}

console.log(loggedInStudent)


document.getElementById("studentName").innerText = loggedInStudent.name
document.getElementById("studentEmail").innerText = loggedInStudent.email
document.getElementById("studentRollNo").innerText = loggedInStudent.enrollmentNo



let questionsSet = []

const getQuiz = () =>{

    let API_KEY = "Ujl8AVT7uZsMu1rqrV1BfqwzXfG6oX1f0KYH6fbq"
    fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&
    difficulty=Medium&limit=15&tags=HTML`)
    .then((res)=>res.json())
    .then((response)=>{
        questionsSet = response;
        setQuestions(response)
        setSingleQuestion(response[0], 0)
    })
    .catch((error)=>{
        console.log(error)
    })
}


getQuiz()



let viewIndex = null

const setQuestions = (questionsData) =>{

    if(questionsData.length > 0){
        questionsData.forEach((question, index)=>{

            let qNo = document.createElement("div")
            qNo.setAttribute("class", "qNo");
            qNo.setAttribute("id", `qNo${index}`);
            qNo.innerText = index+1
            

            if(viewIndex === null){
                if(index === 0){
                    qNo.style.backgroundColor = "grey"
                    viewIndex = index
                }
            }
            
            qNo.onclick = ()=>{

                document.getElementById(`qNo${viewIndex}`).style.backgroundColor = 'transparent'

                qNo.style.backgroundColor = "grey"
                viewIndex = index;
                setSingleQuestion(question, index)
            }


            document.getElementById("questionBox").appendChild(qNo)

        })
    }
}




// set question one bye one

const setSingleQuestion = (question, currentIndex) =>{

    console.log(question)
    
    if(question){

        // set quesiton
        document.getElementById("questionString").innerText = `${currentIndex + 1}. ${question.question}`;

        // set options
        document.getElementById("option1").innerText = question.answers.answer_a
        document.getElementById("option1Value").innerText = question.answers.answer_a

        document.getElementById("option2").innerText = question.answers.answer_b
        document.getElementById("option2Value").innerText = question.answers.answer_a

        document.getElementById("option3").innerText = question.answers.answer_c
        document.getElementById("option3Value").innerText = question.answers.answer_a

        document.getElementById("option4").innerText = question.answers.answer_d
        document.getElementById("option4Value").innerText = question.answers.answer_a
    }

}



// next prev logic

const prevFun = () =>{

    if(viewIndex !== 0){
        setSingleQuestion(questionsSet[viewIndex - 1], viewIndex-1)

        document.getElementById(`qNo${viewIndex}`).style.backgroundColor = "transparent"
        document.getElementById(`qNo${viewIndex - 1}`).style.backgroundColor = "grey"

        viewIndex = viewIndex -1
    }
}


const nextFun = () =>{

    if(viewIndex !== questionsSet.length -1){
        setSingleQuestion(questionsSet[viewIndex + 1], viewIndex+1)

        document.getElementById(`qNo${viewIndex}`).style.backgroundColor = "transparent"
        document.getElementById(`qNo${viewIndex + 1}`).style.backgroundColor = "grey"

        viewIndex = viewIndex +1
    }
}