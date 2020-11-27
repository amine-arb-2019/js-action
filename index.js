const core = require('@actions/core');
const github = require("@actions/github");
const axios = require('axios').default;



// most @actions toolkit packages have async methods
async function run() {
  try {
    const  context  = github.context;
    const  GITHUB_TOKEN  = core.getInput("github-token");
    const stringList = core.getInput('string-list');
    let prHasComment = false;


    const { repo_name, repo_owner, slack_webook, slack_channel, slack_message_template } = process.env;
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

   const message = slack_message_template.replace('{commentUrl}', context.payload.comment.url)
                                         .replace('{userId}',  context.payload.comment.user.login)
                                         .replace('{userProfile}', 'https://github.com/'+ context.payload.comment.user.login);

    let payload = {channel: slack_channel, username: 'webhookbot', text: message}
    axios.post(slack_webook, payload).then(
      function (response) {
        core.info(response);
    })
    .catch(function (error) {
      core.error(error);
      core.setFailed(error);
    });




  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
