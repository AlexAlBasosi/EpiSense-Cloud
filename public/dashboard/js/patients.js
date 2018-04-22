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
    h2Tag.innerHTML = arrResponse.Patients[0].first_name + " " + arrResponse.Patients[0].last_name;
    innerDiv.appendChild(h2Tag);

    console.log(document.querySelector(".thumbnails"));
    
    imageIndex++;
});
