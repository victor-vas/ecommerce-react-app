import React from 'react';
import { Filters, ProductList, Sort, PageHero } from '../../components';
import { Wrapper } from './styled';

const Products = () => {
  return (
    <main>
      <PageHero title="products" product={false} />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Products;
