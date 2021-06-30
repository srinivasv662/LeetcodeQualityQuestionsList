
const leetcode = require('./leetcode.js');

// From the first 100 problems or your input Number -> give me the problems that have upVotes percentage greater than 70%

// "Do you want us to list Good Quality Questions which has upvotes percentage greater than 70% ?"
// 1.If you need Good Quality Questions than type yes"
// 2.next enter the number of questions from which only good quality questions will be retreived
// Ex. node start.js yes 80
// The above cmd will provide from the first 80 questions, only those questions that have good number of Upvotes i.e., Greater >= 70%
let input = process.argv.slice(2);

let agree = input[0];
let numberOfQuestions = Number(input[1]);

if(agree == "yes" && (numberOfQuestions >= 1 && numberOfQuestions <= 1900)){
    leetcode.getGoodQuestions(numberOfQuestions);
} else{
    console.log("Please Rerun the program and Provide Correct input");
}

// let's try to get Good Quetions with UpVotes >= 70% from first 50 problems of Leetcode