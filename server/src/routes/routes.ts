import express from "express";
import ProjectController from "../controllers/projects.controller";

const router = express.Router();
router.get('/projects', ProjectController.getAll);
router.post('/projects', ProjectController.create);
router.put('/projects/:id', ProjectController.update);

export default router;