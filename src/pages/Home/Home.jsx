import { Appointment, Banner, Info, Services } from '../../components';
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
      </main>
    </>
  );
};
