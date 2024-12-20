var selectedRow = null;

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#packageID").value = "";
    document.querySelector("#packageName").value = "";
    document.querySelector("#duration").value = "";
    document.querySelector("#destination").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#amenities").value = "";
}

// Add Data
document.querySelector("#package-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const packageID = document.querySelector("#packageID").value;
    const packageName = document.querySelector("#packageName").value;
    const duration = document.querySelector("#duration").value;
    const destination = document.querySelector("#destination").value;
    const location = document.querySelector("#location").value;
    const amenities = document.querySelector("#amenities").value;

    // Validate data
    if (packageID == "" || packageName == "" || duration == "" || destination == "" || location == "" || amenities == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#package-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${packageID}</td>
                <td>${packageName}</td>
                <td>${duration}</td>
                <td>${destination}</td>
                <td>${location}</td>
                <td>${amenities}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;

            list.appendChild(row);
            selectedRow = null;
            showAlert("Package Added", "success");
        } else {
            selectedRow.children[0].textContent = packageID;
            selectedRow.children[1].textContent = packageName;
            selectedRow.children[2].textContent = duration;
            selectedRow.children[3].textContent = destination;
            selectedRow.children[4].textContent = location;
            selectedRow.children[5].textContent = amenities;
            showAlert("Package Info Edited", "info");
        }

        clearFields();
    }
});

// Edit Data 
document.querySelector("#package-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#packageID").value = selectedRow.children[0].textContent;
        document.querySelector("#packageName").value = selectedRow.children[1].textContent;
        document.querySelector("#duration").value = selectedRow.children[2].textContent;
        document.querySelector("#destination").value = selectedRow.children[3].textContent;
        document.querySelector("#location").value = selectedRow.children[4].textContent;
        document.querySelector("#amenities").value = selectedRow.children[5].textContent;
    }
});

// Delete Data
document.querySelector("#package-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Package Data Deleted", "danger");
    }
});
