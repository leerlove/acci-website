import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | 한국반려문화산업학회` : '한국반려문화산업학회 | KACCI';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
