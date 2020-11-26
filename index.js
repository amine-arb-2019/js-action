const core = require('@actions/core');
const github = require("@actions/github");


// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github.context;
    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');
    let prHasComment = false;

    if (context.eventName === "issue_comment" && context.payload.issue.pull_request) { // a comment on pull request
      const body = context.payload.comment.body;
      core.info(`body: ${body} `);
      if (body && body.trim() === "") {
        if (body.startWith(item) || !body.includes(item)) {
          prHasComment = true;
        }
      }
    }
    core.info(`prHasComment: ${prHasComment} `);
    core.info(`comment Url: ${context.payload.comment.url} `);
    core.info(`Author user Id: ${context.payload.comment.user.id}`);
    core.info(`Author user Login: ${context.payload.comment.user.login}`);

    core.info(`Pull Request Id  : ${context.payload.issue.number}`);
    core.info(`Pull Request author Id  : ${context.payload.issue.user.id}`);
    core.info(`Pull Request author Login  : ${context.payload.issue.user.login}`);

    const octokit = github.getOctokit(GITHUB_TOKEN);
    
    const username = context.payload.comment.user.login;

    const { data: user } = await octokit.users.getByUsername({
      username,
    });

    core.info(`Author user email: ${user.email}`);


    // get pull request 
    

//    core.info(`Author firstName: ${prHasComment}  lastName ${prHasComment}`);
//    core.info(`Author email: ${prHasComment}`);








  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
