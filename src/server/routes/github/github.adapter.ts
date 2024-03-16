import { Octokit } from "octokit";
import config from "../../secrets.json";
import type { Repo, SimpleRepo } from "../../../repo.d.ts";

const apiVersion = "2022-11-28";
const userAgent = "full-stack-sample-server";
const apiKey: string = config.GITHUB;
const headers = {
  "X-GitHub-Api-Version": apiVersion,
};

const octokit = new Octokit({
  userAgent,
  auth: apiKey,
});

export function getOrgRepositories(org: string) {
  return octokit.request(`GET /orgs/${org}/repos`, {
    org,
    headers,
  });
}

export function getUserRepositories(user: string) {
  return octokit.request(`GET /users/${user}/repos`, {
    username: user,
    headers,
  });
}

export function simpleRepo({ html_url, id, name }: Repo): SimpleRepo {
  return {
    url: html_url,
    id,
    name,
  };
}

export function isSimpleRepo(repo: any): repo is SimpleRepo {
  return (
    Boolean(repo) &&
    typeof repo === "object" &&
    Object.keys(repo).length === 3 &&
    repo.hasOwnProperty("url") &&
    repo.hasOwnProperty("id") &&
    repo.hasOwnProperty("name")
  );
}
