import * as core from '@actions/core';
import * as github from '@actions/github';
import { EVENT } from './enum/event';
import { prService } from './service/pr.service';


prService();


// console.log('action', github.context.action);
// console.log('actor', github.context.actor);
// console.log('apiUrl', github.context.apiUrl);
// console.log('graphUrl', github.context.graphqlUrl);
// console.log('issue', github.context.issue);
// console.log('job', github.context.job);
// console.log('payload', github.context.payload.pull_request && github.context.payload.pull_request._links.comments);
// console.log('payload', github.context.payload.pull_request && github.context.payload.pull_request._links.commits);
// console.log('ref', github.context.ref);
// console.log('repo', github.context.repo.owner);
// console.log('runId', github.context.runId);
// console.log('runNumber', github.context.runNumber);
// console.log('serverUrl', github.context.serverUrl);
// console.log('sha', github.context.sha);
// console.log('workflow', github.context.workflow);
// console.log('commits', github.context.payload.commits);

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
