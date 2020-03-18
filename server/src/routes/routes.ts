import express from "express";
import ProjectController from "../controllers/projects.controller";
import IssueController from "../controllers/issues.controller";
import UserController from "../controllers/users.controller";

import authorize from '../lib/authorization/authorize';
import roles from '../lib/authorization/roles';

const router = express.Router();
router.get('/projects', ProjectController.getAll);
router.post('/projects', ProjectController.create);
router.put('/projects/:projectId', ProjectController.update);
router.get('/projects/:projectId', ProjectController.get);

router.get('/projects/:projectId/issues', IssueController.getAll);
router.post('/projects/:projectId/issues', IssueController.create);
router.get('/projects/:projectId/issues/:issueId', IssueController.get);
router.put('/projects/:projectId/issues/:issueId', IssueController.update);

router.get('/u/:userId', UserController.get);
router.put('/u/:userId', authorize(roles.productManager), UserController.get);

export default router;