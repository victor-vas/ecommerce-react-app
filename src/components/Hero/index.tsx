import { Link } from 'react-router-dom';
import heroBcg from '../../assets/hero-bcg.jpeg';
import heroBcg2 from '../../assets/hero-bcg-2.jpeg';
import { Wrapper } from './styled';

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          design your
          <br />
          comfort zone
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          numquam a delectus voluptate obcaecati est architecto nulla aperiam
          officia voluptas eius veritatis praesentium quidem necessitatibus
          quisquam consequuntur, vel, magni ipsum?
        </p>
        <Link to="/products" className="btn hero-btn">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="Nice Table" className="main-img" />
        <img src={heroBcg2} alt="Person Working" className="accent-img" />
      </article>
    </Wrapper>
  );
};

export default Hero;
