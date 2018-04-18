$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

 const loginForm = document.forms['login-form'];

loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    const user = loginForm.querySelector('input[id=user]').value;
    const pass = loginForm.querySelector('input[type=password]').value;

    urlString = "/patients?patient_id=" + user + "&patient_password=" + pass;

    console.log(urlString);

    $.ajax({
      type: "POST",
      url: "/patients?patient_id=9&patient_password=pass&first_name=alex",
      dataType: "text",
      success: function (msg) {
        if (msg) {
          alert("Somebody" + name + " was added in list !");
          location.reload(true);
        } else {
          alert("Cannot add to list !");
          }
        },
    });
});

// function login(){
//   var user = $("user").val();
//   console.log(user);
// }

// function submit(){
//   console.log("potato");
//   alert("poato");
// }
