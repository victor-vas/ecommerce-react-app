import { Link } from 'react-router-dom';
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
              <Link to={url} onClick={closeSidebar}>
                {text}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/checkout" onClick={closeSidebar}>
              Checkout
            </Link>
          </li>
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

export default Sidebar;
