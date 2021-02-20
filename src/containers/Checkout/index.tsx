import { PageHero } from '../../components';
import { Wrapper } from './styled';

const Checkout = () => {
  return (
    <main>
      <PageHero title="checkout" product={false} />
      <Wrapper className="page">
        <h1>checkout here</h1>
      </Wrapper>
    </main>
  );
};

export default Checkout;
