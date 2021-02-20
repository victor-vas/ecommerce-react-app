import { FaBars } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { NavContainer } from './styled';
import { links, ILink } from '../../utils/constants';
import CartButtons from '../CartButtons';
import { useProductsContext } from '../../context/productsContext';

const Nav = () => {
  const { openSidebar } = useProductsContext();

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
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

export default Nav;
