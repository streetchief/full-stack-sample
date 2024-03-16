import { RequestHandler } from "express";
import { getOrgRepositories, getUserRepositories } from "./github.adapter.ts";

export const getOrgRepos: RequestHandler = async (req, res, next) => {
  const org = req.query.name;

  if (!org) {
    next(new Error("Missing Org"));
    return;
  }

  if (typeof org !== "string") {
    next(new Error("Bad request: Only One Value Allowed"));
    return;
  }

  try {
    const ghResponse = await getOrgRepositories(org);
    const orgRepos = ghResponse.data;
    res.send(orgRepos);
  } catch (err) {
    next(err);
  }
};

export const getUserRepos: RequestHandler = async (req, res, next) => {
  const user = req.query.name;

  if (!user) {
    next(new Error("Missing User"));
    return;
  }

  if (typeof user !== "string") {
    next(new Error("Bad request: Only One Value Allowed"));
    return;
  }

  try {
    const ghResponse = await getUserRepositories(user);
    const orgRepos = ghResponse.data;
    res.send(orgRepos);
  } catch (err) {
    next(err);
  }
};
