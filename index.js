const core = require('@actions/core');
const github = require("@actions/github");


// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github.context;
    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');


    if (context.eventName === "issue_comment" && context.payload.issue.pull_request) { // a comment on pull request
      const body = context.payload.comment.body;
      core.info(`body: ${body} `);

      stringList.split(',').forEach(function (item) {
        core.info(`item: ${item} `);

    });
    }
    core.info(`prHasComment: ${prHasComment} `);
    core.info(`comment Url: ${context.payload.comment.url} `);
    core.info(`Author user Id: ${context.payload.comment.user.id}`);
    core.info(`Author user Login: ${context.payload.comment.user.id}`);

    core.info(`Pull Request Id : ${context.payload.issue.pull_request.number}`);
    core.info(`Pull Request Author Login : ${context.payload.issue.pull_request.user.login}`);
    




    // get pull request 
    

//    core.info(`Author firstName: ${prHasComment}  lastName ${prHasComment}`);
//    core.info(`Author email: ${prHasComment}`);








  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
