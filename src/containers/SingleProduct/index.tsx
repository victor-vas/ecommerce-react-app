import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Loading, Error, PageHero } from '../../components';
import AddToCart from '../../components/AddToCart';
import ProductImages from '../../components/ProductImages';
import Stars from '../../components/Stars';
import {
  ISingleProduct,
  useProductsContext,
} from '../../context/productsContext';
import { singleProductUrl } from '../../utils/constants';
import formatPrice from '../../utils/formatPrice';
import { Wrapper } from './styled';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const {
    singleProduct,
    singleProductLoading,
    singleProductError,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    if (fetchSingleProduct) {
      fetchSingleProduct(`${singleProductUrl}${id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (singleProductError) {
      const interval = setInterval(() => {
        history.push('/');
      }, 3000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProductError]);

  if (singleProductLoading) return <Loading />;

  if (!singleProduct || singleProductError) return <Error />;

  const {
    id: sku,
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    company,
    images,
  } = singleProduct as ISingleProduct;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link className="btn" to="/products">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} name={name} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Avaliable : </span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;
