console.log("yeet on the haters");

let postalCode = "";
let date = "";

function inputPostalCode(value) {
    postalCode = value;
    console.log(`yeet on the ${value}`);
}

function inputDate(value) {
    date = value;
    console.log(`yeet on the ${value}`);
}

function submit() {
    if (postalCode.length > 0 && date.length > 0) {
        console.log("done yeeted");
        window.location.href = `result/${postalCode}/${date}`;
    } else {
        console.log("go commit die");
    }
}

