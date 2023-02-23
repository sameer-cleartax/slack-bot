import * as core from '@actions/core';
import * as github from '@actions/github';
import { EVENT } from './enum/event';

console.log('payload', github.context.action);
console.log('actor', github.context.actor);
console.log('apiUrl', github.context.apiUrl);
console.log('graphUrl', github.context.graphqlUrl);
console.log('issue', github.context.issue);
console.log('job', github.context.job);
console.log('payload', github.context.payload);
console.log('ref', github.context.ref);
console.log('repo', github.context.repo);
console.log('runId', github.context.runId);
console.log('runNumber', github.context.runNumber);
console.log('serverUrl', github.context.serverUrl);
console.log('sha', github.context.sha);
console.log('workflow', github.context.workflow);

// switch (github.context.eventName) {
//     case EVENT.PULL_REQUEST:
//         break;
//     case EVENT.PULL_REQUEST_REVIEW:
//         break;
//     case EVENT.PULL_REQUEST_REVIEW_COMMENT:
//         break;
//     default:
//         break;
// }
