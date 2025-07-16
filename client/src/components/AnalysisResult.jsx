export default function AnalysisResult({ report }) {
  return (
    <div className="analysis-result">
      <h3>Resume Analysis Result</h3>
      <p><strong>Word Count:</strong> {report.wordCount}</p>

      <p><strong>Keyword Match Score:</strong> {report.keywordMatch?.score}%</p>
      <p><strong>Matched:</strong> {report.keywordMatch?.matched?.join(', ')}</p>
      <p><strong>Missing:</strong> {report.keywordMatch?.missing?.join(', ')}</p>

      <p><strong>Sections Found:</strong></p>
      <ul>
        {Object.entries(report.sections).map(([section, exists]) => (
          <li key={section}>
            {section}: {exists ? '✅' : '❌'}
          </li>
        ))}
      </ul>

      <p><strong>Power Verbs Used:</strong> {report.powerVerbs.join(', ')}</p>

      {report.formatWarnings.length > 0 && (
        <>
          <p><strong>Warnings:</strong></p>
          <ul>
            {report.formatWarnings.map((w, i) => <li key={i}>⚠️ {w}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
