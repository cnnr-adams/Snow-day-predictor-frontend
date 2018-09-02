console.log("yeet on the haters");

let postalCode = "";
let date;
inputDate(1);

function inputPostalCode(value) {
    postalCode = value;
    console.log(`yeet on the ${value}`);
}

function inputDate(value) {
    var d = new Date();
    d.setDate(d.getDate() + value);
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
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

