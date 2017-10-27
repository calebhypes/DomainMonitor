// fade input on load
$(document).ready(function() {
    $("input[type=text]").fadeOut();
  });
  
  // toggle fade for add new input
  $(".add-new").click(function () {
    $("input[type=text]").fadeToggle();
  });
  
  $("input[type=text]").keypress(function(event) {
    if (event.which === 13) {
      var newDomain = $(this).val();
      $(this).val("");
      // create new domain listing
      $("tbody").append("<tr><td>" + newDomain + "</td><td>01/01/1970</td><td>02/02/1980</td><td>03/03/1990</td><td>Yes</td><td><button class='btn btn-primary'>Edit</button></td></tr>");
    }
  });
  