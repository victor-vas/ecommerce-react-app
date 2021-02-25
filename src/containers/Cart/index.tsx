import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../../components';
import { Wrapper } from './styled';
import { useCartContext } from '../../context/cartContext';

const Cart = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero title="cart" product={false} />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

export default Cart;
