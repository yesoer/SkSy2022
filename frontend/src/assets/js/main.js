/* npm package imports */
import 'bootstrap';
import 'bootstrap-slider';
window.$ = window.jQuery = require("jquery");
import 'bootstrap-datepicker';


// this sample data will be replaced with a call to the server 
// to fetch persistent todo data from the DB
let sampleData = [
  {
    content : "create basic TODO App",
    dueDate :1652133599, // due date as unix ts
    progress:99, // 0 <= p <= 100
  },
  {
    content : "review basic TODO App",
    dueDate :1652256900,
    progress:0,
  },
  {
    content : "Enjoy afterwork beer",
    dueDate :1652284800,
    progress:0,
  }
];

// depending on what page is open do different setup stuff
$(function() {
  switch(window.location.pathname) {
    case "/index.html": todoTableSetup(); break;
    case "/editTODO.html": todoEditSetup(); break;
    case "/newTODO.html": break;
    case "/imprint.html": break;
    default: todoTableSetup();
  }
});

// fill the edit form with the data from localStorage
function todoEditSetup() {
  const editTodoStr = window.localStorage.getItem("editItem")
  const editTodo = JSON.parse(editTodoStr)
  $('#todoProgress').slider('setValue', editTodo.progress);
  $("#todoDueDate").datepicker("setDate", new Date(editTodo.dueDate * 1000))
  $("#todoContent").val(editTodo.content)

  // clean up localStorage
   window.localStorage.removeItem("editItem")
}

// fill table and setup edit/delete functionality for each row
function todoTableSetup() {
  // get body of todo table
  let tableBody = document.getElementById("todoTable");

  // fill table from fetched todo data
  for (const [i, todo] of sampleData.entries()) {
    let tr = document.createElement('TR');
    tableBody.appendChild(tr);

    // create # cell
    let th = document.createElement('TH')
    th.appendChild(document.createTextNode(i+1))
    th.scope = "row"
    tr.appendChild(th)
    
    // create property cells
    for (let [key, value] of Object.entries(todo)) {
      let td = document.createElement('TD')
      
      if (key === "dueDate")
        value = new Date(value * 1000).toLocaleDateString()
      
      td.appendChild(document.createTextNode(value))
      tr.appendChild(td)
    }

    // create edit/delete cell
    tr.innerHTML +=`<td>
                      <div id="deleteTask${i}" class="table-btn">
                        <i class="bi bi-x"></i>
                      </div>
                      <div id="editTask${i}" class="table-btn">
                        <i class="bi bi-pencil-square"></i>
                      </div>
                    </td>`

    // set edit/delete click functionality
    $(`#deleteTask${i}`).on('click', function() {
    })

    $(`#editTask${i}`).on('click', function() {
      window.localStorage.setItem("editItem", JSON.stringify(todo))
      window.location.replace("/editTODO.html");
    })
  } 
}

$(function() {
  // navbar toggle behavior
  $('#navbarCollapse').on('click', function() {
    $('#navbar, #content').toggleClass('active');
  });
});

$(function() {
  // from current url deduct which navitem should be active
	var pathname = window.location.pathname;
	$('.nav > li > a[href="'+pathname+'"]').parent().addClass('active');
});

// setup datepicker
$(function() {
  $('.datepicker').datepicker({
    format: 'yyyy/mm/dd',
    autoclose: true,
    startDate: '+0d',
    todayHighlight: true
  });
});

//return to main Page button
$(function() {
  $('#backButton').on('click', function() {
    window.location.replace("/index.html");
  });
});

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
  })
})

//for the put method
$(function() {
  $("#editTodo").on('click', function() {

    const progress = $('#newTodoProgress').slider('getValue')
    const dueDate = $("#newTodoDueDate").datepicker("getDate")?.getTime() / 1000
    const content = $("#newTodoContent").val()

    const todo = {
      progress,
      content,
      dueDate
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