const scriptURL = "https://script.google.com/macros/s/AKfycbxCYzkOHTG3Vm2gEXad3QmXY3NsGCmLiE8yhp3O-JsylPTpzfiEQIDBkhoumfu4pllW/exec"; 

function sendOTP() {
    const empCode = document.getElementById("empCode").value;
    if (!empCode) {
        alert("Please enter Employee Code");
        return;
    }

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ action: "sendOTP", empCode: empCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("OTP sent to your email.");
            document.getElementById("otpSection").style.display = "block";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

function verifyOTP() {
    const empCode = document.getElementById("empCode").value;
    const otp = document.getElementById("otp").value;

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ action: "verifyOTP", empCode: empCode, otp: otp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("OTP Verified!");
            fetchAttendance(empCode);
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

function fetchAttendance(empCode) {
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ action: "fetchAttendance", empCode: empCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("attendanceSection").style.display = "block";
            const table = document.getElementById("attendanceTable");
            table.innerHTML = "";

            const empDetails = data.attendance;

            // Create header row
            let headerRow = table.insertRow();
            Object.keys(empDetails).forEach(key => {
                let th = document.createElement("th");
                th.innerHTML = key;
                headerRow.appendChild(th);
            });

            // Create data row
            let dataRow = table.insertRow();
            Object.values(empDetails).forEach(value => {
                let cell = dataRow.insertCell();
                cell.innerHTML = value;
            });
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

