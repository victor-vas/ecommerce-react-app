import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import { SidebarContainer } from './styled';
import { links, ILink } from '../../utils/constants';
import CartButtons from '../CartButtons';

const Sidebar = () => {
  const isOpen = false;

  return (
    <SidebarContainer>
      <aside className={isOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className="sidebar-header">
          <img src={logo} alt="Comfy sloth" className="logo" />
          <button type="button" className="close-btn">
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }: ILink) => (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

export default Sidebar;
