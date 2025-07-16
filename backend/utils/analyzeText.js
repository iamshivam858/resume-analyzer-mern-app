const powerVerbs = ['led', 'managed', 'developed', 'built', 'optimized', 'designed'];
const sections = ['summary', 'objective', 'experience', 'education', 'skills', 'projects', 'certifications'];

function analyzeText(rawText, keywords = []) {
  const text = rawText.toLowerCase();

  const wordCount = text.trim().split(/\s+/).length;

  const matched = keywords.filter(k => text.includes(k.toLowerCase()));
  const missing = keywords.filter(k => !text.includes(k.toLowerCase()));
  const keywordScore = keywords.length ? Math.round((matched.length / keywords.length) * 100) : null;

  const foundSections = {};
  sections.forEach(sec => {
    const regex = new RegExp(`\\b${sec}\\b`, 'i');
    foundSections[sec] = regex.test(rawText);
  });

  const powerVerbMatches = powerVerbs.filter(v => text.includes(v));
  const powerVerbCount = powerVerbMatches.length;

  const formatWarnings = [];
  if (wordCount < 250) formatWarnings.push('Resume may be too short.');
  if (wordCount > 900) formatWarnings.push('Resume may be too long.');
  if (rawText.trim().length < 50) formatWarnings.push('Resume text unreadable (maybe scanned PDF).');

  return {
    wordCount,
    keywordMatch: { matched, missing, score: keywordScore },
    sections: foundSections,
    powerVerbs: powerVerbMatches,
    powerVerbCount,
    grammarScore: null,
    formatWarnings
  };
}

module.exports = { analyzeText };