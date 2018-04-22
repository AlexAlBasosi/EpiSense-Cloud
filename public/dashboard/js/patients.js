var doctorEmail;
var doctorID;
var arrResponse;

if(sessionStorage.getItem("loginEmail") == null) {
  window.location.replace('/episense');
} else {
  doctorEmail = sessionStorage.getItem("loginEmail");
}

var getIDURL = "/doctors/getID/" + doctorEmail;

$.ajax({
  url: getIDURL,
  type: 'GET',
  success: function(res) {
    sessionStorage.setItem("loginID", res);
  }
});

var doctorID = sessionStorage.getItem("loginID");

var getPatientsURL = "/doctors/patients/" + doctorID;

$.ajax({
  url: getPatientsURL,
  type: 'GET',
  success: function(res) {
    arrResponse = res;
  }, 
  async: false
});

var imageIndex = 1;

Array.from(arrResponse.Patients).forEach(function(patient){
    var patientDiv = document.createElement("div");
    patientDiv.className = "box";
    document.querySelector(".thumbnails").appendChild(patientDiv);

    var aTag = document.createElement("a");
    aTag.className = "image fit";
    patientDiv.appendChild(aTag);

    var imgTag = document.createElement("img");
    imgTag.src = "img/p" + imageIndex + ".jpg";
    imgTag.alt = "";
    aTag.appendChild(imgTag);

    var innerDiv = document.createElement("div");
    innerDiv.className = "inner";
    patientDiv.appendChild(innerDiv);

    var h2Tag = document.createElement("h2");
    h2Tag.innerHTML = patient.first_name + " " + patient.last_name;
    innerDiv.appendChild(h2Tag);

    var li1 = document.createElement("li");
    li1.align = "left";
    li1.innerHTML = "Patient ID: " + patient.patient_id;
    innerDiv.appendChild(li1);
    
    if(!patient.age == ""){
        var li2 = document.createElement("li");
        li2.align = "left";
        li2.innerHTML = "Age: " + patient.age;
        innerDiv.appendChild(li2);
    }

    if(!patient.gender == ""){
        var li3 = document.createElement("li");
        li3.align = "left";
        if(patient.gender == "f"){
            li3.innerHTML = "Gender: Female";
        } else {
            li3.innerHTML = "Gender: Male";
        }
        innerDiv.appendChild(li3);
    }

    if(!patient.address == ""){
        var li4 = document.createElement("li");
        li4.align = "left";
        li4.innerHTML = "Address: " + patient.address;
        innerDiv.appendChild(li4);
    }

    if(!patient.contact_number == ""){
        var li5 = document.createElement("li");
        li5.align = "left";
        li5.innerHTML = "Contact Number: " + patient.contact_number;
        innerDiv.appendChild(li5);
    }

    if(!patient.date_of_birth == ""){
        var li6 = document.createElement("li");
        li6.align = "left";
        li6.innerHTML = "Date of Birth: " + patient.date_of_birth;
        innerDiv.appendChild(li6);
    }

    var buttonTag = document.createElement("a");
    buttonTag.className = "button fit";
    buttonTag.innerHTML = "View Medical Record";
    //buttonTag.data-poptrox = "trends";

    var brk = document.createElement("br");
    innerDiv.appendChild(brk);

    innerDiv.appendChild(buttonTag);
    
    imageIndex++;
});
