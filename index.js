const core = require('@actions/core');
const github = require("@actions/github");


// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github.context;
    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');
    let prHasComment = false;


    const { repo_name, repo_owner } = process.env;
    if (!repo_name || !repo_owner) {
        core.setFailed('If "reaction" is supplied, GITHUB_TOKEN is required');
        return;
    }

    core.info(`repo_name: ${repo_name} `);
    core.info(`repo_owner: ${repo_owner} `);



    if (context.eventName === "issue_comment" && context.payload.issue.pull_request) { // a comment on pull request
      const body = context.payload.comment.body;
      core.info(`body: ${body} `);
      if (body && body.trim() === "") {
        stringList.split(',').forEach(function(item) {
          if (body.startWith(item) || !body.includes(item)) {
            prHasComment = true;
          }
        });
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
    const pullRequestId = context.payload.issue.number;

    core.info(`github.repository_owner  : ${github.repository_owner}`);
    core.info(`github.event.repository.name  : ${github.event.repository.name}`);

    const simple_repo_name = repo_name.split('/')[1];
    const { data: pullRequest } = await octokit.pulls.get({
      owner: repo_owner,
      repo: simple_repo_name,
      pull_number: pullRequestId
  });


    // get pull request 
    

//    core.info(`Author firstName: ${prHasComment}  lastName ${prHasComment}`);
//    core.info(`Author email: ${prHasComment}`);








  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
