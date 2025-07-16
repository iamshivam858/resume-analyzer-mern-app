import { useState } from 'react';
import axios from 'axios';
import AnalysisResult from './AnalysisResult';

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return alert('Please upload a resume file.');

    const fd = new FormData();
    fd.append('resume', file);
    fd.append('role', role);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/analyze', fd);
      setResult(res.data.report);
    } catch (err) {
      alert('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Target Role (e.g. React Developer)"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {result && <AnalysisResult report={result} />}
    </div>
  );
}
