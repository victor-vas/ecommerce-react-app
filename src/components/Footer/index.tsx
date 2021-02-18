import { Wrapper } from './styled';

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy;
        {new Date().getFullYear()}
        <span> Comfy Sloth </span>
      </h5>
      <h5>All rights reserved.</h5>
    </Wrapper>
  );
};

export default Footer;
