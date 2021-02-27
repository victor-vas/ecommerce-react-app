import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useProductsContext } from '../../context/productsContext';
import { useUserContext } from '../../context/userContext';
import { Wrapper } from './styled';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { totalItems, clearCart } = useCartContext();
  const { loginWithRedirect, logout, myUser } = useUserContext();

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalItems}</span>
        </span>
      </Link>
      {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            if (clearCart) clearCart();
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
          <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login
          <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

export default CartButtons;
