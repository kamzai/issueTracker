import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5050'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }

    return req;
})

export const fetchProjects = () => API.get('/home/project')
export const createProject = (newProject) => API.post('/home/project', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/home/project/${id}`, updatedProject)
export const deleteProject = (id) => API.delete(`/home/project/${id}`)


export const createIssue = (newIssue) => API.post('/home/issue', newIssue);
export const fetchIssues = () => API.get('/home/issue')
export const updateIssue = (id, updatedIssue) => API.patch(`/home/issue/${id}`, updatedIssue);

export const fetchUsers = () => API.get('/user');
export const updateProfile = (newProfileData) => API.patch(`/user`, newProfileData)
export const signUp = (userDetails) => API.post('/user/signup', userDetails)
export const signIn = (userDetails) => API.post('/user/signin', userDetails)