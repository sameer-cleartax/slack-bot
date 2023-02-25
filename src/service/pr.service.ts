import * as github from "@actions/github";
import { httpGet } from '../client/http.client';
import { Commit } from '../model/commit';
import { CommitMessage } from '../model/commitmessage';
import { PullRequestPayload } from "../model/pullrequestpayload";
import { pullRequestTemplate } from "../template/pullrequest";

async function getCommits(commitUrl: string):Promise<any> {
    let message:Array<Commit> = await httpGet(commitUrl);
    let result:Array<CommitMessage> = [];
    message.forEach(mes => {
        let commit:CommitMessage = {
            sha: '',
            autor: '',
            handler: '',
            message: '',
            html_url: '',
            timestamp: new Date()
        };
        commit.sha = (mes.sha).slice(0,10);
        commit.autor = mes.commit.committer.name;
        commit.handler = mes.committer.login;
        commit.message = mes.commit.message;
        commit.html_url = mes.html_url;
        commit.timestamp = new Date(mes.commit.committer.date);
        result.push(commit);
    });
    return result;
}

export async function prService():Promise<void>{
    let commit_url = github.context.payload.pull_request && github.context.payload.pull_request._links.commits.href;
    let commits:Array<CommitMessage> = await getCommits(commit_url);
    let pullRequestPayload:PullRequestPayload = {
        action: github.context.payload.action,
        created_by: github.context.actor,
        date: new Date(),
        repo: github.context.payload.repository?.full_name,
        repo_url: github.context.payload.repository?.html_url,
        pr_url: github.context.payload.pull_request?.html_url,
        commit_messages: commits,
        pr_number: github.context.payload.pull_request?.number,
        tag: []
    };
    let message = pullRequestTemplate(pullRequestPayload);
    console.log(message);
}

