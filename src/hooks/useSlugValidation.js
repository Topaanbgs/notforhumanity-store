import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/Slugify';

export const useSlugValidation = (product, slugText) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (product && slugify(product.name) !== slugText) {
      navigate(`/products/${product.id}-${slugify(product.name)}`, { 
        replace: true 
      });
    }
  }, [product, slugText, navigate]);
};