import { IProduct } from '../../context/productsContext';
import Product from '../Product';
import { Wrapper } from './styled';

interface GridViewProps {
  products: IProduct[];
}

const GridView = ({ products }: GridViewProps) => {
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product: IProduct) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Wrapper>
  );
};

export default GridView;
