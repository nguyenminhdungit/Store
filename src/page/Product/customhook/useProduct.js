import productApi from 'api/productApi';
import { useEffect } from 'react';
import { useState } from 'react';

export default function useProduct(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await productApi.get(productId);
        setProduct(data);
      } catch (error) {
        console.log('fail call api product:', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return {
    product,
    loading,
  };
}
