import request from '@/api/request';
import auth from '@/api/auth'
import issue from '@/api/issue'
import project from '@/api/project'

const repo = {
  auth: auth(request),
  issue: issue(request),
  project: project(request),
}

export default repo;