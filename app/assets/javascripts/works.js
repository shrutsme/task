$(document).ready(function() {
  
  $("#lisort" ).sortable();
  $("#hide").click(function(event) {
    $("#detailedTask").hide();
    $("#taskList").velocity({translateX: "70px"});
  });

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
               $("#taskList").velocity({translateX: "70px"});
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
  

    $.ajax({
              type: 'GET',
              url:'../works/'+Id,
              dataType: "json"
            })
          .done(function(data) {  
               
               if (data.desc != null)
                { // populate text
                  $('#descTask').val(data.desc);
                  console.log(data);
                }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }) 

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
              $("#addTask").attr("placeholder","Add a task here!");
              $("#lisort").prepend('<li class="list-group-item" data-id='+data.id+'><span>'+name_tsk+'</span></li>');
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


