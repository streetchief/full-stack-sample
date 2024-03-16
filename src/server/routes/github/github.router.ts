import express from "express";
import { getOrgRepos, getUserRepos } from "./github.middleware.ts";

// Prefixed with /gh
export const router = express.Router();

router.get("/org/repos", getOrgRepos);
router.get("/user/repos", getUserRepos);



