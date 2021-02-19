import React from 'react';
import { services } from '../../utils/constants';
import { Wrapper } from './styled';

const Services = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <article className="header">
          <h3>
            custom furniture
            <br />
            built only for you
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            neque, soluta autem rem fugit saepe, laboriosam laudantium aliquam
            error iusto magni natus ratione hic quam distinctio? Alias
            asperiores sequi debitis?
          </p>
        </article>
        <div className="services-center">
          {services.map(({ id, icon, text, title }) => (
            <article key={id} className="service">
              <span className="icon">{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Services;
