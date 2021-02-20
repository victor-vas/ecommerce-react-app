/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Image } from '../../context/productsContext';
import { Wrapper } from './styled';

interface ProductImagesProps {
  name: string;
  images: Image[];
}
const ProductImages = ({ name, images = [] }: ProductImagesProps) => {
  const [main, setMain] = useState(images[0]);

  return (
    <Wrapper>
      <img src={main?.url} alt={`Main ${name}`} className="main" />
      <div className="gallery">
        {images.map((image: Image, index: number) => (
          <img
            src={image.url}
            alt={image.filename}
            key={image.id}
            onClick={() => setMain(images[index])}
            className={image.url === main.url ? 'active' : ''}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default ProductImages;
