import { Link } from 'react-router-dom';
import { PageHero, StripeCheckout } from '../../components';
import { useCartContext } from '../../context/cartContext';
import { Wrapper } from './styled';

const Checkout = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" product={false} />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};

export default Checkout;
