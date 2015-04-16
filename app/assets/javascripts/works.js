$(document).ready(function() {
  var taskList = $("#taskList");
  var constants = {
    'list_left':"-70px",
    'list_right':"0px"
  };

  function move() {
    $(taskList).velocity({
        left: constants.list_left, duration:4000
    }, function() {
        $(this).addClass("moved");
    });
  }
  function back() {
    $(taskList).velocity({
        left: constants.list_right, duration:4000
    }, function() {
        $(this).removeClass("moved");
    });
  }

  
  $("#lisort" ).sortable({
     axis: "y"
  });
  
  $("#descTask").fadeTo( 0, .5);
  $("#hide").click(function(event) {
   

  //  $("#detailedTask").velocity("transition.slideLeftOut",1000);
  $("#detailedTask").velocity("transition.slideLeftOut",800);
    if ($(taskList).hasClass('moved'))
      back();

  //  $("#taskList").velocity("transition.slideLeftIn",2000, "linear");
  });
  var num = parseInt($('#completedTasks').text());
  if (num>0)
    $("#showCompleted").show();

  $("#Delete").click(function(event) {
    /* Act on the event */
    var confirm = false;
    bootbox.dialog({
    message: "It will delete the task from to-do list.",
    title: " Sure you want to delete?",
    buttons: {
      success: {
        label: "Cancel",
        className: "btn-default",
        callback: function() {
          confirm = true;
        }
      },
      danger: {
        label: "OK",
        className: "btn-danger",
        callback: function() {
          var Id = $('#detailedTask').attr("data-id");
      
      var obj = $('li[data-id='+Id+']');
      console.log(obj);
      $.ajax({
                type: 'DELETE',
                url:'../works/'+Id,
              })
            .done(function() {  
                 $(obj).remove();
                 var detailsObj = $("#detailedTask");
                 $(detailsObj).hide();
                 //$(detailsObj).children("div").hide();
                 //$("#taskList").velocity("transition.slideLeftIn",2000);
                 if ($(taskList).hasClass('moved'))
                  back();


            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(errorThrown);
            }) 
        }
      },
    }
  });

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
              complete_success = true;
              var num = parseInt($('#completedTasks').text())+1;
              var detailsObj = $('#detailedTask');
              $('#completedTasks').text(num);
              $("#showCompleted").show();
              if ($(detailsObj).is(':visible') && $(detailsObj).attr("data-id") == Id)
              {
              //  $("#taskList").velocity("transition.slideLeftIn",2000);
                if ($(taskList).hasClass('moved'))
                  back();
                $(detailsObj).hide();
                
              }
            }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          })
    }
    else  
    { /* get the task details */

      
      var name_task = $(this).text();
      $("#detailedTask h2").html(name_task);
      $('#detailedTask').attr("data-id", Id);
      if (!($(taskList).hasClass('moved')))
        move();
    //  $("#taskList").velocity({translateX: "-70px",duration: 6000});
      $("#detailedTask").velocity("transition.slideLeftIn",800);
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
              $("#descTask").fadeTo( 0, .5);
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
              $("#lisort").prepend('<li class="list-group-item task-item" data-id='+data.id+'><input type="checkbox" class="completion_check" aria-label="Task Completed?"><span>'+name_tsk+'</span></li>');
            }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          })
        }
      }
       
  });  
});


