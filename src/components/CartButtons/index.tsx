import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../context/productsContext';
import { Wrapper } from './styled';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const user = true;

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">12</span>
        </span>
      </Link>
      <button type="button" className="auth-btn">
        Login
        {user ? <FaUserPlus /> : <FaUserMinus />}
      </button>
    </Wrapper>
  );
};

export default CartButtons;
