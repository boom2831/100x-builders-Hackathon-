export function renderHtml(resumeJson) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${resumeJson.name} - Resume</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 40px 20px;
      background-color: #f4f7fa;
      color: #333;
      max-width: 800px;
      margin: auto;
    }

    header {
      background: linear-gradient(135deg, #0077b6, #00b4d8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    header h1 {
      margin: 0;
      font-size: 32px;
    }

    header p {
      font-size: 16px;
      margin: 5px 0 0;
    }

    .section {
      margin-top: 30px;
    }

    h2 {
      color: #0077b6;
      border-bottom: 2px solid #00b4d8;
      padding-bottom: 4px;
      font-size: 20px;
    }

    .contact-info {
      font-size: 14px;
      margin-top: 10px;
    }

    .contact-info a {
      color: #00b4d8;
      text-decoration: none;
    }

    .job, .education-entry, .cert-entry {
      margin-top: 15px;
    }

    .job-title, .degree {
      font-weight: bold;
      font-size: 16px;
    }

    .company, .institution {
      font-style: italic;
    }

    .date, .location {
      font-size: 14px;
      color: #666;
    }

    ul {
      margin-top: 5px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 10px;
    }

    .skill-list {
      flex: 1 1 45%;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      margin-top: 30px;
      color: #888;
    }
  </style>
</head>
<body>

  <header>
    <h1>${resumeJson.name || 'Your Name'}</h1>
    <p>${resumeJson.title || 'Your Professional Title'}</p>
    <div class="contact-info">
      ${resumeJson.contact.phone ? `${resumeJson.contact.phone}<br/>` : ''}
      ${resumeJson.contact.email ? `<a href="mailto:${resumeJson.contact.email}">${resumeJson.contact.email}</a><br/>` : ''}
      ${resumeJson.contact.linkedin ? `<a href="https://${resumeJson.contact.linkedin}" target="_blank">${resumeJson.contact.linkedin}</a><br/>` : ''}
      ${resumeJson.contact.location ? `<span>${resumeJson.contact.location}</span>` : ''}
    </div>
  </header>

  ${resumeJson.summary ? `
  <section class="section">
    <h2>Professional Summary</h2>
    <p>${resumeJson.summary}</p>
  </section>` : ''}

  ${resumeJson.experience.length > 0 ? `
  <section class="section">
    <h2>Experience</h2>
    ${resumeJson.experience.map(job => `
      <div class="job">
        <div class="job-title">${job.jobTitle}</div>
        <div class="company">${job.company}${job.location ? `, ${job.location}` : ''}</div>
        <div class="date">${job.startDate || 'Start'} - ${job.endDate || 'Present'}</div>
        ${job.achievements.length > 0 ? `
          <ul>
            ${job.achievements.map(item => `<li>${item}</li>`).join('')}
          </ul>` : ''}
      </div>
    `).join('')}
  </section>` : ''}

  ${resumeJson.education.length > 0 ? `
  <section class="section">
    <h2>Education</h2>
    ${resumeJson.education.map(edu => `
      <div class="education-entry">
        <div class="degree">${edu.degree}</div>
        <div class="institution">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</div>
        <div class="date">${edu.graduationDate || 'Graduation Year'}</div>
      </div>
    `).join('')}
  </section>` : ''}

  ${(resumeJson.skills.marketingSkills.length > 0 || resumeJson.skills.leadershipSkills.length > 0) ? `
  <section class="section">
    <h2>Skills</h2>
    <div class="skills-grid">
      ${resumeJson.skills.marketingSkills.length > 0 ? `
      <div class="skill-list">
        <strong>Marketing Skills:</strong>
        <ul>${resumeJson.skills.marketingSkills.map(s => `<li>${s.name}</li>`).join('')}</ul>
      </div>` : ''}
      ${resumeJson.skills.leadershipSkills.length > 0 ? `
      <div class="skill-list">
        <strong>Leadership Skills:</strong>
        <ul>${resumeJson.skills.leadershipSkills.map(s => `<li>${s.name}</li>`).join('')}</ul>
      </div>` : ''}
    </div>
  </section>` : ''}

  ${resumeJson.certifications.length > 0 ? `
  <section class="section">
    <h2>Certifications</h2>
    <ul>
      ${resumeJson.certifications.map(cert => `<li>${cert.name}</li>`).join('')}
    </ul>
  </section>` : ''}

  ${resumeJson.languages.length > 0 ? `
  <section class="section">
    <h2>Languages</h2>
    <ul>
      ${resumeJson.languages.map(lang => `<li>${lang.name} - ${lang.proficiency}</li>`).join('')}
    </ul>
  </section>` : ''}

  <div class="footer">
    <p>Generated with Resume Builder AI</p>
  </div>

</body>
</html>
  `;
}
