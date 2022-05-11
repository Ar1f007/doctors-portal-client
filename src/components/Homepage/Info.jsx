import { useId } from 'react';
import { InfoCard } from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const information = [
  {
    icon: clock,
    text: 'Opening hours',
    additionalInfo: '9 am, Monday to Saturday',
    bg: 'gradient',
    iconName: 'clock',
  },
  {
    icon: marker,
    text: 'Visit our location',
    additionalInfo: 'Brooklyn, NY 10036, United States',
    bg: 'dark',
    iconName: 'marker',
  },
  {
    icon: phone,
    text: 'Contact us now',
    additionalInfo: '+000 123 456789',
    bg: 'gradient',
    phoneNumber: true,
    iconName: 'phone',
  },
];

export const Info = () => {
  const id = useId();
  return (
    <section className="mx-auto max-w-[1366px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-20 px-3 lg:px-0">
      {information.map((info, i) => (
        <InfoCard key={`${id}-${i}`} info={info} />
      ))}
    </section>
  );
};
