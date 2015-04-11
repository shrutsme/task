$(document).ready(function() {
  $("#lisort" ).sortable();

  $("#Delete").click(function(event) {
    /* Act on the event */
    // add pop-up
    var Id = $('#detailedTask').attr("data-id");
    
    var obj = $('li[data-id='+Id+']');
    console.log(obj);
    $.ajax({
              type: 'DELETE',
              url:'../works/'+Id,
            })
          .done(function() {  
               $(obj).remove();
               $("#detailedTask").hide();
               $("#taskList").velocity({translateX: "100px"});
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }) 

  });

  $("#lisort").on('click','li',function(event){
    $("#taskList").velocity({translateX: "-100px"});
    var Id = $(this).data("id");
    var name_task = $(this).text();
    $("#detailedTask h2").html(name_task);
    $('#detailedTask').attr("data-id", Id)
    $("#detailedTask").show();

    $("#detailedTask").velocity({translateX: "-100px"});
  });

  $("#addTask").keyup(function (e) {
      if (e.keyCode == 13) {
        var name_tsk = document.getElementById("addTask").value;
        if (name_tsk.length  > 0){
          $.ajax({
              type: 'POST',
              url:'../works',
              dataType : 'json',
              data: {work:{ name: name_tsk }}
            })
          .done(function(data) {
            if (data.id != '0')
            { 
              $("#addTask").val(" ");
              $("#sortable").prepend('<li class="ui-state-default" data-id='+data.id+'>'+name_tsk+'<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Delete"><i class="fa fa-trash-o "></i></button></li>');
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
        else
        { // change it to modal
          alert( "Enter information");
        }
      }
       
  });  
});


