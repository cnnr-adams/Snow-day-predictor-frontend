console.log("yeet on the haters");

let postalCode = "";
let date;
inputDate(1);

function inputPostalCode(value) {
    postalCode = value;
    console.log(`yeet on the ${value}`);
}

function inputDate(value) {
    console.log(value);
    var d = new Date();
    d.setDate(d.getDate() + Number(value));
    date = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + (d.getDate())).slice(-2)}`
    console.log(`yote on this date: ${date}`);
}

function submit() {
    if (postalCode.length > 0 || date.length > 0) {
        console.log("done yeeted");
        window.location.href = `result/${postalCode}/${date}`;
    } else {
        alert("you forgot to put in the stuff LOSER");
    }
}

