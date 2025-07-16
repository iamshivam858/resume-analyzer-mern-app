const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractPdf = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text || '';
};

module.exports = { extractPdf };