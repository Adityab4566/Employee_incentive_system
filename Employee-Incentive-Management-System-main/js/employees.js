var selectedRow = null;

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main= document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);
}

//Clear All Fields
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#jobRole").value = "";
    document.querySelector("#department").value = "";
    document.querySelector("#sales").value = "";
    document.querySelector("#baseSalary").value = "";
}


//Add Data

document.querySelector("#employee-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const jobRole = document.querySelector("#jobRole").value;
    const department = document.querySelector("#department").value;
    const sales = document.querySelector("#sales").value;
    const baseSalary = document.querySelector("#baseSalary").value;


//validate data

if(firstName == "" || lastName == "" || email == "" || jobRole == "" || department == "" || sales == "" || baseSalary == "")
    showAlert("Please fill in all fields" , "danger");
else{
    if(selectedRow == null){
        const list = document.querySelector("#employee-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>id</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${jobRole}</td>
        <td>${department}</td>
        <td>${sales}</td>
        <td>${baseSalary}</td>
        <td>percentage</td>
        <td>bonus</td>
        <td>eligibility</td>
        <td>package</td>
        <td>
        

        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        `;

        list.appendChild(row);
        selectedRow =  null;
        showAlert("Employee Added", "success");
    }

    else{
        selectedRow.children[0].textContent = firstName;
        selectedRow.children[1].textContent = lastName;
        selectedRow.children[2].textContent = email;
        selectedRow.children[3].textContent = jobRole;
        selectedRow.children[4].textContent = department;
        selectedRow.children[5].textContent = sales;
        selectedRow.children[6].textContent = baseSalary;
        showAlert("Employee Info Edited", "info");
    }

    clearFields();
}
});

// Edit Data 


document.querySelector("#employee-list").addEventListener("click" , (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[1].textContent;
        document.querySelector("#lastName").value = selectedRow.children[2].textContent;
        document.querySelector("#email").value = selectedRow.children[3].textContent;
        document.querySelector("#jobRole").value = selectedRow.children[4].textContent;
        document.querySelector("#department").value = selectedRow.children[5].textContent;
        document.querySelector("#sales").value = selectedRow.children[6].textContent;
        document.querySelector("#baseSalary").value = selectedRow.children[7].textContent;
    }
})

//Delete Data

document.querySelector("#employee-list").addEventListener("click", (e) => {
target = e.target;
if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("Employee Data Deleted","danger");
    }
});