import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ISingleProduct } from '../../context/productsContext';
import AmountButtons from '../AmountButton';
import { Wrapper } from './styled';

interface AddToCartProps {
  product: ISingleProduct;
}

const AddToCart = ({ product: { stock, colors } }: AddToCartProps) => {
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const decrease = () => {
    setAmount(oldAmount => {
      let tempAmount = oldAmount - 1;

      if (tempAmount < 1) {
        tempAmount = 1;
      }

      return tempAmount;
    });
  };

  const increase = () => {
    setAmount(oldAmount => {
      let tempAmount = oldAmount + 1;

      if (tempAmount > stock) {
        tempAmount = oldAmount;
      }

      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color: string, index: number) => (
            <button
              type="button"
              style={{ backgroundColor: color }}
              className={mainColor === color ? 'color-btn active' : 'color-btn'}
              key={`${`${color}-${index}`}`}
              onClick={() => setMainColor(color)}
            >
              {mainColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          decrease={decrease}
          increase={increase}
        />
        <Link to="/cart" className="btn">
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

export default AddToCart;
