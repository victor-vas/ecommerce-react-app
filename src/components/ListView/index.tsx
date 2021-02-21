import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../context/productsContext';
import formatPrice from '../../utils/formatPrice';
import { Wrapper } from './styled';

interface ListViewProps {
  products: IProduct[];
}

const ListView = ({ products }: ListViewProps) => {
  return (
    <Wrapper>
      {products.map(({ id, image, name, price, description }: IProduct) => (
        <article key={id}>
          <img src={image} alt={name} />
          <div>
            <h4>{name}</h4>
            <h5 className="price">{formatPrice(price)}</h5>
            <p>
              {description.substring(0, 150)}
              ...
            </p>
            <Link to={`/products/${id}`} className="btn">
              Details
            </Link>
          </div>
        </article>
      ))}
    </Wrapper>
  );
};

export default ListView;
