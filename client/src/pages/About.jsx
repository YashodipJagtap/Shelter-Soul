import { about } from '../data';
import Team from '../components/About/Team';
import Sponsors from '../components/About/Sponsors';
import Rehoming from '../components/About/Rehoming';
import Hero from '../components/About/Hero';
import Footer from '../components/Footer';

const About = () => {
  const {
    heros,
    title,
    heading,
    paragraphs,
    commitments,
    team,
    rehoming,
    sponsors,
  } = about;
  return (
    <section id="about" className="section flex-col justify-between">
      <div>
        <div className="container mx-auto">
          <div className="hidden md:block mb-36">
            <Hero heros={heros} />
          </div>

          <h1 className="text-center section-title">{title}</h1>
          <h2 className="subtitle">{heading}</h2>
          {paragraphs.map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
                {index === 2 && (
                  <ul className="list-disc list-inside indent-7 mb-5 leading-6">
                    {commitments.map((commitment, index) => {
                      return <li key={index}>{commitment}</li>;
                    })}
                  </ul>
                )}
              </div>
            );
          })}

          {/* rehoming section */}
          <Rehoming {...rehoming} />
          {/* sponsors section */}
          {/* <Sponsors {...sponsors} /> */}
          {/* team section*/}
          <Team {...team} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default About;
