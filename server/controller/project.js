import mongoose from 'mongoose'
import ProjectDetail from "../models/project.js";
import IssueDetail from '../models/issue.js';

export const createProject = async (req, res) => {
       try {
              const project = req.body;
              const newProject = new ProjectDetail({...project, });

              await newProject.save();
              res.status(201).json(newProject);

       } catch (error) {
              console.log(error);
              res.status(404).json(error);
       }
};

export const getProjectList = async (req, res) => {
       try {
              const projectList = await ProjectDetail.find().sort({_id: -1});
              res.status(200).json(projectList);
       } catch (error) {
              console.log(error);
              res.status(404).json(error);
       }
};

export const updateProjectDetails = async (req, res) => {
       try {
              const { id } = req.params;
              const updatedProject = req.body;

              if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json("No Project with that id");

              const project = await ProjectDetail.findByIdAndUpdate(id, {...updatedProject, _id: id}, {new: true});

              res.status(201).json(project)
              
       } catch (error) {
              console.log(error);
              res.status(404).json(error);
       }
};

export const deleteProject = async (req, res) => {
       try {
              const {id} = req.params;

              if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json("No Project with that id");

              await ProjectDetail.findByIdAndDelete(id);
              await IssueDetail.deleteMany({projectId: id});

              res.status(201).json("Post Deleted")

       } catch (error) {
              console.log(error);
              res.status(404).json(error);
       }
}