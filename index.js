document.getElementById("saveBtn").addEventListener("click",save);

loadToDos();

function loadToDos(){
  document.getElementById("mytodos").innerHTML = "";
  var arr = [];
  arr = getAll();
  if(arr == null) {
    return;
  }


  for(var i=0; i<arr.length; i++){
   
    document.getElementById("mytodos").innerHTML += `
      <div class="cards"> 
        <h2>${arr[i].title}</h2>
        <h5>${arr[i].description}n</h4>
        <h4>${arr[i].category}</h6>


        <div class="svgs">
          <div class="edit-btn">
            <button class="edited-btn" data-id="${arr[i].id}">
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20px" height="20px"><path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/><path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/></svg>

            </button>
          </div>

          <div class="delete-btn-div">
            <button  class="deleted-btn" data-id="${arr[i].id}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20px" height="20px">
                <g>
                  <path d="M448,85.333h-66.133C371.66,35.703,328.002,0.064,277.333,0h-42.667c-50.669,0.064-94.327,35.703-104.533,85.333H64   c-11.782,0-21.333,9.551-21.333,21.333S52.218,128,64,128h21.333v277.333C85.404,464.214,133.119,511.93,192,512h128   c58.881-0.07,106.596-47.786,106.667-106.667V128H448c11.782,0,21.333-9.551,21.333-21.333S459.782,85.333,448,85.333z    M234.667,362.667c0,11.782-9.551,21.333-21.333,21.333C201.551,384,192,374.449,192,362.667v-128   c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333V362.667z M320,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333v-128c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M174.315,85.333c9.074-25.551,33.238-42.634,60.352-42.667h42.667   c27.114,0.033,51.278,17.116,60.352,42.667H174.315z"/>
                </g>
                
              </svg>
            </button>
          </div>
        </div>
      </div>
  `
  }
  document.querySelectorAll(".deleted-btn").forEach(button => {
    button.addEventListener("click", function()  {
     var id = this.getAttribute("data-id");
     deleteById(id);
    })

  });

  document.querySelectorAll(".edited-btn").forEach(button => {
    button.addEventListener("click", function()  {
     var id = this.getAttribute("data-id");
    fillForms(id);
    });
});
}

function save() {
  var toDos = [] ;

  var titleInput = document.getElementById("title").value;
  var descriptionInput = document.getElementById("description").value;
  var categoryInput = document.getElementById("category").value;
  var idInput = document.getElementById("id").value;

  var itemsFromLS = JSON.parse( localStorage.getItem("toDoList"));
  if(itemsFromLS != null) {
    toDos.push(...itemsFromLS);
  }
 
  var idofObject ;

  if(idInput == "") {
    idofObject  = generateId();
  } else {
    idofObject = +idInput ;
  }

  var toDoobject = {  
    id:idofObject,
    title: titleInput,
    description: descriptionInput,
    category: categoryInput,
  }

  if( idInput == "") {
    toDos.push(toDoobject);
  } 
  else {
    var find = toDos.find(x => x.id === idofObject);
    var index = toDos.indexOf(find);
    toDos[index] = toDoobject;
  }

  localStorage.setItem("toDoList", JSON.stringify(toDos));

  loadToDos();
  clearForms();
}


function getAll(){
  var itemsFromLS = JSON.parse(localStorage.getItem("toDoList"));
  return itemsFromLS;
}


function getById(id) {
  var getAlldata = getAll();
  var findId = getAlldata.find(x => x.id === id);
  if(findId === undefined) {
    return null;
  }
  return findId;
}


function deleteById(id) {
  var getAlldata = getAll();
  var findId = getAlldata.find(x => x.id === +id);
  var index = getAlldata.indexOf(findId);
  getAlldata.splice(index ,1);
  localStorage.setItem("toDoList", JSON.stringify(getAlldata));
  loadToDos();
}

function fillForms(id) {
  var getbyid = getById(+id);

  document.getElementById("title").value = getbyid.title;
  document.getElementById("description").value =getbyid.description;
  document.getElementById("category").value = getbyid.category;
  document.getElementById("id").value = getbyid.id;

} 
function clearForms() {
  document.getElementById("title").value = "";
  document.getElementById("description").value ="";
  document.getElementById("category").value = "";
  document.getElementById("id").value ="";
}

function generateId() {
  return Math.floor(Math.random()*(999-100+1)+100);
}

