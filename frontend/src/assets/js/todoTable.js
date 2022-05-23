// fill table and setup edit/delete functionality for each row
export function todoTableSetup() {
    // get todo list from the server
    fetch('http://localhost:8080/todo', {
          method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      // get body of todo table
      let tableBody = document.getElementById("todoTable");
      fillTable(tableBody, res)
    }) 
}

// fills the given todo table body element with the given todo data
function fillTable(tableBodyElem, data) {
    if (!data)
      return

    // fill table from fetched todo data
    for (const [i, todo] of data.entries()) {
      let tr = document.createElement('TR');
      tableBodyElem.appendChild(tr);
  
      // create # cell
      let th = document.createElement('TH')
      th.appendChild(document.createTextNode(i+1))
      th.scope = "row"
      tr.appendChild(th)

      // create property cells
      for (let [key, value] of Object.entries(todo)) {
        let td = document.createElement('TD')
        
        // handle special cell cases
        if (key === "_id")
          continue
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
      
      tr.id = todo._id

      // set edit/delete click functionality
      $(`#deleteTask${i}`).on('click', function() {
        // delete todo and remove row from table
        deleteTodo(todo._id).then(() => {
            $(`#${todo._id}`).remove();
        })
      })
  
      $(`#editTask${i}`).on('click', function() {
        // store todo in localStorage for edit
        window.localStorage.setItem("editItem", JSON.stringify(todo))
        window.location.replace("/editTODO.html");
      })
    }
}

// sends delete todo request to server
async function deleteTodo(todoId) {
    fetch('http://localhost:8080/todo', {
        method: 'DELETE',
        body: JSON.stringify({_id : todoId}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
}