import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectPage = () => {
  const { code } = useParams();

  useEffect(() => {
    const redirectToUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/r/${code}`);
        console.log(response.data);
        const originalUrl = response.data.original_url;

        // Si la URL original existe, redirige
        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          console.error('No URL found for this code.');
        }
      } catch (error) {
        console.error('Error fetching the original URL:', error);
      }
    };

    redirectToUrl();
  }, [code]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;