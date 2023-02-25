import * as core from "@actions/core";
import { prService } from "./service/pr.service";

async function run() {
  try {
    const webhook: string = core.getInput("webhook").trim();
    const tag: string[] = core.getInput("tag").split(",");
    prService(webhook, tag);
  } catch (error) {
    console.error(error);
  }
}

run();
