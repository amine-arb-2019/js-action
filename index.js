const core = require('@actions/core');
const github = require("@actions/github");
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github;
    core.info(`Waiting ${ms} milliseconds ...`);

    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');
    core.info(`stringList ${stringList} `);
    core.info(`context ${context}!`);

    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
