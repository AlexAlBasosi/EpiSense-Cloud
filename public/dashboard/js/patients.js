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

Array.from(arrResponse.Patients).forEach(function(patient){
    console.log(patient);
});