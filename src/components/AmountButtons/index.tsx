import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Wrapper } from './styled';

interface AmountButtonsProps {
  amount: number;
  decrease: () => void;
  increase: () => void;
}

const AmountButtons = ({ amount, decrease, increase }: AmountButtonsProps) => {
  return (
    <Wrapper className="amount-btns">
      <button type="button" className="amount-btn" onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button type="button" className="amount-btn" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

export default AmountButtons;
