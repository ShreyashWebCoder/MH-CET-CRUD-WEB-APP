// Student Data Adding Controller
let isOpenCloseStatus = true;
const openCloseFun = () => {
  // console.log("hello")
  if (isOpenCloseStatus) {
    document.querySelector("#addControl").style.display = "flex";
    isOpenCloseStatus = false;
  } else {
    document.querySelector("#addControl").style.display = "none";
    isOpenCloseStatus = true;
  }
};

// Add Student Details
const studentObj = {
  enrollmentNo: null,
  name: null,
  email: null,
  phoneNo: null,
  dob: null,
};

const setValue = (proName, proValue) => {
  if (proValue !== "") {
    studentObj[proName] = proValue;
  } else {
    proName = null;
  }
};

//empty array
let arr = [];
const localStorageData = localStorage.getItem("LocStore_studentArr");
if (localStorageData !== null) {
  const getStorageData = JSON.parse(localStorageData);
  arr = [...getStorageData];
  console.table(arr);
}

// Submit Student DATA
const submitStudentDetail = () => {
  // console.log(studentObj);

  //push in arr[] of newly created studentObj
  if (
    studentObj.name &&
    studentObj.email &&
    studentObj.phoneNo &&
    studentObj.dob
  ) {
    //Dynamically chnage Enrollment No.
    let studentEnrollmentNo = 101;
    if (arr.length > 0) {
      studentEnrollmentNo = arr[arr.length - 1].enrollmentNo + 1;
    }
    studentObj.enrollmentNo = studentEnrollmentNo;
    arr.push(studentObj);

    localStorage.setItem("LocStore_studentArr", JSON.stringify(arr));
    alert("New Student Added Successfully");

    //refresh window
    // location.reload();
    openCloseFun();
    displayNewData(arr);
    document.getElementById("addData").reset()
    // location.reload();
  } else {
    alert("ERROR..... Fill all Details ");
  }
};



// Read Student Data
const displayNewData = (ele) => {
  // Dynamically create a Student Data in Row form <tbody> Tag
  let newAddedData = document.getElementById("newData");
  newAddedData.innerHTML = "";
  // console.log(newAddedData)


  //loop on arr[]
  ele.forEach((singleStudent, index) => {

    let tr = document.createElement("tr");
    tr.style.textAlign = "center";
    // tr.style.backgroundColor = "#80808032";

    let srNo = document.createElement("td");
    srNo.append(index + 1);
    tr.appendChild(srNo);

    let th_enrollNo = document.createElement("th");
    th_enrollNo.append(singleStudent.enrollmentNo);
    tr.appendChild(th_enrollNo);

    let td_Name = document.createElement("td");
    td_Name.style.textTransform = "uppercase";
    td_Name.append(singleStudent.name);
    tr.appendChild(td_Name);

    let td_Email = document.createElement("td");
    td_Email.append(singleStudent.email);
    tr.appendChild(td_Email);

    let td_PhoneNo = document.createElement("td");
    td_PhoneNo.append(singleStudent.phoneNo);
    tr.appendChild(td_PhoneNo);

    let td_DOB = document.createElement("td");
    td_DOB.append(singleStudent.dob);
    tr.appendChild(td_DOB);

    let td_action = document.createElement("td");
    td_action.setAttribute("id", "icons");

    let edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square  text-success");
    edit.setAttribute("id", "edit");
    // edit.onclick = upadateStudentData.bind(this, singleStudent.enrollmentNo)
    edit.onclick = () => {
      upadateStudentData(singleStudent);
      openCloseUpdataFun();
    };

    td_action.appendChild(edit);

    let trash = document.createElement("i");
    trash.setAttribute("class", "fa-solid fa-trash-can text-danger");
    trash.setAttribute("id", "trash");
    trash.onclick = function () {
      deleteSingleData(singleStudent.enrollmentNo);
    };
    td_action.appendChild(trash);

    tr.appendChild(td_action);
    // newAddedData.appendChild(tr);
    document.getElementById("newData").appendChild(tr)
  });
};
displayNewData(arr);



//DELETE Single Student DATA
const deleteSingleData = (deleteEnroll) => {
  let confirmDel = confirm("Are you Sure to delete this Student Data...??? ");

  if (confirmDel === true) {
    const findStudentEnroll = arr.findIndex((student) => (
      deleteEnroll === student.enrollmentNo
    ))

    if (findStudentEnroll !== -1) {
      arr.splice(findStudentEnroll, 1);
      localStorage.setItem("LocStore_studentArr", JSON.stringify(arr));
      displayNewData(arr);
      alert("Delete Successfully Student :", deleteEnroll);
      // console.log((arr))
    }
  }
};


// Student Data Updata Controller
let isOpenCloseUpdataStatus = true;

const openCloseUpdataFun = () => {
  if (isOpenCloseUpdataStatus) {
    document.querySelector("#UpadateControl").style.display = "flex";
    isOpenCloseUpdataStatus = false;
  } else {
    document.querySelector("#UpadateControl").style.display = "none";
    isOpenCloseUpdataStatus = true;
  }
};

// update Student
const upadateStudentData = (updataStudent) => {
  // let confirmUpdata = confirm(
  //   "Are you Sure to UPDATA this Student Data...??? "
  // );

  // console.log(updataStudent);

  document.getElementById("nameID").value = updataStudent.name;
  document.getElementById("emailID").value = updataStudent.email;
  document.getElementById("phoneNoID").value = updataStudent.phoneNo;
  document.getElementById("DOB-ID").value = updataStudent.dob;
  document.getElementById("EnrollID").value = updataStudent.enrollmentNo;

};

const updataStudentFinal = () => {
  let Name = document.getElementById("nameID").value;
  let Email = document.getElementById("emailID").value;
  let PhoneNo = document.getElementById("phoneNoID").value;
  let EnrollNo = document.getElementById("EnrollID").value;
  let DOB = document.getElementById("DOB-ID").value;

  //Final obj
  let studentFinalObj = {
    enrollmentNo: Number(EnrollNo),
    name: Name,
    email: Email,
    phoneNo: PhoneNo,
    dob: DOB,
  };
  console.log(studentFinalObj); //display return Array


  // Find Index
  let findIndex = arr.findIndex(
    (student) => (Number(EnrollNo) === student.enrollmentNo)
  );

  if (findIndex !== -1) {
    arr[findIndex] = studentFinalObj;
  }

  alert("Updata Student Data Successfully ");
  localStorage.setItem("LocStore_studentArr", JSON.stringify(arr));
  displayNewData(arr);
}

