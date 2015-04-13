$(document).ready(function() {
  
  $("#lisort" ).sortable();
  $("#descTask").fadeTo( 0, .5);
  $("#hide").click(function(event) {
    $("#detailedTask").hide();
    $("#taskList").velocity("reverse");
  });
  var num = parseInt($('#completedTasks').text());
  if (num>0)
    $("#showCompleted").show();

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
             //  $("#taskList").velocity({translateX: "70px"});
               $("#taskList").velocity("reverse");

          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }) 

  });

  $("#lisort").on('click','li',function(event){
    var Id = $(this).data("id");
    var chObj = $(this).children(':checkbox');
    console.log($(chObj).is(':checked'));
    if( $(chObj).is(':checked') )
    {  var liObj = $(this);
       var complete_success = false;
      /* mark the task as complete */

      /* send post update request to the server */
      $.ajax({
              type: 'PUT',
              url:'../works/'+Id,
              dataType : 'json',
              data: {status: true }
            })
          .done(function(data) {
            if (data.id != '0')
            { 
              /* remove the li from the screen display */
              $(liObj).remove();
              alert( data.id );
              complete_success = true;
              var num = parseInt($('#completedTasks').text())+1;
              $('#completedTasks').text(num);
              $("#showCompleted").show();
              if ($("#detailedTask").is(':visible'))
              {
                $("#taskList").velocity("reverse");
                $('#detailedTask').hide();
              }
                
              
              // add show a panel of total number of complete status
            }
            else
            {
               alert( "information not saved.");
            }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          })
      

      
      
      /* show the total number of tasks complete */
      console.log(chObj);
    }
    else  
    { /* get the task details */

      $("#taskList").velocity({translateX: "-70px"});
      var name_task = $(this).text();
      $("#detailedTask h2").html(name_task);
      $('#detailedTask').attr("data-id", Id)
      $("#detailedTask").show();
      $('#descTask').val("");
      
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
    }
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
              $("#lisort").prepend('<li class="list-group-item" data-id='+data.id+'><input type="checkbox" class="completion_check" aria-label="Task Completed?">dfa<span>'+name_tsk+'</span></li>');
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


