// fade input on load
$(document).ready(function() {
    $("input[type=text]").fadeOut();
    $("#add-new").fadeOut();
  });
  
  // toggle fade for add new input
  $(".add-new").click(function () {
    $("input[type=text]").fadeToggle();
    $("#add-new").fadeToggle();
  });
  
  $('#add-domain').submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: $(this).attr( 'action' ),
        data: $(this).serialize(),
        success: function( response ) {
            console.log( "response from JQUERY" + response );
        }
    });
    var newDomain = $("input[type=text]").val();
    $("input[type=text]").val("");
    $("tbody").append("<tr><td>" + newDomain + "</td><td>01/01/1970</td><td>02/02/1980</td><td>03/03/1990</td><td>Yes</td><td><button class='btn btn-primary'>Edit</button></td></tr>");
    return false;
  });


  // $("#add-domain").submit(function(event) {
  //   var $this = $(this); // form element
  //   $.post(
  //     $this.attr("action"),
  //     $this.serialize(),
  //     // function(data){
  //     //   console.log("data sent: " + data);
  //     // },
  //     // "json"
  //   );
  //   var newDomain = $("input[type=text]").val();
  //   $("tbody").append("<tr><td>" + newDomain + "</td><td>01/01/1970</td><td>02/02/1980</td><td>03/03/1990</td><td>Yes</td><td><button class='btn btn-primary'>Edit</button></td></tr>");
  // });

  // $("input[type=text]").keypress(function(event) {
  //   if (event.which === 13) {
  //     var newDomain = $(this).val();
  //     $(this).val("");
  //     $("#add-new").click();
  //     // create new domain listing
  //     $("tbody").append("<tr><td>" + newDomain + "</td><td>01/01/1970</td><td>02/02/1980</td><td>03/03/1990</td><td>Yes</td><td><button class='btn btn-primary'>Edit</button></td></tr>");
  //   }
  // });
  