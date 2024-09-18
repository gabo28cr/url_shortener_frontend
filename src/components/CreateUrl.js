import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir


const CreateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error
  const navigate = useNavigate(); // Inicializar el hook para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Limpiar el mensaje de error antes de intentar enviar la solicitud
    setErrorMessage('');
    setShortUrl(''); // Limpiar también la URL acortada si ya existe
    try {
      const response = await axios.post('http://localhost:8000/api/urls', { originalUrl });
      setShortUrl(response.data.shortUrl);
      // Redirigir después de 3 segundos
        setTimeout(() => {
            navigate('/');
        }, 3000);
    } catch (error) {
    if (error.response && error.response.status === 422) {
        setErrorMessage('La URL proporcionada no es válida. Inténtalo de nuevo.'); // Establecer el mensaje de error
        } else {
        setErrorMessage('Ocurrió un error al crear la URL. Inténtalo de nuevo más tarde.'); // Otro tipo de error
        }
      console.error('Error creating short URL:', error.response.data);
    }
  };

  return (
    <div className="create-url-container container mt-5">
      <h2 className="text-center mb-4">Crear una URL Acortada</h2>
      <form onSubmit={handleSubmit} className="form-inline justify-content-center">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Crear</button>
        </div>
      </form>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && (
        <div className="alert alert-danger mt-3">
          <p>{errorMessage}</p>
        </div>
      )}

      {shortUrl && (
        <div className="alert alert-success mt-3">
          <p>Tu URL acortada: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default CreateUrl;