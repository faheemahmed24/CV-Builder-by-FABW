import { saveAs } from 'file-saver';

export const exportToJson = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, filename);
};

export const importFromJson = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

export const generatePlainText = (data: any): string => {
  let text = `${data.personalInfo.name.toUpperCase()}\n`;
  text += `${data.personalInfo.title}\n`;
  text += `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}\n\n`;
  
  text += `SUMMARY\n${data.summary}\n\n`;
  
  text += `EXPERIENCE\n`;
  data.experience.forEach((exp: any) => {
    text += `${exp.role} at ${exp.company} (${exp.duration})\n`;
    text += `${exp.description}\n\n`;
  });
  
  text += `EDUCATION\n`;
  data.education.forEach((edu: any) => {
    text += `${edu.institution} - ${edu.degree} in ${edu.field} (${edu.startDate} - ${edu.endDate})\n`;
  });
  
  text += `\nSKILLS\n${data.skills.join(', ')}\n`;
  
  return text;
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

export const exportToHtml = (data: any, filename: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data.personalInfo.name} - CV</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 20px; }
          h1 { color: #2563eb; margin-bottom: 5px; }
          h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-top: 30px; }
          .header-info { color: #666; margin-bottom: 30px; }
          .item { margin-bottom: 20px; }
          .item-header { font-weight: bold; display: flex; justify-content: space-between; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill { background: #f3f4f6; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>${data.personalInfo.name}</h1>
        <div class="header-info">
          ${data.personalInfo.title} | ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}
        </div>
        
        <h2>Summary</h2>
        <p>${data.summary}</p>
        
        <h2>Experience</h2>
        ${data.experience.map((exp: any) => `
          <div class="item">
            <div class="item-header">
              <span>${exp.role} at ${exp.company}</span>
              <span>${exp.duration}</span>
            </div>
            <p>${exp.description}</p>
          </div>
        `).join('')}
        
        <h2>Education</h2>
        ${data.education.map((edu: any) => `
          <div class="item">
            <div class="item-header">
              <span>${edu.institution}</span>
              <span>${edu.startDate} - ${edu.endDate}</span>
            </div>
            <p>${edu.degree} in ${edu.field}</p>
          </div>
        `).join('')}
        
        <h2>Skills</h2>
        <div class="skills">
          ${data.skills.map((skill: string) => `<span class="skill">${skill}</span>`).join('')}
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: 'text/html' });
  saveAs(blob, filename);
};
