import mongoose from 'mongoose'
import IssueDetail from '../models/issue.js'

export const createIssue = async(req, res) => {
    try {
        const issueData = req.body;
        
        const newIssue = new IssueDetail({...issueData});

        await newIssue.save();
        res.status(201).json(newIssue)

    } catch (error) {
        res.status(404).json(error)
    }
}

export const getIssueList = async (req, res) => {
    try {
           const issueList = await IssueDetail.find().sort({_id: -1});
           res.status(200).json(issueList);
    } catch (error) {
           console.log(error);
           res.status(404).json(error);
    }
};

export const updateIssue = async (req, res) => {
    try {
           const { id } = req.params;
           const updatedIssue = req.body;

           if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json("No Project with that id");

           const issue = await IssueDetail.findByIdAndUpdate(id, {...updatedIssue, _id: id}, {new: true});

           res.status(201).json(issue)
           
    } catch (error) {
           console.log(error);
           res.status(404).json(error);
    }
};