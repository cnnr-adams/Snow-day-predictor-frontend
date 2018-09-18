let postalCode = "";
let date;
inputDate(1);

function inputPostalCode(value) {
    postalCode = value;
}

function inputDate(value) {
    var d = new Date();
    d.setDate(d.getDate() + Number(value));
    date = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + (d.getDate())).slice(-2)}`;
}

function submit() {
    if (postalCode.length > 0 && date.length > 0) {
        window.location.href = `result/${postalCode}/${date}`;
    } else {
        alert("Invalid Postal Code");
    }
}

