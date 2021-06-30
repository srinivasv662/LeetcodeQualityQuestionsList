const fs = require("fs");
const PDFdocument = require("pdfkit")

function pdfConversion(jsonObj, pdfTitle) {
    var doc = new PDFdocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream(`${pdfTitle} Questions.pdf`))

    doc
    .fontSize(25).font('Times-Roman').text(`${pdfTitle} Questions`, {
        underline: true,
        align: 'center'
    })
    .moveDown(1.0)

    doc.lineGap(3)

    let nObj = JSON.parse(jsonObj);

    for (let difficultyLevel in nObj) {

        doc.fontSize(15)

        doc.font('Times-Roman')
           .text(`${difficultyLevel}`)

        let nProblems = nObj[difficultyLevel];

        for (let eachProblem in nProblems) {
            doc.font('Times-Roman').fontSize(10)
                .text(`Title : ${JSON.stringify(nProblems[eachProblem].ProblemName)}, 
                 ProblemQuality : ${JSON.stringify(nProblems[eachProblem].ProbelmQuality)}, Link : ${JSON.stringify(nProblems[eachProblem].ProblemLink)} `, {
                    link: nProblems[eachProblem].ProblemLink,
                    width: 500
                })
        }

        doc.moveDown(1.0);

    }
    doc.end()
}

module.exports = {
    pdfConversion:pdfConversion
}