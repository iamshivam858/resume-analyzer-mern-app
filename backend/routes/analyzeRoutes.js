const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractPdf } = require('../utils/extractPdf');
const { extractDocx } = require('../utils/extractDocx');
const { analyzeText } = require('../utils/analyzeText');
const roleKeywords = require('../roleKeywords');

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || ext === '.docx') cb(null, true);
    else cb(new Error('Only .pdf or .docx files are allowed'));
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const role = (req.body.role || '').toLowerCase();

    let rawText = '';
    if (req.file.originalname.toLowerCase().endsWith('.pdf')) {
      rawText = await extractPdf(filePath);
    } else {
      rawText = await extractDocx(filePath);
    }

    const keywords = roleKeywords[role] || roleKeywords['full stack developer'];
    const report = analyzeText(rawText, keywords);

    res.json({ ok: true, role, report });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
