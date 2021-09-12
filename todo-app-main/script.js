

function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");

  db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let items = [];
    let left = 0;
    snapshot.docs.forEach((docc) => {
      items.push({
        id: docc.id,
        ...docc.data(),
      });
    });

    let ids = [];

    items.forEach((item) => {
      item.status == "active" ? (left += 1) : ids.push(item.id);
    });

    document.getElementById("clear-items").addEventListener("click", function () {
      clear(ids);
    });

    generateItems(items);
    document.querySelector(".items-left").innerHTML = `${left} items left`;

    document
      .getElementById("active-tasks")
      .addEventListener("click", function () {
        activeTasks(items);
        var element = document.getElementById("active-tasks");
        element.classList.add("clicked");

        var element2 = document.getElementById("completed-tasks");
        element2.classList.remove("clicked");

        var element3 = document.getElementsByClassName("active");
        element3.classList.remove("clicked");
      });
    
    document
      .getElementById("completed-tasks")
      .addEventListener("click", function () {
        completedTasks(items);
        var element = document.getElementById("completed-tasks");
        element.classList.add("clicked");

        var element2 = document.getElementById("active-tasks");
        element2.classList.remove("clicked");

        var element3 = document.getElementsByClassName("active");
        element3.classList.remove("clicked");
      });
    
    document
      .getElementsByClassName("active")
      .addEventListener("click", function () {
        generateItems(items);

        var element = document.getElementById("completed-tasks");
        element.classList.remove("clicked");

        var element2 = document.getElementById("active-tasks");
        element2.classList.remove("clicked");

        var element3 = document.getElementsByClassName("active");
        element3.classList.add("clicked");

      });
    
  });
}

// -----------------------------------------------------------------------------------------------------------------------------------------

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    itemsHTML += `
        <div class="todo-item">
          <div class="check">
            <div data-id = "${item.id}" class="check-mark ${
      item.status == "completed" ? "checked" : ""
    }">
              <img src="images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
            ${item.text}
          </div>
        </div>
        `;
  });
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}

// -----------------------------------------------------------------------------------------------------------------------------------------

function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id);
    });
  });
}

// -----------------------------------------------------------------------------------------------------------------------------------------

function markCompleted(id) {
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed",
        });
      } else if (status == "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}

// -----------------------------------------------------------------------------------------------------------------------------------------

function activeTasks(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    item.status == "active"
      ? (itemsHTML += `
        <div class="todo-item">
          <div class="check">
            <div data-id = "${item.id}" class="check-mark ${
          item.status == "completed" ? "checked" : ""
        }">
              <img src="images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
            ${item.text}
          </div>
        </div>
        `)
      : itemsHTML;
  });
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}

// -----------------------------------------------------------------------------------------------------------------------------------------

function completedTasks(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    item.status == "completed"
      ? (itemsHTML += `
        <div class="todo-item">
          <div class="check">
            <div data-id = "${item.id}" class="check-mark ${
          item.status == "completed" ? "checked" : ""
        }">
              <img src="images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
            ${item.text}
          </div>
        </div>
        `)
      : itemsHTML;
  });
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}


// -----------------------------------------------------------------------------------------------------------------------------------------


function clear(ids) {
  
  ids.forEach((field) => {
    db.collection("todo-items")
      .doc(field)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  })

}

// -----------------------------------------------------------------------------------------------------------------------------------------

getItems();



