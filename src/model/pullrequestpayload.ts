import { CommitMessage } from "./commitmessage";

export interface PullRequestPayload {
    action: string | undefined,
    created_by: string | undefined,
    date: Date,
    repo: string | undefined,
    repo_url: string | undefined,
    pr_url: string | undefined,
    commit_messages: Array<CommitMessage>
    tag: string[],
    pr_number: number | undefined
};