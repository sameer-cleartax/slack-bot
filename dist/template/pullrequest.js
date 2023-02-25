"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullRequestTemplate = void 0;
function pullRequestTemplate(payload) {
    let commit_message = "";
    let tag = "";
    payload.commit_messages.forEach((mess) => {
        commit_message += "- ";
        commit_message += ` <${mess.html_url}|${mess.sha}> ${mess.message}`;
        commit_message += "\n";
    });
    if (payload.tag.length > 0) {
        payload.tag.forEach((user) => {
            tag += `@${user} `;
        });
    }
    else {
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
                    text: `*#PR ${payload.pr_number}*: <${payload.commit_url}|${payload.commit_header}>`,
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
    return JSON.stringify(template);
}
exports.pullRequestTemplate = pullRequestTemplate;
