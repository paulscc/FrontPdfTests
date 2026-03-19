import { useState, useEffect } from 'react';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/documents');
      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }
      
      const data = await response.json();
      
      // We'll safely wrap the data in an array if it's not one, 
      // just in case the backend returns a single object or an error structure.
      const docsArray = Array.isArray(data) ? data : (data.documents || [data]);
      setDocuments(docsArray);
      
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('No se pudo cargar la lista de documentos. Verifique que el endpoint /documents está disponible.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to dynamically render all keys of an object nicely
  const renderDocumentCard = (doc, index) => {
    // Determine the title: use multiple common identifiers
    const title = doc.nombre && doc.apellido 
      ? `${doc.nombre} ${doc.apellido}` 
      : doc.title || doc.name || doc.filename || doc.id || `Documento #${index + 1}`;
      
    // Remove the fields we already used for the title
    const { nombre, apellido, title: _, name: __, filename: ___, ...rest } = (typeof doc === 'object' && doc !== null) ? doc : { value: doc };

    return (
      <div key={doc.id || index} className="file-item file-item-large">
        <div className="file-info file-info-full">
          <span className="file-name">{title}</span>
          
          <div className="doc-details-grid">
            {Object.entries(rest).map(([key, value]) => {
              // Avoid rendering complex nested objects entirely, just strings/numbers
              if (typeof value === 'object') return null;
              
              const displayKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              return (
                <div key={key} className="detail-row">
                  <span className="detail-label">{displayKey}:</span>
                  <span className="detail-value">{String(value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="history-card">
      <div className="form-header">
        <h1>Registros de Documentos</h1>
        <p>Listado de todos los documentos e información guardada</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner history-spinner"></div>
          <p>Cargando registros...</p>
        </div>
      ) : error ? (
        <div className="notification error">{error}</div>
      ) : documents.length === 0 ? (
        <div className="empty-state">
          <p>Aún no hay registros de documentos.</p>
        </div>
      ) : (
        <div className="files-list">
          {documents.map((doc, idx) => renderDocumentCard(doc, idx))}
        </div>
      )}
    </div>
  );
}

export default Documents;
