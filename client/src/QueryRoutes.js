import ProjectDetails from "./components/Project/ProjectDetails/ProjectDetails"
import IssueDetails from "./components/Issue/IssueDetails/IssueDetails"
import Auth from './components/Auth/Auth'

const routes = [
    {
        path: '/home/project/:id',
        component: ProjectDetails
    },
    {
        path: '/home/issue/pro/:id',
        component: ProjectDetails
    },
    {
        path: '/home/issue/:id',
        component: IssueDetails
    },
    {
        path: '/auth',
        component: Auth
    },
]
export default routes