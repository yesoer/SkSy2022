// fill the edit form with the data from localStorage
export function todoEditSetup() {
    const editTodoStr = window.localStorage.getItem("editItem")
    const editTodo = JSON.parse(editTodoStr)
    $('#todoProgress').slider('setValue', editTodo.progress);
    $("#todoDueDate").datepicker("setDate", new Date(editTodo.dueDate * 1000))
    $("#todoContent").val(editTodo.content)
}

// return to main Page button
$(function() {
    $('#backButton').on('click', function() {
        returnToHome()
    });
});

// attach to create button and on click send put request to server
$(function() {
    $("#editTodo").on('click', function() {
  
      const progress = $('#todoProgress').slider('getValue')
      const dueDate = $("#todoDueDate").datepicker("getDate")?.getTime() / 1000
      const content = $("#todoContent").val()
      
      const preEditTodoStr = window.localStorage.getItem("editItem")
      const preEditTodo = JSON.parse(preEditTodoStr)

      const todo = {
        progress,
        content,
        dueDate,
        _id : preEditTodo._id
      };
      
      fetch('http://localhost:8080/todo', {
          method: 'PUT',
          body: JSON.stringify(todo),
          headers: {
              'Content-type': 'application/json; charset=UTF-8'
          }
      })

      returnToHome()
    })
})

function returnToHome() {
    // clean up localStorage
    window.localStorage.removeItem("editItem")
    window.location.replace("/index.html");
}