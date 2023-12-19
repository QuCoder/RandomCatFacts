

//GitHub API Library
const { Octokit } = require('@octokit/rest');

//Insert your GitHub tokens here in next format ['token1', 'token2', 'token'] 
const gitTokens = ['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']
//Insert your GitHub names here in next format ['namel', 'name2', 'name'] 
const gitNames = ['jasterjitko']

﻿
function generateUniqueName () {
return 'result_${Math.floor(Math.random() * 150000000)}.txt';
}

async function pushRandomCatName (repoOwner, token) {
const octokot = new Octokit ({auth: token});

try {


const branchFilesData = await octokit.rest.repos.getContent({ 
owner: repoOwner,
repo: 'randomCatFacts',
branch: 'main',
});

console.log(branchFilesData, 'branchFilesData')

//Get random cat fact
const catsResponse = await fetch("https://catfact.ninja/fact"); 
const { fact } = await catsResponse.json();

//Generate unique name for the file
let randomName = generateUniqueName();

//Check if file name is unique in the repo
const isAlreadyFileNameExist = !! branchFilesData.data.find((user) => { 
return user.path === randomName;
});

//If file name is not unique, generate new name
if (isAlreadyFileNameExist) {
pushRandomCatName (repoOwner, token);
}

// Push file to the repo
await octokit.rest.repos.createorUpdateFileContents({
owner: repoOwner,
repo: 'randomCatFacts',
path: randomName,
message: 'Another great day with great cat fact',
content: Buffer.from(fact).toString('base64'), 
branch: 'main',
});
console.log('Pushed fact to randomCatFacts');
} catch (error) {
console.error('Error pushing fact to randomCatFacts', error);
}
}
//Function to start execution function startExecution() {
gitTokens.forEach((token, index) => {
pushRandomCatName (gitNames [index], token);
})
}

//Start execution
startExecution();

