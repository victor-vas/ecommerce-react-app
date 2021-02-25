import { Link } from 'react-router-dom';
import { IProduct, useProductsContext } from '../../context/productsContext';
import Error from '../Error';
import Loading from '../Loading';
import Product from '../Product';
import { Wrapper } from './styled';

const FeaturedProducts = () => {
  const {
    productsLoading,
    productsError,
    featuredProducts,
  } = useProductsContext();

  if (productsLoading) return <Loading />;

  if (productsError) return <Error />;

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline" />
      </div>
      <div className="section-center featured">
        {featuredProducts.map((product: IProduct) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

export default FeaturedProducts;
