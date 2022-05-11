import { Appointment, Banner, ContactUs, Info, Services, Testimonial } from '../../components';
import { Treatment } from '../../components/Homepage/Treatment';

export const Home = () => {
  return (
    <>
      <header>
        <Banner />
      </header>
      <main>
        <Info />
        <Services />
        <Treatment />
        <Appointment />
        <Testimonial />
        <ContactUs />
      </main>
    </>
  );
};
