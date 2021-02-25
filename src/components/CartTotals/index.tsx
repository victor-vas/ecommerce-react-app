import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import formatPrice from '../../utils/formatPrice';
import { Wrapper } from './styled';

const CartTotals = () => {
  const { totalAmount, shippingFee } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal:
            <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            shipping fee:
            <span>{formatPrice(shippingFee)}</span>
          </p>
          <hr />
          <h4>
            order total:
            <span>{formatPrice(totalAmount + shippingFee)}</span>
          </h4>
        </article>
        {myUser ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button type="button" onClick={loginWithRedirect} className="btn">
            login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default CartTotals;
