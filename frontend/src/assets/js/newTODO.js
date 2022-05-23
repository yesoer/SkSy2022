// attach to create button and on click send post request to server
$(function() {
    $("#createTodo").on('click', function() {
  
      const progress = $('#newTodoProgress').slider('getValue')
      const dueDate = $("#newTodoDueDate").datepicker("getDate")?.getTime() / 1000
      const content = $("#newTodoContent").val()
  
      const todo = {
        progress,
        content,
        dueDate
      };
      
      fetch('http://localhost:8080/todo', {
          method: 'POST',
          body: JSON.stringify(todo),
          headers: {
              'Content-type': 'application/json; charset=UTF-8'
          }
      })

      // return to home page
      window.location.replace("/index.html");
    })
})