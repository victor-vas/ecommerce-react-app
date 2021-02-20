import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import { SidebarContainer } from './styled';
import { links, ILink } from '../../utils/constants';
import CartButtons from '../CartButtons';
import { useProductsContext } from '../../context/productsContext';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();

  return (
    <SidebarContainer>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className="sidebar-header">
          <img src={logo} alt="Comfy sloth" className="logo" />
          <button type="button" className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }: ILink) => (
            <li key={id}>
              <NavLink
                exact
                to={url}
                onClick={closeSidebar}
                activeClassName="active"
              >
                <span>{text}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              exact
              to="/checkout"
              onClick={closeSidebar}
              activeClassName="active"
            >
              <span>Checkout</span>
            </NavLink>
          </li>
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

export default Sidebar;
