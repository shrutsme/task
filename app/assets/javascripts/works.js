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
    $("#taskList").velocity({translateX: "-70px"});
    var Id = $(this).data("id");
    var name_task = $(this).text();
    $("#detailedTask h2").html(name_task);
    $('#detailedTask').attr("data-id", Id)
    $("#detailedTask").show();
    $('#descTask').val("");
    $("#descTask").fadeTo( 0, 1);
    $.ajax({
              type: 'GET',
              url:'../works/'+Id,
              dataType: "json"
            })
          .done(function(data) {  
               
               if (data.desc != null)
                { // populate text
                  $('#descTask').val(data.desc);
                }
                else
                {
                  $('#descTask').val("Add Description here!");
                }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }) 

  });

 $("#descTask").click(function(event){
    $("#descTask").fadeTo( 0, 1);

 });

  $("#descTask").keyup(function (e) {
    if (e.keyCode == 13) {
      var Id =  $('#detailedTask').attr("data-id");
      var desc_task = $('#descTask').val();
      console.log(Id);
      $.ajax({
              type: 'PUT',
              url:'../works/'+Id,
              dataType : 'json',
              data: {desc: desc_task }
            })
          .done(function(data) {
            if (data.id != '0')
            { 
              $("#descTask").val(desc_task);
              alert( "saved.");
              $("#descTask").fadeTo( 0, .5);
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


