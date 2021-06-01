import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ProjectIcon from '@material-ui/icons/Assessment';
import ReportIcon from "@material-ui/icons/LibraryBooks";
import IssuesIcon from '@material-ui/icons/BugReport';


import Dashboard from "./components/Dashboard/Dashboard"
import Profile from "./components/Profile/Profile"
import Project from "./components/Project/ProjectPage"
import Issue from "./components/Issue/Issue"
import Personal from "./components/Personal/Personal"


const routes = [
    {
        name: 'Dashboard',
        path: '/home/dashboard',
        type: 'dashboard',
        Itemicon: DashboardIcon,
        component: Dashboard ,
    },
    {
        name: 'Profile',
        path: '/home/profile',
        type: 'profile',
        Itemicon: PersonIcon,
        component: Profile,    
    },
    {
        name: 'Project',
        path: '/home/project',
        type: 'project',
        Itemicon: ProjectIcon,
        component: Project,    
    },
    {
        name: 'Issues',
        path: '/home/issue',
        type: 'issue',
        Itemicon: IssuesIcon,
        component: Issue,    
    },
    {
        name: 'My Zone',
        path: '/home/personal',
        type: 'personal',
        Itemicon: ReportIcon,
        component: Personal,    
    },
]


export default routes