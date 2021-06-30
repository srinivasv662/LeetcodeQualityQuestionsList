let fs = require("fs");
let data = {};

result = {};

let gPage;
let problemName = [];
let problemsLinks = [];
async function getAllProblemsLink(allLinks, page, count){
    gPage = page;
    for(let i = 1; i < allLinks.length; i++){
        let str = allLinks[i].slice(30).split("-").join(" ");

        if(data[str] == undefined){
            data[str] = allLinks[i];
            problemName.push(str);
            problemsLinks.push(allLinks[i]);
        }

        if(problemsLinks.length == count){
            break;
        }
    }
    
    for(let i = 0; i < problemsLinks.length; i++){
        await getInfo(problemsLinks[i], problemName[i]);
    }
}

async function getInfo(link, name){
    try{
        await gPage.goto(link);
        await gPage.waitForSelector(".css-10o4wqw");
        let intermediateLinks = await gPage.evaluate(function(){
            let difficultyLevel = document.querySelector(".css-10o4wqw div").innerText;
            let Votes = document.querySelectorAll(".css-10o4wqw button");
            let upVote = Number(Votes[0].innerText);
            let downVote = Number(Votes[1].innerText);
            let ratio = (upVote * 100/(upVote + downVote)).toFixed(2);

            console.log(difficultyLevel);
            console.log((upVote * 100/(upVote + downVote)).toFixed(2));

            return {difficultyLevel, ratio};
        });
        await addToList(intermediateLinks, link, name);
        
    } catch(err){
        console.log(err);
    }
}

async function addToList(intermediateLinks, link, name){
    
    let difficultyLevel = intermediateLinks.difficultyLevel;
    let ratio = intermediateLinks.ratio;

    if(ratio < 70){
        return;
    } else if(!result[difficultyLevel]){
        result[difficultyLevel]= [];
        result[difficultyLevel].push({"ProblemName":name, "ProbelmQuality": ratio, "ProblemLink":link});
    } else{
        result[difficultyLevel].push({"ProblemName":name, "ProbelmQuality": ratio, "ProblemLink":link});
    }

    // console.log(result);
    fs.writeFileSync("GoodQualityLeetcodeQuestions.json", JSON.stringify(result));
}


module.exports = {
    getAllProblemsLink: getAllProblemsLink,
}