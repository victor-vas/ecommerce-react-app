/* eslint-disable jsx-a11y/label-has-associated-control */
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { useFilterContext } from '../../context/filterContext';
import { Wrapper } from './styled';

const Sort = () => {
  const {
    filteredProducts,
    gridView,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useFilterContext();

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={gridView ? 'active' : ''}
          onClick={setGridView}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={!gridView ? 'active' : ''}
          onClick={setListView}
        >
          <BsList />
        </button>
      </div>
      <p>{`${filteredProducts.length} products found`}</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={updateSort}
        >
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a - z)</option>
          <option value="name-z">name (z - a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

export default Sort;
