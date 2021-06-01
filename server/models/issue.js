import mongoose from "mongoose"

const IssueSchema = mongoose.Schema({
    projectId: {type: String},
    projectName: {type: String},
    reporterName: {type: String},
    category: {type: String},
    submitDate: {type: String},
    summary: {type: String},
    details: {type: String},
    attachments: {type: [String]},
    status: {type: String},
    priority: {type: String},
    assignTo: {type: String},
})


const IssueDetails = mongoose.model('IssueDetails', IssueSchema)

export default IssueDetails