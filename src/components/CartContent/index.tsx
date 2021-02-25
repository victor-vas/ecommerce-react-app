import { Link } from 'react-router-dom';
import { Wrapper } from './styled';
import CartColumns from '../CartColumns';
import CartItem from '../CartItem';
import CartTotals from '../CartTotals';
import { ICartItem, useCartContext } from '../../context/cartContext';

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item: ICartItem) => (
        <CartItem key={item.id} item={item} />
      ))}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="link-btn clear-btn"
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

export default CartContent;
