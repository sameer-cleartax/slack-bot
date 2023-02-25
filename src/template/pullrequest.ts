import { PullRequestPayload } from "../model/pullrequestpayload";

export function pullRequestTemplate(payload: PullRequestPayload): string {
  let commit_message: string = "";
  let tag: string = "";

  payload.commit_messages.forEach((mess) => {
    commit_message += "- ";
    commit_message += ` <${mess.html_url}|${mess.sha}> ${mess.message}`;
    commit_message += "\n";
  });

  if (payload.tag.length > 0) {
    payload.tag.forEach((user) => {
      tag += `@${user} `;
    });
  } else {
    tag = "@channel";
  }

  let template = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${tag} *${payload.created_by} has ${payload.action} pull request on <${payload.repo_url}|${payload.repo}> :point_down:*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `pull_request: <${payload.pr_url}| #${payload.pr_number}>`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `${commit_message}`,
          },
        ],
      }
    ],
  };
  return JSON.stringify(template).replace("/\\n/g", "\n");
}
