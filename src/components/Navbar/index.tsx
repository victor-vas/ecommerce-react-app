import { FaBars } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { NavContainer } from './styled';
import { links, ILink } from '../../utils/constants';
import CartButtons from '../CartButtons';
import { useProductsContext } from '../../context/productsContext';
import { useUserContext } from '../../context/userContext';

const Nav = () => {
  const { openSidebar } = useProductsContext();
  const { myUser } = useUserContext();

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Comfy Sloth" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links?.map((link: ILink) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <NavLink exact to={url} activeClassName="active">
                  {text}
                </NavLink>
              </li>
            );
          })}
          {myUser && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

export default Nav;
