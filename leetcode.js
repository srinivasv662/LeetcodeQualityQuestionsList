const puppeteer = require("puppeteer");
const LinksGenerator = require("./LinksGenerator.js");
const pdfFile = require("./pdfFile");
const link = 'https://leetcode.com/problemset/all/';
let gPage;
let allLinks = [];
var sublist = [];
let noOfQuestions;

async function getGoodQuestions(count) {
    noOfQuestions = count;
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo: 100,
            args: ["--start-maximized"]
        });

        gPage = await browser.newPage();
        await getToProblemsListPage(link);
    } catch (err) {
        console.log(err);
    }
};

async function getToProblemsListPage(link) {
    try {
        await gPage.goto(link);

        for (let i = 1; i <= 39; i++) {
            await gPage.waitForSelector("tr");
            await getEachProblemsList();
        }

        await LinksGenerator.getAllProblemsLink(allLinks, gPage, noOfQuestions);
        await pdfFile.getInPDF();
    } catch (err) {
        console.log(err);
    }
}


async function getEachProblemsList() {
    try {
        await gPage.waitForSelector("tr");
        await getMeTheListFunc();
        await addToAllList();
        await gPage.waitForSelector(".ant-table-cell.ant-table-cell-ellipsis .overflow-hidden .flex.items-center .h-5.truncate", { visible: true });
        await waitAndClick("button path[d='M7.913 19.071l7.057-7.078-7.057-7.064a1 1 0 011.414-1.414l7.764 7.77a1 1 0 010 1.415l-7.764 7.785a1 1 0 01-1.414-1.414z']");
    } catch (err) {
        console.log(err);
    }
}

async function getMeTheListFunc() {

    return new Promise(async function (resolve, reject) {
        sublist = await gPage.evaluate(function () {
            let allProblemsLink = document.querySelectorAll(".ant-table-cell.ant-table-cell-ellipsis .overflow-hidden .flex.items-center");
            let sublist = [];
            for (let i = 0; i < allProblemsLink.length; i++) {
                if (allProblemsLink[i].querySelector("svg") == null) {
                    var a = allProblemsLink[i].querySelector(".h-5.truncate").getAttribute("href");
                    console.log(a);
                    sublist.push(a);
                }
            }
            return sublist;
        });
        resolve(sublist);
    })
}

async function waitAndClick(selector) {
    try {
        await gPage.waitForSelector(selector, { visible: true });
        await gPage.click(selector);
        await gPage.waitForSelector("tr");
    }
    catch (err) {
        console.log(err);
    }
}

async function addToAllList(){
    for(let i = 0; i < sublist.length; i++){
        allLinks.push("https://leetcode.com" + sublist[i]);
    }
}



module.exports = {
    getGoodQuestions: getGoodQuestions
}
