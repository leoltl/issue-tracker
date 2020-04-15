import IssueService from "../services/issues.service";
import ProjectService from "../services/projects.service";
import UserService from "../services/Users/users.service";
import CommentService from "../services/comments.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class IssueController {
  protected issueService;
  protected projectService;
  protected userService;
  protected commentService

  constructor() {
    this.issueService = new IssueService()
    this.projectService = new ProjectService()
    this.userService = new UserService()
    this.commentService = new CommentService()
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params
      const { id: dbID } = await this.projectService.findIdByUUID(projectId);
      const result = await this.issueService.findAllByProjectId(dbID);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await this.issueService.findOne({ 'issues_uuid': req.params.issueId }, true);
      result = await this.populateIssueDetails(result)
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const issue = req.body.data;
    const projects_uuid = req.params.projectId;
    try {
      const [ 
        { id: projectId },
        { id: authorId  },
        { id: updatedBy } ] = await Promise.all([
          this.projectService.findIdByUUID(projects_uuid),
          this.userService.findIdByUUID(issue.authorId),
          this.userService.findIdByUUID(user.usersUuid)
        ])
      let [ result ] = await this.issueService.create({ ...issue, projectId, authorId, updatedBy });
      result = await this.populateIssueDetails(result)
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const issuesUuid = req.params.issueId
    const { projectId:  projects_uuid, 
            assignedId: assigned_uuid, 
            authorId:   author_uuid, 
            ...rest } = req.body.data;
    try {
      const [ 
        { id: projectId  },
        { id: authorId   },
        { id: assignedId }, 
        { id: updatedBy  }, 
        [ issue ] ] = await Promise.all([
          this.projectService.findIdByUUID(projects_uuid),
          this.userService.findIdByUUID(author_uuid),
          assigned_uuid ? this.userService.findIdByUUID(assigned_uuid) : {id: null},
          this.userService.findIdByUUID(user.usersUuid),
          this.issueService.find({'issues_uuid': issuesUuid}, true )
        ]);
      const updatedIssue = {...issue, ...rest, projectId, authorId, assignedId, updatedBy}
      let [ result ] = await this.issueService.update(updatedIssue, issue.id);
      result = await this.populateIssueDetails(result)
      res.send(result)
    } catch (e) {
      next(e)
    }
  }

  public benchMarkgetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = Math.ceil(Math.random() * 1);
      const [{ id: dbID }] = await this.projectService.find({id: projectId});
      console.log('querying getAll projectId:', projectId)
      const result = await this.issueService.findAllByProjectId(dbID);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  public benchMarkget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issueId = Math.ceil(Math.random() * 31);
      let result = await this.issueService.findOne({ id: issueId }, true);
      console.log('querying get issueId:', issueId)
      result = await this.populateIssueDetails(result)
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  public benchMarkgetMyIssue = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      // var date = Date.now()
      // const { id: userId } = await this.userService.findIdByUUID(user.usersUuid);
      const userId = Math.ceil(Math.random() * 7);
      const [user] = await this.userService.find({ id: userId })
      console.log('querying getMyIssue user:', userId, user.name)
      const [assigned, authored] = await Promise.all([
        this.issueService.find({ assignedId: userId }, true), 
        this.issueService.find({ authorId: userId }, true)]);
      let results = [...assigned, ...authored];
      // console.log('complete', Date.now() - date);
      results = await Promise.all(results.map(issue => this.populateIssueDetails(issue)));
      res.send(results);
    } catch (e) {
      next(e)
    }
  }
  

  public getMyIssue = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      // var date = Date.now()
      const { id: userId } = await this.userService.findIdByUUID(user.usersUuid);
      const [assigned, authored] = await Promise.all([
        this.issueService.find({ assignedId: userId }, true), 
        this.issueService.find({ authorId: userId }, true)]);
      let results = [...assigned, ...authored];
      // console.log('complete', Date.now() - date);
      results = await Promise.all(results.map(issue => this.populateIssueDetails(issue)));
      res.send(results);
    } catch (e) {
      next(e)
    }
  }
  

  public getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issueUuid = req.params.issueId
      let results = await this.issueService.findHistory({ 'record_uuid': issueUuid });
      results = await Promise.all(results.map(({ newVal }) => this.populateIssueDetails(newVal)));
      res.send(results);
    } catch (e) {
      if (e.message == 'Record not found') { 
        res.send([])
        return
      }
      next(e)
    }    
  }

  public getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: issueId } = await this.issueService.findIdByUUID(req.params.issueId);
      let results = await this.commentService.find({ issueId });
      results = await Promise.all(results.map(comment => this.populateCommentDetails(comment)));
      res.send(results);
    } catch(e) {
      if (e.message == 'Record not found') { 
        res.send([])
        return
      }
      next(e)
    }
  }

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const user = req.user;
      const [{ id: issueId },{ id: authorId }] = await Promise.all([
          this.issueService.findIdByUUID(req.params.issueId),
          this.userService.findIdByUUID(req.user.usersUuid),
        ]);
      const [result] = await this.commentService.create({ ...req.body.data, authorId, issueId })
      res.send(result)
    } catch (e) {
      next(e)
    }
  }

  private populateCommentDetails = async (comment) => {
    const _comment = {...comment};
    _comment.authorId = await this.userService.findOne({ id: comment.authorId });
    return _comment;
  }
  

  private populateIssueDetails = async (issue) => {
    const _issue = {...issue}
    // var date = Date.now() //benchmarking

    // to optimize....zzz
    const [projectId, authorId, assignedId, updatedBy] = await Promise.all([
      this.projectService.findOne({ id: issue.project_id || issue.projectId }),
      this.userService.findOne({ id: issue.author_id || issue.authorId }),
      _issue.assigned_id || issue.assignedId ? this.userService.findOne({ id: issue.assigned_id || issue.assignedId }) : null,
      _issue.updated_by || issue.updatedBy ? this.userService.findOne({ id: issue.updated_by || issue.updatedBy }) : null,
    ])

    _issue.projectId = projectId
    _issue.authorId = authorId
    _issue.assignedId = assignedId
    _issue.updatedBy = updatedBy

    delete _issue.id;
    delete _issue.project_id;
    delete _issue.author_id;
    delete _issue.assigned_id;
    delete _issue.updated_by;
    // console.log('complete', Date.now() - date);
    return _issue;
  }
}

const controller = new IssueController()
export default controller;