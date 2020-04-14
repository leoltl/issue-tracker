import express from "express";
import ProjectController from "../controllers/projects.controller";
import IssueController from "../controllers/issues.controller";
import UserController from "../controllers/users.controller";

import authorize from '../middlewares/authorization/authorize';
import authenticate from '../middlewares/authentication/jwt';
import roles from '../middlewares/authorization/roles';

const router = express.Router();
router.get('/projects', ProjectController.getAll);
router.post('/projects', authenticate, authorize([roles.admin, roles.productManager]),ProjectController.create);
router.get('/projects/:projectId', ProjectController.get);
router.put('/projects/:projectId', authenticate, authorize([roles.admin, roles.productManager]), ProjectController.update);
router.get('/projects/:projectId/members', ProjectController.getProjectMembers);
router.post('/projects/:projectId/members', authenticate, authorize([roles.admin, roles.productManager]), ProjectController.createProjectMembers);
router.delete('/projects/:projectId/members', authenticate, authorize([roles.admin, roles.productManager]), ProjectController.destroyProjectMembers);

router.get('/projects/:projectId/issues', IssueController.getAll);
router.post('/projects/:projectId/issues', IssueController.create);
router.get('/issues/me', IssueController.getMyIssue);
router.get('/issues/:issueId', IssueController.get);
router.put('/issues/:issueId', authenticate, IssueController.update);
router.get('/issues/:issueId/history', IssueController.getHistory);
router.get('/issues/:issueId/comments', IssueController.getComments);
router.post('/issues/:issueId/comments', authenticate, IssueController.createComment);

router.get('/u/all', UserController.getAll);
router.get('/u/:username', UserController.get);
router.put('/u/:usersUuid', authenticate, authorize(roles.admin), UserController.update);

router.post('/signup', UserController.create);
router.post('/signin', UserController.signIn);
router.post('/signout', UserController.signOut);
router.get('/me', authenticate, UserController.getMe);
router.get('/refresh-token', authenticate, UserController.refreshToken)

export default router;