$(document).ready(function() {
  $("#sortable" ).sortable();
  $("#addTask").keyup(function (e) {
      if (e.keyCode == 13) {
        var name_tsk = document.getElementById("addTask").value;
        $("#sortable").prepend('<li>'+name_tsk+'</li>');
          $.ajax({
              type: 'POST',
              dataType : 'json',
              data: {work:{ name: name_tsk }}
            })
          .done(function() {
            alert( "Handler for .change() called.");
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          })
          
      }
  });  
});


