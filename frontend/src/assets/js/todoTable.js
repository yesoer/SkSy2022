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
        if (key === "duedate")
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
        window.localStorage.getItem("editItem",)
        window.location.replace("/editTODO.html");
      })
    }
}