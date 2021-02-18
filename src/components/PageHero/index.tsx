import { Link } from 'react-router-dom';
import { Wrapper } from './styled';

interface PageHeroProps {
  title: string;
}

const PageHero = ({ title }: PageHeroProps) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {`/ ${title}`}
        </h3>
      </div>
    </Wrapper>
  );
};

export default PageHero;
