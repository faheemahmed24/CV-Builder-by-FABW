import { parseCV } from '../../../lib/parsers/cvParser';

describe('parseCV', () => {
  it('should extract email and phone correctly', () => {
    const text = "My name is Ahmed. Email: ahmed@example.com. Phone: +92 300 1234567";
    const result = parseCV(text);
    expect(result.personalInfo.email).toBe('ahmed@example.com');
    expect(result.personalInfo.phone).toBe('+92 300 1234567');
  });

  it('should extract name from first line if it is short', () => {
    const text = "Ahmed Khan\nSoftware Engineer at TechCorp";
    const result = parseCV(text);
    expect(result.personalInfo.name).toBe('Ahmed Khan');
  });

  it('should extract skills correctly', () => {
    const text = "I know JavaScript, React, and Node.js.";
    const result = parseCV(text);
    expect(result.skills).toContain('JavaScript');
    expect(result.skills).toContain('React');
    expect(result.skills).toContain('Node.js');
  });

  it('should extract experience correctly', () => {
    const text = "Software Engineer at TechCorp for 3 years";
    const result = parseCV(text);
    expect(result.experience).toHaveLength(1);
    expect(result.experience[0].role).toBe('Software Engineer');
    expect(result.experience[0].company).toBe('TechCorp');
    expect(result.experience[0].duration).toBe('3 years');
  });

  it('should extract education correctly', () => {
    const text = "Bachelor in Computer Science from FAST University";
    const result = parseCV(text);
    expect(result.education).toHaveLength(1);
    expect(result.education[0].degree).toBe('Bachelor');
    expect(result.education[0].field).toBe('Computer Science');
    expect(result.education[0].institution).toBe('FAST University');
  });
});
