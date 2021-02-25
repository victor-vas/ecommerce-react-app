import { Wrapper } from './styled';

const CartColumns = () => {
  return (
    <Wrapper>
      <div className="content">
        <h5>item</h5>
        <h5>price</h5>
        <h5>quantity</h5>
        <h5>subtotal</h5>
        <span />
      </div>
      <hr />
    </Wrapper>
  );
};

export default CartColumns;
