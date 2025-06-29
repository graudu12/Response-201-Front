import css from "./LoadMoreBtn.module.css";
export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}
/*import { useState } from 'react';
import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ images, setImages }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/images?page=${page + 1}`);
      const newImages = await response.json();

      setImages(prev => [...prev, ...newImages]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ❗ Кнопка не рендериться, якщо images порожній
  if (!images || images.length === 0) return null;

  return (
    <button className={css.button} onClick={loadMore} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  );
}
для батька

useEffect(() => {
    // Початкове завантаження
    fetch('/api/images?page=1')
      .then(res => res.json())
      .then(initialImages => setImages(initialImages));
  }, []);

  return (
    <div>
      <div className="image-list">
        {images.map(img => (
          <ImageItem key={img.id} image={img} />
        ))}
      </div>

      { Передаємо стан і метод у кнопку}
      <LoadMoreBtn images={images} setImages={setImages} />
    </div>
  );
}*/
