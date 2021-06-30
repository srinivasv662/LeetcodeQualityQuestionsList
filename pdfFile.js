const convertToPdf = require("./convertToPdf.js");
let fs = require("fs");

function getInPDF(){
    let QuestionsInJson = fs.readFileSync("GoodQualityLeetcodeQuestions.json");
    // let b = JSON.parse(a);
    convertToPdf.pdfConversion(QuestionsInJson, "Good Quality Leetcode");
}

module.exports = {
    getInPDF: getInPDF
}
