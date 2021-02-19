import { Wrapper } from './styled';

const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>Join our newsletter and get 20% off</h3>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint,
            impedit. Ex quas esse pariatur voluptatibus dignissimos! Provident
            doloribus quas magni ab officiis debitis soluta amet ratione,
            nostrum blanditiis est omnis!
          </p>
          <form
            action="https://formspree.io/f/mnqoyolw"
            method="POST"
            className="contact-form"
          >
            <input
              type="email"
              className="form-input"
              placeholder="enter email"
              name="_replyto"
            />
            <button type="submit" className="submit-btn">
              subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
