async function addEmployee() {
    const employeeAddress = document.getElementById('employeeAddress').value;
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('employeeName').value;

    const response = await fetch('/add-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeAddress, id, name }),
    });
    const data = await response.text();
    alert(data);
}

async function payIncentive() {
    const employeeAddress = document.getElementById('employeeAddress').value;
    const amount = document.getElementById('incentiveAmount').value;

    const response = await fetch('/pay-incentive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeAddress, amount }),
    });
    const data = await response.text();
    alert(data);
}
