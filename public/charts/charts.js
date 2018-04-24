if(location.search){
    var searchString = location.search;
    var stArr = searchString.split("=");
    var patientID = stArr[1];
    var doctorEmail = sessionStorage.getItem("loginEmail");
}

 var getTimestampsURL = "http://localhost:3001/patients/" + patientID + "/history/timestamps";

 var timeArray;

$.ajax({
  url: getTimestampsURL,
  type: 'GET',
  success: function(res) {
      timeArray = res;

      for(var i = 0; i < timeArray.length; i++){
      }
  }
});

var ctx = document.getElementById("lineChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        datasets: [{
            label: 'Number of Seizures',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});