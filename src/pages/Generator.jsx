import { useState } from 'react';

function Generator() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    giro_negocio: '',
    tamano_empresa: '',
    tipo_datos: '',
    tipo_documento: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al generar el documento. Por favor verifique los datos.');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Documento_${formData.nombre}_${formData.apellido}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus({ type: 'success', message: '¡Documento generado y descargado exitosamente!' });
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: error.message || 'Hubo un error de conexión.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h1>Generador de Documentos</h1>
        <p>Complete el formulario para generar y descargar su documento PDF con IA</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-input"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-input"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ej: Pérez"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className="form-input"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+51 987654321"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-input"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Av. Principal 123, Ciudad"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="giro_negocio">Giro de Negocio</label>
          <input
            type="text"
            id="giro_negocio"
            name="giro_negocio"
            className="form-input"
            value={formData.giro_negocio}
            onChange={handleChange}
            placeholder="Ej: Tecnología, Retail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tamano_empresa">Tamaño de Empresa</label>
          <input
            type="text"
            id="tamano_empresa"
            name="tamano_empresa"
            className="form-input"
            value={formData.tamano_empresa}
            onChange={handleChange}
            placeholder="Ej: Pequeña, Mediana"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo_datos">Tipo de Datos</label>
          <input
            type="text"
            id="tipo_datos"
            name="tipo_datos"
            className="form-input"
            value={formData.tipo_datos}
            onChange={handleChange}
            placeholder="Ej: Personales, Financieros"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo_documento">Tipo de Documento</label>
          <input
            type="text"
            id="tipo_documento"
            name="tipo_documento"
            className="form-input"
            value={formData.tipo_documento}
            onChange={handleChange}
            placeholder="Ej: Contrato de confidencialidad"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              Generando...
            </>
          ) : (
            'Generar y Descargar PDF'
          )}
        </button>
      </form>

      {status.message && (
        <div className={`notification ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}

export default Generator;
