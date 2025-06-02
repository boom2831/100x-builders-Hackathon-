import React from 'react';

export default function ResumePreview({ html }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h2>Resume Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}