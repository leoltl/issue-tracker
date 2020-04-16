enum status {
  open,
  closed
}

enum priority {
  low,
  medium,
  high,
  severe,
}

export interface IIssueData {
  id?: number
  uuid?: string
  title: string,
  description?: string,
  project: number,
  author: number,
  assigned?: number,
  status: status,
  priority?: priority,
  updatedBy: number,
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface IIssue extends IIssueData {
  project: IProject
  author: IUser
  assigned: IUser
  updatedBy: IUser
}