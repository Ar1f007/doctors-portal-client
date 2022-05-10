import { ServiceCard } from './ServiceCard';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';

export const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Fluoride Treatment',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      image: fluoride,
    },
    {
      id: 2,
      name: 'Cavity Filling',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      image: cavity,
    },
    {
      id: 3,
      name: 'Teeth Whitening',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      image: whitening,
    },
  ];
  return (
    <section className="pb-14 lg:pt-12 px-8 lg:px-0 lg:pb-16">
      <div className="text-center">
        <h3 className="uppercase text-xl font-bold text-primary">our services</h3>
        <h2 className="capitalize text-2xl lg:text-4xl font-normal text-neutral">
          Service we provide
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-14 lg:py-20">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};
