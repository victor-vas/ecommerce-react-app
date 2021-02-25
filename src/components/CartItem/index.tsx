/* eslint-disable prettier/prettier */
import { FaTrash } from 'react-icons/fa';
import { ICartItem, useCartContext } from '../../context/cartContext';
import formatPrice from '../../utils/formatPrice';
import AmountButtons from '../AmountButtons';
import { Wrapper } from './styled';

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({
  item: { id, name, price, amount, color, image }
}: CartItemProps) => {
  const { removeItem, toggleAmount } = useCartContext();

  const decrease = () => {
    if (typeof toggleAmount !== 'undefined') toggleAmount(id, 'dec');
  };

  const increase = () => {
    if (typeof toggleAmount !== 'undefined') toggleAmount(id, 'inc');
  };

  return (
    <Wrapper>
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <h5 className="name">{name}</h5>
          <p className="color">
            color:
            <span style={{backgroundColor: color}} />
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => {
          if(typeof removeItem !== 'undefined') removeItem(id);
        }}
      >
        <FaTrash />
      </button>
    </Wrapper>
  );
};

export default CartItem;
