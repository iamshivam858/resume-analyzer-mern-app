const fs = require('fs');
const mammoth = require('mammoth');

const extractDocx = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const { value } = await mammoth.extractRawText({ buffer });
  return value || '';
};

module.exports = { extractDocx };