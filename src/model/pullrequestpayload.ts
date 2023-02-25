import { CommitMessage } from "./commitmessage";

export interface PullRequestPayload {
    action: string,
    created_by: string,
    date: Date,
    repo: string,
    repo_url: string,
    commit_header: string,
    commit_url: string,
    commit_messages: Array<CommitMessage>
    tag: Array<string>,
    pr_number: number
};