import express from "express";
import ProjectController from "../controllers/projects.controller";
import IssueController from "../controllers/issues.controller";
import UserController from "../controllers/users.controller";

import authorize from '../middlewares/authorization/authorize';
import roles from '../middlewares/authorization/roles';

const router = express.Router();
router.get('/projects', ProjectController.getAll);
router.post('/projects', authorize([roles.admin, roles.productManager]),ProjectController.create);
router.put('/projects/:projectId', authorize([roles.admin, roles.productManager]), ProjectController.update);
router.get('/projects/:projectId', ProjectController.get);

router.get('/projects/:projectId/issues', IssueController.getAll);
router.post('/projects/:projectId/issues', IssueController.create);
router.get('/projects/:projectId/issues/:issueId', IssueController.get);
router.put('/projects/:projectId/issues/:issueId', IssueController.update);

router.get('/u/all', UserController.getAll);
router.get('/u/:username', UserController.get);
router.post('/u', UserController.create);
router.put('/u/:username', authorize(roles.admin), UserController.update);

router.post('/signin', UserController.signIn);
router.post('/signout', UserController.signOut);

export default router;