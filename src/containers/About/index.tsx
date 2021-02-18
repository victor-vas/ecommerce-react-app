import aboutImg from '../../assets/hero-bcg.jpeg';
import { PageHero } from '../../components';
import { Wrapper } from './styled';

const About = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="Nice Desk" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline" />
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
            nobis reprehenderit nemo vitae impedit at, voluptates, hic placeat
            incidunt facere optio. Iusto dignissimos consequatur sit in totam
            doloribus reiciendis dolorum!
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

export default About;
