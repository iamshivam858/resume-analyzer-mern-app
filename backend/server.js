const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', analyzeRoutes);

app.get('/', (req, res) => res.send('Resume Analyzer API Ready'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;