const core = require('@actions/core');
const github = require("@actions/github");


// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github.context;
    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');
    core.info(`stringList ${stringList} `);
    core.info(`context ${context}!`);

    core.info(`context ${context.eventName}!`);
    core.info(`context ${context.payload}!`);
    core.info(`context ${context.payload.issue}!`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
