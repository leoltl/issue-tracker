import CommentModel from "../models/comments.model";
import { HTTP400Error } from '../lib/httpErrors'

interface comment {
  id?: Number,
  body: String,
  authorId: Number,
  issueId: Number,
  commentsUuid: String,
  createdAt: String,
}

class Issue extends CommentModel {
  constructor() {
    super();
  }

  private isValid(comment: comment) {
    return true
  }

  public async create(comment: comment) {
    this.isValid(comment);
    return super.create(comment);
  }
  
  public async update(comment: comment) {
    this.isValid(comment);
    return super.update(comment);
  }

  public async find(obj, displayProtectedFields?) {
    return super.find(obj, displayProtectedFields)
  }

  public async findOne(obj, displayProtectedFields?) {
    return super.findOne(obj, displayProtectedFields)
  }

  public async findAll() {
    return super.findAll();
  }

  public async findHistory(obj) {
    return super.findHistory(obj)
  }

  public async findIdByUUID(uuid) {
    return super.findIdByUUID(uuid);
  }
}

export default Issue;