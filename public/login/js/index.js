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


const signUpForm = document.forms['signup-form'];

signUpForm.addEventListener('submit', function(event){
  event.preventDefault();
  const fname = signUpForm.querySelector('input[id=firstName]').value;
  const lname = signUpForm.querySelector('input[id=lastName]').value;
  const doctorID = signUpForm.querySelector('input[id=doctorID').value;
  const email = signUpForm.querySelector('input[id=email]').value;
  const password = signUpForm.querySelector('input[id=password]').value;
  const speciality = signUpForm.querySelector('input[id=speciality]').value;

  var signUpUrl = "/doctors?doctor_Id=" + doctorID + "&email=" + email + "&first_name=" + fname + "&last_name=" + lname + "&specialization=" + speciality + "&doctor_password=" + password;

  $.ajax({
    type: "POST",
    url: signUpUrl,
    dataType: "text",
    success: function (msg) {
      if (msg) {
        alert("Signup Successful!");
        location.reload(true);
      } else {
        alert("Signup failed.");
        }
      },
  });

});

const loginForm = document.forms['login-form'];

loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    const loginEmail = loginForm.querySelector('input[id=loginemail]').value;
    const loginPass = loginForm.querySelector('input[id=pass]').value;

    loginUrl = "/doctors/login?email=" + loginEmail + "&doctor_password=" + loginPass;

    $.ajax({
      type: "POST",
      url: loginUrl,
      dataType: "text",
      success: function (msg) {
          alert("Login successful!");
          window.location.replace('/episense/dashboard');
      },
      error: function(msg) {
        alert("Login failed.");
      }
    });
});