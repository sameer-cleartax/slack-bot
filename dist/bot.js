"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
console.log('payload', JSON.parse(github.context.action).pull_request);
console.log('actor', github.context.actor);
console.log('apiUrl', github.context.apiUrl);
console.log('graphUrl', github.context.graphqlUrl);
console.log('issue', github.context.issue);
console.log('job', github.context.job);
console.log('payload', (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.body);
console.log('ref', github.context.ref);
console.log('repo', github.context.repo.owner);
console.log('runId', github.context.runId);
console.log('runNumber', github.context.runNumber);
console.log('serverUrl', github.context.serverUrl);
console.log('sha', github.context.sha);
console.log('workflow', github.context.workflow);
console.log('commits', github.context.payload.commits);
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
