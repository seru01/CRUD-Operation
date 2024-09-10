/**
 * This function is for controlling the
 * display of adding sales section.
 */

// Displaying addform button
function displaySalesForm() {
  document.getElementById("addForm").style.display = "block";
  document.getElementById("addsales").style.display = "none";
}

// Displaying addsales button
function closeSalesForm() {
  document.getElementById("addForm").style.display = "None";
  document.getElementById("addsales").style.display = "block";
}
// Displaying addform button
function closeForm() {
  document.getElementById("addsales").style.display = "block";
  document.getElementById("addForm").style.display = "None";
}

document.addEventListener("DOMContentLoaded", function () {
  fetchSalesPersons();
});

/**
 * This function is for refreshing the page
 */
function refreshPage() {
  location.reload();
}

/**
 * This function is for fetching
 * data from MySql.
 */
function fetchSalesPersons() {
  fetch("fetch.php")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#salesTable tbody");
      tbody.innerHTML = "";

      data.forEach((salesPerson) => {
        const row = document.createElement("tr");

        if (salesPerson.personID === null) {
          row.innerHTML = `
              <td colspan="2" style="font-weight: bold;">${salesPerson.personName}</td>
              <td>${salesPerson.itemA}</td>
              <td>${salesPerson.itemB}</td>
              <td>${salesPerson.itemC}</td>
              <td>${salesPerson.itemD}</td>
              <td>${salesPerson.itemTotal}</td>
            `;
        } else {
          row.innerHTML = `
              <td>${salesPerson.personID}</td>
              <td>${salesPerson.personName}</td>
              <td>${salesPerson.itemA}</td>
              <td>${salesPerson.itemB}</td>
              <td>${salesPerson.itemC}</td>
              <td>${salesPerson.itemD}</td>
              <td>${salesPerson.itemTotal}</td>
              <td id="actions">
              <button class="updateButton" onclick="updateSalesPerson(${salesPerson.personID}, '${salesPerson.personName}', ${salesPerson.itemA}, ${salesPerson.itemB}, ${salesPerson.itemC}, ${salesPerson.itemD})">Update</button>  
              <button onclick="deleteSalesPerson(${salesPerson.personID})">Delete</button>
                
              </td>
            `;
        }

        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

/**
 * This function is for Updating
 * MySQL data values.
 */

document
  .getElementById("updateSalesForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch("update.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) 
      .then((data) => {
        console.log(data); 
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  });

function updateSalesPerson(id, name, itemA, itemB, itemC, itemD) {
  document.getElementById("updatePersonID").value = id;
  document.getElementById("updatePersonName").value = name;
  document.getElementById("updateItemA").value = itemA;
  document.getElementById("updateItemB").value = itemB;
  document.getElementById("updateItemC").value = itemC;
  document.getElementById("updateItemD").value = itemD;

  document.getElementById("updateForm").style.display = "block";
}

function closeUpdateForm() {
  document.getElementById("updateForm").style.display = "none";
}

/**
 * This function is for the Deletion
 * of MySQL data.
 */
function deleteSalesPerson(id) {
  if (confirm("Are you sure you want to delete this record?")) {
    fetch(`delete.php?id=${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        fetchSalesPersons();
      });
  }
}
