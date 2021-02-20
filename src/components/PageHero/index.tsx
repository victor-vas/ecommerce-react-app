import { Link } from 'react-router-dom';
import { Wrapper } from './styled';

interface PageHeroProps {
  title: string;
  product: boolean;
}

const PageHero = ({ title, product }: PageHeroProps) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home </Link>
          {product && <Link to="/products">/ Products</Link>}
          {`/ ${title}`}
        </h3>
      </div>
    </Wrapper>
  );
};

export default PageHero;
