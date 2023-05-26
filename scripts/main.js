// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function () {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
  $("form").submit(handleSubmit)
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

async function handleSubmit(event) {
  event.preventDefault();


  //console.log("Input Meno:",$("#name").val());
  //console.log("Input Predmet:",$("#Subject").val());
  console.log("Input E-mail:", $('#_replyto').val());
  // console.log("Input Správa:",$("#message").val());


  const answer = parseInt($('#answer').val(),10);
  if (isNaN(answer) || answer !== 14){
    alert("Odpovedzte správne prosím.");
    return;
  }

  let data = {
    systemEmail: "emagallovicova@gmail.com",
    contactEmail:$("#_replyto").val(),
    message: $("#message").val()
    // message:""
  };

  console.log(data);

  let response = await fetch("https://emailsenderitweek.azurewebsites.net/api/ContactForm",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });


  let result = await response.json();

  if (result === "Zadaný systémový email nie je validný") {
    alert("Zadaný systémový email nie je validný");
  } else if (result === "Zadaný kontaktný email nie je validný") {
    alert("Zadaný kontaktný email nie je validný");
  } else if (result === "Správa je prázdna, vaša žiadosť nebola odoslaná") {
    alert("Správa je prázdna, vaša žiadosť nebola odoslaná");
  } else if (result === "Email bol odoslaný") {
    alert("Email bol odoslaný")
    form.reset()
  }
}








