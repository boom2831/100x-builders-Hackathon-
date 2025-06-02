export function buildJson(formData) {
    // Basic structure
    const resume = {
        "name": formData.name || "",
        "title": formData.title || "",
        "contact": {
            "phone": formData.contact.phone || "",
            "email": formData.contact.email || "",
            "linkedin": formData.contact.linkedin || "",
            "github": formData.contact.github || "",
            "location": formData.contact.location || "",
            "portfolio": "" // Added for template compatibility
        },
        "summary": formData.summary || "",
        "experience": parseExperience(formData.experience || ""),
        "skills": parseSkills(formData.skills || ""),
        "education": parseEducation(formData.education || ""),
        "certifications": parseList(formData.certifications || "").map(name => ({ name })),
        "projects": parseProjects(formData.projects || ""),
        "languages": parseLanguages(formData.languages || "")
    };
    return resume;
}

function parseExperience(expText) {
    if (!expText) return [];
    
    const jobs = [];
    for (const job of expText.split('\n\n')) {
        if (job.trim()) {
            const parts = job.split('\n');
            if (parts.length >= 3) {
                jobs.push({
                    "jobTitle": parts[0].trim(),
                    "company": parts[1].trim(),
                    "location": parts[2].trim(),
                    "achievements": parts.slice(3).filter(a => a.trim()).map(a => a.trim()),
                    "startDate": "", // Placeholder
                    "endDate": "Present" // Placeholder
                });
            }
        }
    }
    return jobs;
}

function parseSkills(skillsText) {
    if (!skillsText) return { marketingSkills: [], leadershipSkills: [], softSkills: [] };
    
    const skills = [];
    for (const skill of skillsText.split('\n')) {
        if (skill.trim()) {
            skills.push({
                "name": skill.trim(),
                "score": 80,
                "skillStrengthTag": "Advanced"
            });
        }
    }
    
    return {
        "marketingSkills": skills,
        "leadershipSkills": [],
        "softSkills": []
    };
}

function parseEducation(eduText) {
    if (!eduText) return [];
    
    const education = [];
    for (const edu of eduText.split('\n\n')) {
        if (edu.trim()) {
            const parts = edu.split('\n');
            if (parts.length > 0) {
                education.push({
                    "degree": parts[0].trim(),
                    "institution": parts[1] ? parts[1].trim() : "",
                    "graduationDate": parts[2] ? parts[2].trim() : "",
                    "major": "", // Placeholder
                    "location": "", // Placeholder
                    "honorsAwards": [] // Placeholder
                });
            }
        }
    }
    return education;
}

function parseProjects(projectsText) {
    if (!projectsText) return [];
    
    const projects = [];
    for (const proj of projectsText.split('\n\n')) {
        if (proj.trim()) {
            const parts = proj.split('\n');
            if (parts.length > 0) {
                projects.push({
                    "projectName": parts[0].trim(),
                    "description": parts[1] ? parts[1].trim() : "",
                    "link": parts[2] ? parts[2].trim() : "",
                    "technologiesUsed": [] // Placeholder
                });
            }
        }
    }
    return projects;
}

function parseLanguages(langText) {
    if (!langText) return [];
    
    return langText.split('\n')
        .filter(lang => lang.trim())
        .map(lang => ({
            "name": lang.trim(),
            "proficiency": "Fluent"
        }));
}

function parseList(text) {
    if (!text) return [];
    
    return text.split('\n')
        .filter(item => item.trim())
        .map(item => item.trim());
}