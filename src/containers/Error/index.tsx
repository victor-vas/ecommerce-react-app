import { Link } from 'react-router-dom';
import { Wrapper } from './styled';

const Error = () => {
  return (
    <Wrapper className="page-100">
      <section>
        <h1>404</h1>
        <h3>Sorry, the page you tried connot be fount</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

export default Error;
