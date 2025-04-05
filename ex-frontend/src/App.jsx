import { useState } from 'react'

import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState('');
  const [exportStatus, setExportStatus] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImport = async () => {
    if (!file) return alert('Please upload a file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:3000/importUser', formData);
      console.log(res.data);
      setImportStatus(`✅ Imported ${res.data.records} records`);
    } catch (err) {
      console.error(err);
      setImportStatus('❌ Import failed');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/exportUser', {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'exported-data.xlsx');
      document.body.appendChild(link);
      link.click();
      setExportStatus('✅ Export successful');
    } catch (err) {
      console.error(err);
      setExportStatus('❌ Export failed');
    }
  };

  return (

    <div style={{ padding: 40 }}>
      <h2>📥 Import & 📤 Export Excel (MERN)</h2>

      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleImport}>Import Excel</button>
      <p>{importStatus}</p>

      <hr />

      <button onClick={handleExport}>Export Excel</button>
      <p>{exportStatus}</p>
    </div>
  )
}

export default App
