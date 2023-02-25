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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prService = void 0;
const github = __importStar(require("@actions/github"));
const http_client_1 = require("../client/http.client");
const pullrequest_1 = require("../template/pullrequest");
function getCommits(commitUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = yield (0, http_client_1.httpGet)(commitUrl);
        let result = [];
        message.forEach((mes) => {
            let commit = {
                sha: "",
                autor: "",
                handler: "",
                message: "",
                html_url: "",
                timestamp: new Date(),
            };
            commit.sha = mes.sha.slice(0, 10);
            commit.autor = mes.commit.committer.name;
            commit.handler = mes.committer.login;
            commit.message = mes.commit.message;
            commit.html_url = mes.html_url;
            commit.timestamp = new Date(mes.commit.committer.date);
            result.push(commit);
        });
        return result;
    });
}
function prService(webhook, tag) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let commit_url = github.context.payload.pull_request &&
            github.context.payload.pull_request._links.commits.href;
        let commits = yield getCommits(commit_url);
        let pullRequestPayload = {
            action: github.context.payload.action,
            created_by: github.context.actor,
            date: new Date(),
            repo: (_a = github.context.payload.repository) === null || _a === void 0 ? void 0 : _a.full_name,
            repo_url: (_b = github.context.payload.repository) === null || _b === void 0 ? void 0 : _b.html_url,
            pr_url: (_c = github.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.html_url,
            commit_messages: commits,
            pr_number: (_d = github.context.payload.pull_request) === null || _d === void 0 ? void 0 : _d.number,
            tag: tag,
        };
        let message = (0, pullrequest_1.pullRequestTemplate)(pullRequestPayload);
        yield (0, http_client_1.httpPost)(webhook, message).then(res => {
            console.log("successfully posted the message to slack");
        }).catch(err => {
            console.error("error posting message to slack", err);
        });
    });
}
exports.prService = prService;
