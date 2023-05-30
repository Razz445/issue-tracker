const express = require('express');
const app = express();
const port = 3000; // Change this to the desired port number

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Mock data for projects and issues (replace this with your own database implementation)
const projects = [
  { id: 1, name: 'Project 1', description: 'Description for Project 1', author: 'Author 1' },
  { id: 2, name: 'Project 2', description: 'Description for Project 2', author: 'Author 2' },
];

const issues = [
  { id: 1, projectId: 1, title: 'Issue 1', description: 'Description for Issue 1', labels: ['Label 1', 'Label 2'], author: 'Author 1' },
  { id: 2, projectId: 1, title: 'Issue 2', description: 'Description for Issue 2', labels: ['Label 1', 'Label 3'], author: 'Author 2' },
];

// Home page route
app.get('/', (req, res) => {
  res.render('home', { projects });
});

// Create project page route
app.get('/create-project', (req, res) => {
  res.render('createProject');
});

// Handle project creation form submission
app.post('/create-project', (req, res) => {
  const { name, description, author } = req.body;
  const newProject = { id: projects.length + 1, name, description, author };
  projects.push(newProject);
  res.redirect('/');
});

// Project detail page route
app.get('/project/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  const projectIssues = issues.filter(issue => issue.projectId === projectId);
  res.render('projectDetail', { project, issues: projectIssues });
});

// Create issue page route
app.get('/create-issue', (req, res) => {
  res.render('createIssue', { projects });
});

// Handle issue creation form submission
app.post('/create-issue', (req, res) => {
  const { projectId, title, description, labels, author } = req.body;
  const newIssue = { id: issues.length + 1, projectId: parseInt(projectId), title, description, labels: labels.split(','), author };
  issues.push(newIssue);
  res.redirect(`/project/${projectId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
