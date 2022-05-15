import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import { TestimonialCard } from './TestimonialCard';

const reviews = [
  {
    id: 1,
    name: 'Wilson Harry',
    image: people1,
    text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
    city: 'California',
  },
  {
    id: 2,
    name: 'Wilson Harry',
    image: people2,
    text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
    city: 'California',
  },
  {
    id: 3,
    name: 'Wilson Harry',
    image: people3,
    text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
    city: 'California',
  },
];

export const Testimonial = () => {
  return (
    <section className="mx-auto max-w-[1366px] pt-10 lg:pt-0 pb-12 px-5 lg:px-0">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-secondary font-bold">Testimonials</h2>
          <p className="text-neutral text-2xl lg:text-4xl capitalize">What our patients says</p>
        </div>
        <figure>
          <img loading="lazy" src={quote} alt="quote icon" className="w-24 lg:w-48" />
        </figure>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {reviews.map((review) => (
          <TestimonialCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};
