import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir


const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook para la redirección

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/urls');
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/urls/${id}`);
      fetchUrls();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  // Maneja la redirección a la página de creación de URL
  const handleCreateUrl = () => {
    navigate('/create'); // Redirige a la ruta de creación de URL
  };

  return (
    <div className="url-list-container container mt-5">
      <h2 className="text-center mb-4">Lista de URLs Acortadas</h2>
      
      {/* Botón para redirigir a la página de creación de URL */}
      <div className="text-center mb-4">
        <button onClick={handleCreateUrl} className="btn btn-primary">Crear URL</button>
      </div>

      {/* Tabla con Bootstrap */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>URL Original</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.id}</td>
              <td>{url.code}</td>
              <td>
                <a href={url.original_url} target="_blank" rel="noopener noreferrer">
                  {url.original_url}
                </a>
              </td>
              <td>
                {/* Enlace basado en el código acortado */}
                <a href={`/r/${url.code}`} className="btn btn-info btn-sm mr-2">Ir</a>
                <button onClick={() => handleDelete(url.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;