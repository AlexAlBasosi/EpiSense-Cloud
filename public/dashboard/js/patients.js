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

console.log(arrResponse.Patients.length);

if(arrResponse.Patients.length <= 1){
    var noPatientsTag = document.createElement("h6");
    noPatientsTag.innerHTML = "You have no patients.";
    document.getElementById('patientprofile').appendChild(noPatientsTag);

} else {

    Array.from(arrResponse.Patients).forEach(function(patient){
        var patientDiv = document.createElement("div");
        patientDiv.className = "box";
        document.querySelector(".thumbnails").appendChild(patientDiv);
    
        var aTag = document.createElement("a");
        aTag.className = "image fit";
        patientDiv.appendChild(aTag);
    
        var imgTag = document.createElement("img");
        if(imageIndex <= 7) {
            imgTag.src = "img/p" + imageIndex + ".jpg";
        } else {
            imgTag.src = "img/default.png";
        }
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
        li1.id = "patientID";
        li1.className = patient.patient_id;
        innerDiv.appendChild(li1);
        
        
            var li2 = document.createElement("li");
            li2.align = "left";
    
            if(!patient.age == ""){
                li2.innerHTML = "Age: " + patient.age;
            } else {
                li2.innerHTML = "Age: N/A";
            }
    
            li2.id = "patientAge";
            innerDiv.appendChild(li2);
    
            var li3 = document.createElement("li");
            li3.align = "left";
            if(patient.gender == "f"){
                li3.innerHTML = "Gender: Female";
            } else if(patient.gender == "m"){
                li3.innerHTML = "Gender: Male";
            } else {
                li3.innerHTML = "Gender: N/A";
            }
            li3.id = "patientGender";
            innerDiv.appendChild(li3);
    
            var li4 = document.createElement("li");
            li4.align = "left";
            if(!patient.address == ""){
                li4.innerHTML = "Address: " + patient.address;
            } else {
                li4.innerHTML = "Address: N/A";
            }
            li4.id = "patientAddress";
            innerDiv.appendChild(li4);
    
            var li5 = document.createElement("li");
            li5.align = "left";
    
            if(!patient.contact_number == ""){
                li5.innerHTML = "Contact Number: " + patient.contact_number;
            } else {
                li5.innerHTML = "Contact Number: N/A "; 
            }
    
            li5.id = "patientNum";
            innerDiv.appendChild(li5);
    
            var li6 = document.createElement("li");
            li6.align = "left";
    
            if(!patient.date_of_birth == ""){
                li6.innerHTML = "Date of Birth: " + patient.date_of_birth;
            } else {
                li6.innerHTML = "Date of Birth: N/A";
            }
            li6.id = "patientDOB";
            innerDiv.appendChild(li6);
    
        var buttonTag = document.createElement("a");
        buttonTag.className = "button fit";
        buttonTag.innerHTML = "View Medical Record";
       // buttonTag.href = "/episense/charts?id=" + patient.patient_id;
        //buttonTag.data-poptrox = "trends";
    
        var brk = document.createElement("br");
        innerDiv.appendChild(brk);
    
        innerDiv.appendChild(buttonTag);
        
        imageIndex++;
    });
    
    var btns = document.getElementsByClassName('button fit');
    
    Array.from(btns).forEach(function(btn){
        btn.addEventListener('click', function(event){
            var patientId = btn.parentElement.children.patientID.className;
            var url = "/episense/charts?id=" + patientId;
            location.href = url;
        });
    });
}

