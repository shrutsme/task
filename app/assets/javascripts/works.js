$(document).ready(function() {
  $("#sortable" ).sortable();
  $("#addTask").keyup(function (e) {
      if (e.keyCode == 13) {
        var name_tsk = document.getElementById("addTask").value;
          $.ajax({
              type: 'POST',
              url:'../works',
              dataType : 'json',
              data: {work:{ name: name_tsk }}
            })
          .done(function(data) {
            if (data.id != '0')
            { 
              $("#sortable").prepend('<li class="ui-state-default" id=data.id>'+name_tsk+'<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Delete"><i class="fa fa-trash-o "></i></button></li>');
            }
            else
            {
               alert( "information not saved.");
            }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          })
          
      }
  });  
});


