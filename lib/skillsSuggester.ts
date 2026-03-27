const SKILLS_DATABASE: Record<string, string[]> = {
  'Software Engineer': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'Docker', 'SQL', 'REST APIs', 'Unit Testing', 'CI/CD'],
  'Frontend Developer': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Tailwind CSS', 'SASS', 'Responsive Design', 'Webpack', 'Babel'],
  'Backend Developer': ['Node.js', 'Python', 'Java', 'Go', 'Express', 'Django', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservices'],
  'Full Stack Developer': ['React', 'Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS', 'GraphQL', 'Redux', 'Jest'],
  'Data Scientist': ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Tableau', 'Scikit-learn', 'Statistics', 'Data Visualization'],
  'Data Analyst': ['SQL', 'Excel', 'Python', 'Tableau', 'Power BI', 'Statistics', 'Data Cleaning', 'Reporting', 'Google Analytics'],
  'Designer': ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX', 'Prototyping', 'Wireframing', 'User Research', 'Typography', 'Color Theory'],
  'Product Manager': ['Agile', 'Scrum', 'JIRA', 'Product Roadmap', 'User Stories', 'Stakeholder Management', 'Market Research', 'A/B Testing'],
  'Project Manager': ['Agile', 'Scrum', 'Risk Management', 'Budgeting', 'Resource Planning', 'MS Project', 'Communication', 'Leadership'],
  'Marketing Manager': ['SEO', 'Google Ads', 'Content Strategy', 'Social Media Marketing', 'Email Marketing', 'CRM', 'Copywriting', 'Analytics'],
  'Sales Representative': ['CRM', 'Negotiation', 'Lead Generation', 'Public Speaking', 'Customer Relationship Management', 'Cold Calling', 'Closing'],
  'Human Resources': ['Recruitment', 'Employee Relations', 'Onboarding', 'Payroll', 'Conflict Resolution', 'HRIS', 'Labor Laws', 'Performance Management'],
  'Content Writer': ['Copywriting', 'SEO', 'Editing', 'Creative Writing', 'Blogging', 'Research', 'Proofreading', 'Storytelling'],
  'Cybersecurity Analyst': ['Network Security', 'Penetration Testing', 'Firewalls', 'SIEM', 'Incident Response', 'Cryptography', 'Vulnerability Assessment'],
  'Cloud Architect': ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Serverless', 'Cloud Security', 'Networking'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform', 'CI/CD', 'Linux', 'Monitoring', 'Scripting'],
  'Customer Support': ['Communication', 'Problem Solving', 'Zendesk', 'CRM', 'Empathy', 'Conflict Resolution', 'Ticketing Systems'],
  'Financial Analyst': ['Excel', 'Financial Modeling', 'SQL', 'Data Analysis', 'Reporting', 'Accounting', 'Forecasting'],
  'Operations Manager': ['Process Improvement', 'Project Management', 'Leadership', 'Budgeting', 'Supply Chain', 'Strategic Planning'],
  'UX Researcher': ['User Research', 'Usability Testing', 'Wireframing', 'Prototyping', 'Data Analysis', 'Interviewing', 'Personas'],
  'QA Engineer': ['Manual Testing', 'Automation Testing', 'Selenium', 'Jest', 'Cypress', 'Bug Tracking', 'Test Planning'],
  'Mobile Developer': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Mobile UI', 'API Integration'],
  'Business Analyst': ['Requirements Gathering', 'SQL', 'Data Visualization', 'Process Mapping', 'Agile', 'Stakeholder Management'],
  'SEO Specialist': ['Google Analytics', 'Keyword Research', 'On-page SEO', 'Link Building', 'Content Strategy', 'Technical SEO'],
  'Social Media Manager': ['Content Creation', 'Social Media Analytics', 'Community Management', 'Copywriting', 'Ad Campaigns'],
  'Recruiter': ['Sourcing', 'Interviewing', 'ATS', 'Networking', 'Negotiation', 'Employer Branding', 'Talent Acquisition'],
};

export const suggestSkills = (jobTitle: string): string[] => {
  if (!jobTitle) return [];

  const normalizedTitle = jobTitle.toLowerCase();
  
  // Try exact match first
  for (const [title, skills] of Object.entries(SKILLS_DATABASE)) {
    if (title.toLowerCase() === normalizedTitle) {
      return skills;
    }
  }

  // Try partial match
  for (const [title, skills] of Object.entries(SKILLS_DATABASE)) {
    if (normalizedTitle.includes(title.toLowerCase()) || title.toLowerCase().includes(normalizedTitle)) {
      return skills;
    }
  }

  return [];
};

export const getAllJobTitles = (): string[] => {
  return Object.keys(SKILLS_DATABASE);
};
