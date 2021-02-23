/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaCheck } from 'react-icons/fa';
import { useFilterContext } from '../../context/filterContext';
import formatPrice from '../../utils/formatPrice';
import getUniqueValues from '../../utils/getUniquesValues';
import { Wrapper } from './styled';

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, 'category');
  const companies = getUniqueValues(allProducts, 'company');
  const colors = getUniqueValues(allProducts, 'colors');

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((item: string) => (
                <button
                  key={item}
                  type="button"
                  name="category"
                  value={category}
                  onClick={updateFilters}
                  className={category === item.toLowerCase() ? 'active' : ''}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((item: string) => {
                if (item === 'all') {
                  return (
                    <button
                      key={item}
                      type="button"
                      name="color"
                      data-color="all"
                      onClick={updateFilters}
                      className={color === 'all' ? 'all-btn active' : 'all-btn'}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={item}
                    type="button"
                    name="color"
                    onClick={updateFilters}
                    data-color={item}
                    style={{ backgroundColor: item }}
                    className={
                      color === item ? 'color-btn active' : 'color-btn'
                    }
                  >
                    {color === item ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          <button type="button" onClick={clearFilters} className="clear-btn">
            clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Filters;
