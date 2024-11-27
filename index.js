const express = require("express");
const bodyParser = require("body-parser");
const africastalking = require("africastalking");

// Africa's Talking credentials
const AT = africastalking({
    apiKey: "atsk_1bff92555009137f736cd466a360bf973233e1530295c634dc961f177326f5079921814c",  
    username: "arnoldlimo" 
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// USSD logic
app.post("/ussd", (req, res) => {
    const { text } = req.body;
    let response = "";

    if (text === "") {
        response = `CON Welcome to Expressway Assistance
        1. Report Incident
        2. Check Incident Status`;
    } else if (text === "1") {
        response = `CON Select Incident Type
        1. Vehicle Breakdown
        2. Accident`;
    } else if (text === "1*1") {
        response = `CON Enter your location (e.g., Exit 5):`;
    } else if (text.startsWith("1*1*")) {
        const location = text.split("*")[2];
        response = `END Incident reported at ${location}. Help is on the way.`;
    } else if (text === "2") {
        response = `END Incident status: Pending. Assistance is on the way.`;
    } else {
        response = `END Invalid selection. Try again.`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

