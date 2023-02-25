import * as github from "@actions/github";
import { httpGet } from '../client/http.client';
import { Commit } from '../model/commit';
import { CommitMessage } from '../model/commitmessage';

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
    let action:string | undefined = github.context.payload.action;
    // let created_by:string = github.context.payload.pull_request && github.context.payload.pull_request.head_commit.author.name;
    let pr_number:number | undefined = github.context.payload.pull_request?.number;
    let repo:string | undefined = github.context.payload.repository?.full_name;
    let repo_html:string | undefined = github.context.payload.repository?.html_url;
    let commit_url = github.context.payload.pull_request && github.context.payload.pull_request._links.commits.href;
    let commits:Array<CommitMessage> = await getCommits(commit_url);
    
    console.log("action", action);
    console.log("created_by", github.context.payload.pull_request);
    // console.log("created_by", created_by);
    console.log("commit_url", commit_url);
    console.log("pr_number", pr_number);
    console.log("repo", repo);
    console.log("repo_hmlt", repo_html);
    console.log("commits", commits);


    

    // let url:string = 'https://api.github.com/repos/sameer-cleartax/slack-bot/pulls/10/commits';
    // let result:Array<CommitMessage> = await getCommits(url);
    // let payload:PullRequestPayload = {
    //     action: '',
    //     created_by: '',
    //     date: new Date(),
    //     repo: '',
    //     repo_url: '',
    //     commit_header: '',
    //     commit_url: '',
    //     commit_messages: [],
    //     tag: [],
    //     pr_number: 0
    // };

    // payload.action = "created";
    // payload.created_by = "Sameer Choudhary";
    // payload.repo = "Cleartax/xpedize-matsya-backend";
    // payload.repo_url = "https://github.com/ClearTax/xpedize-matsya-backend";
    // payload.pr_number = 223;
    // payload.commit_header = "Fixed Dashboard widget data not update issue";
    // payload.commit_url = "https://github.com/ClearTax/xpedize-matsya-backend/pull/223";
    // payload.commit_messages = result;
    // let message:string =  pullRequestTemplate(payload);
    // console.log(message);
}

