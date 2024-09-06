// main student data
let studentArr = []

const localStorageData = localStorage.getItem("studentArrData")
if(localStorageData !== null){
    const getStudentData = JSON.parse(localStorageData)
    studentArr = [...getStudentData]
}




// open create new student modal

let isModalOpen = true;

const openCloseModal = () =>{
    if(isModalOpen){
        document.getElementById("common-modal").style.display = "flex";
        isModalOpen = false;
    }
    else{
        document.getElementById("common-modal").style.display = "none";
        isModalOpen = true;
    }
}



// add new student functionality

const student = {
    enrollmentNo:null,
    name:null,
    email:null,
    phone:null,
    dob:null
}

const setValues = (propName, propValue) =>{
    if(propValue !== ""){
        student[propName] = propValue
    }
    else{
        student[propName] = null
    }
}

const submitStudentData = () =>{
    if(student.name && student.email &&
       student.phone && student.dob){
        
        let studentEnrollmentNo = 101
        if(studentArr.length > 0){
            studentEnrollmentNo = studentArr[studentArr.length - 1].enrollmentNo + 1
        }

        student.enrollmentNo = studentEnrollmentNo
        studentArr.push(student)

        localStorage.setItem("studentArrData", JSON.stringify(studentArr))
        console.log("New Student Added successfully.")
        openCloseModal()
        displayStudentData(studentArr)
        document.getElementById("studentForm").reset()

    }
    else{
        console.error("Some Problem")
    }
}





// display all students
const displayStudentData = (allStudent) =>{
    
    let bodyData = document.getElementById("bodyData");
    bodyData.innerHTML = "";
    
    allStudent.forEach((singleStudent, index) => {
        

        let tr = document.createElement("tr")

        let srNo = document.createElement("th")
        srNo.append(index+1)
        tr.appendChild(srNo)

        let nos = document.createElement("td")
        nos.append(singleStudent.enrollmentNo)
        tr.appendChild(nos)

        let stName = document.createElement("td")
        stName.append(singleStudent.name)
        tr.appendChild(stName)

        let emailTd = document.createElement("td");
        emailTd.append(singleStudent.email)
        tr.appendChild(emailTd)

        let phoneTd = document.createElement("td")
        phoneTd.append(singleStudent.phone)
        tr.appendChild(phoneTd)

        let dobTd = document.createElement("td")
        dobTd.append(singleStudent.dob)
        tr.appendChild(dobTd)

        let actionsTd = document.createElement("td")
        actionsTd.setAttribute("class", "actions")

        let updateIcon = document.createElement("i")
        updateIcon.setAttribute("class","fa-solid fa-pen-to-square")
        updateIcon.onclick = ()=>{
            setUpdateValues(singleStudent)
            openCloseUpdateModal()
        }
        actionsTd.appendChild(updateIcon)

        let deleteIcon = document.createElement("i")
        deleteIcon.setAttribute("class","fa-solid fa-trash-can")
        deleteIcon.onclick = function(){
            deleteSingleStudent(singleStudent.enrollmentNo)
        }
        actionsTd.appendChild(deleteIcon)

        tr.appendChild(actionsTd)

        document.getElementById("bodyData").appendChild(tr)


    });

} 

displayStudentData(studentArr)






// delete student data

const deleteSingleStudent = (enrrolId) => {

    let confirmBox = confirm("Are you sure?")

    if(confirmBox === true){

        const findStudentIndex = studentArr.findIndex((student)=>(
            enrrolId === student.enrollmentNo
        ))
    
        if(findStudentIndex !== -1){
            studentArr.splice(findStudentIndex, 1)
            localStorage.setItem("studentArrData", JSON.stringify(studentArr))
            displayStudentData(studentArr)
        }

    }

}





// for update student data

const setUpdateValues = (student) =>{

    document.getElementById("studentName").value = student.name
    document.getElementById("studentEmail").value = student.email
    document.getElementById("studentPhone").value = student.phone
    document.getElementById("studentDOB").value = student.dob
    document.getElementById("studentEnrroll").value = student.enrollmentNo

}


const updateStudentData = () =>{
    let studentName = document.getElementById("studentName").value;
    let studentEmail = document.getElementById("studentEmail").value;
    let studentPhone = document.getElementById("studentPhone").value;
    let studentDOB = document.getElementById("studentDOB").value;
    let enrollId = document.getElementById("studentEnrroll").value;
    
    let updateStudentObj = {
        enrollmentNo: Number(enrollId),
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        dob: studentDOB
    }

    console.log(updateStudentObj)

    let studentIndex = studentArr.findIndex((student)=>(
        Number(enrollId) === student.enrollmentNo
    ))

    if(studentIndex !== -1){
        studentArr[studentIndex] = updateStudentObj
    }

    localStorage.setItem("studentArrData", JSON.stringify(studentArr))
    displayStudentData(studentArr)
    openCloseUpdateModal()
}


let isUpdateModalOpen = true;

const openCloseUpdateModal = () =>{
    if(isUpdateModalOpen){
        document.getElementById("update-modal").style.display = "flex";
        isUpdateModalOpen = false;
    }
    else{
        document.getElementById("update-modal").style.display = "none";
        isUpdateModalOpen = true;
    }
}

