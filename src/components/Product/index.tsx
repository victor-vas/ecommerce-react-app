import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IProduct } from '../../context/productsContext';
import formatPrice from '../../utils/formatPrice';
import { Wrapper } from './styled';

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  const { id, name, image, price } = product;

  return (
    <Wrapper>
      <div className="container">
        <img src={image} alt={name} />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};

export default Product;
