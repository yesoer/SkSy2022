// fill the edit form with the data from localStorage
export function todoEditSetup() {
    const editTodoStr = window.localStorage.getItem("editItem")
    const editTodo = JSON.parse(editTodoStr)
    $('#todoProgress').slider('setValue', editTodo.progress);
    $("#todoDueDate").datepicker("setDate", new Date(editTodo.duedate * 1000))
    $("#todoContent").val(editTodo.content)
  
    // clean up localStorage
     window.localStorage.removeItem("editItem")
}

// return to main Page button
$(function() {
    $('#backButton').on('click', function() {
      window.location.replace("/index.html");
    });
});

// attach to create button and on click send put request to server
$(function() {
    $("#editTodo").on('click', function() {
  
      const progress = $('#todoProgress').slider('getValue')
      const dueDate = $("#todoDueDate").datepicker("getDate")?.getTime() / 1000
      const content = $("#todoContent").val()
      const preEditTodo = window.localStorage.getItem("editItem")
  
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
    })
})