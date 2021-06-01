import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName:    {type: String, require: true},
    creatorName:    {type: String, require: true},
    creatorFName:   {type: String, require: true},
    creatorLName:   {type: String, require: true},
    creatorEmail:   {type: String, require: true},
    startDate:      {type: Date, require: true, default: new Date().toISOString().split(1, 10)},
    targetEndDate:  {type: Date, require: true},
    actualEndDate:  {type: Date},
    status:         {type: String, require: true},
    description:    {type: String, require: true},
    teamSize:       {type: String, require: true},
    teamMembers:    {type: [{userName: {type: String}}], require: true, default:[]},
    selectedFile:   String,
});

const ProjectDetail = mongoose.model('ProjectDetail', projectSchema);
export default ProjectDetail
