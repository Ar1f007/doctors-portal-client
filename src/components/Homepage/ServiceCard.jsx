export const ServiceCard = ({ service }) => {
  const { name, description, image } = service;
  return (
    <div
      className="align-middle self-center flex flex-col items-center rounded-[18px] pt-12 pb-10 px-[14px] lg:p-11"
      style={{ boxShadow: '3px 4px 10px 2px rgba(0, 0, 0, 0.05)' }}
    >
      <figure>
        <img src={image} alt={name} className="w-20 lg:w-full" />
      </figure>
      <div className="text-center">
        <h3 className="text-neutral text-xl font-semibold pt-9 pb-2 capitalize">{name}</h3>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};
