export const TestimonialCard = ({ review: { name, text, city, image } }) => {
  return (
    <div className="card max-w-lg bg-base-100 shadow-xl">
      <div className="card-body">
        <p>{text}</p>

        <div className="flex gap-x-5 items-center mt-5">
          <div class="avatar">
            <div class="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={image} alt="avatar" />
            </div>
          </div>
          <div className="text-neutral">
            <h4>{name}</h4>
            <p>{city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
