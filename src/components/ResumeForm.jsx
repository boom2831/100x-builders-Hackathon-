import React, { useState } from 'react';
import ResumePreview from './ResumePreview';
import PdfGenerator from './PdfGenerator';
import { buildJson } from '../utils/resumeJsonBuilder';
import { renderHtml } from '../utils/htmlTemplate';

export default function ResumeForm() {
  const [form, setForm] = useState({
    name: '',
    title: '',
    contact: {
      phone: '',
      email: '',
      linkedin: '',
      github: '',
      location: ''
    },
    summary: '',
    experience: '',
    skills: '',
    education: '',
    certifications: '',
    projects: '',
    languages: ''
  });
  const [resumeHtml, setResumeHtml] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name in form.contact) {
      setForm(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const generatePreview = () => {
    const resumeJson = buildJson(form);
    const html = renderHtml(resumeJson);
    setResumeHtml(html);
    setShowPreview(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2>Resume Builder</h2>
        
        <h3>Personal Information</h3>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} /><br />
        <input type="text" name="title" placeholder="Professional Title" value={form.title} onChange={handleChange} /><br />
        
        <h3>Contact Information</h3>
        <input type="text" name="phone" placeholder="Phone" value={form.contact.phone} onChange={handleChange} /><br />
        <input type="email" name="email" placeholder="Email" value={form.contact.email} onChange={handleChange} /><br />
        <input type="text" name="linkedin" placeholder="LinkedIn URL" value={form.contact.linkedin} onChange={handleChange} /><br />
        <input type="text" name="github" placeholder="GitHub URL" value={form.contact.github} onChange={handleChange} /><br />
        <input type="text" name="location" placeholder="Location" value={form.contact.location} onChange={handleChange} /><br />
        
        <h3>Professional Summary</h3>
        <textarea name="summary" placeholder="Professional summary" value={form.summary} onChange={handleChange} rows={4}></textarea><br />
        
        <h3>Experience (one job per paragraph, separate details with new lines)</h3>
        <textarea name="experience" placeholder="Job Title\nCompany\nLocation\nAchievement 1\nAchievement 2" 
                  value={form.experience} onChange={handleChange} rows={8}></textarea><br />
        
        <h3>Skills (one per line)</h3>
        <textarea name="skills" placeholder="Skill 1\nSkill 2\nSkill 3" value={form.skills} onChange={handleChange} rows={4}></textarea><br />
        
        <h3>Education (one per paragraph)</h3>
        <textarea name="education" placeholder="Degree\nInstitution\nGraduation Year" 
                  value={form.education} onChange={handleChange} rows={6}></textarea><br />
        
        <h3>Certifications (one per line)</h3>
        <textarea name="certifications" placeholder="Certification 1\nCertification 2" 
                  value={form.certifications} onChange={handleChange} rows={4}></textarea><br />
        
        <h3>Projects (one per paragraph)</h3>
        <textarea name="projects" placeholder="Project Name\nDescription\nLink" 
                  value={form.projects} onChange={handleChange} rows={6}></textarea><br />
        
        <h3>Languages (one per line)</h3>
        <textarea name="languages" placeholder="Language 1\nLanguage 2" 
                  value={form.languages} onChange={handleChange} rows={4}></textarea><br />
        
        <button 
          onClick={generatePreview}
          style={{ padding: '10px', marginTop: '10px', marginRight: '10px' }}
        >
          Generate Preview
        </button>
      </div>

      {showPreview && (
        <div style={{ flex: 1 }}>
          <ResumePreview html={resumeHtml} />
          <PdfGenerator html={resumeHtml} fileName={`${form.name.replace(' ', '_')}_resume.pdf`} />
        </div>
      )}
    </div>
  );
}