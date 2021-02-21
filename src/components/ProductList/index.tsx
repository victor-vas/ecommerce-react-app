import { useFilterContext } from '../../context/filterContext';
import GridView from '../GridView';
import ListView from '../ListView';

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  if (gridView === false) return <ListView products={filteredProducts} />;

  return <GridView products={filteredProducts} />;
};

export default ProductList;
