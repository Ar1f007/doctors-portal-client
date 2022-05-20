export const InfoCard = ({ info }) => {
  const { icon, text, additionalInfo, bg, phoneNumber, iconName } = info;
  return (
    <div
      className={`px-7 py-8 flex flex-col lg:flex-row items-center lg:items-start lg:gap-x-6  rounded-xl ${
        bg === 'gradient' ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-neutral'
      }`}
    >
      <figure className="mb-3 lg:mb-0">
        <img src={icon} alt={iconName} className="w-[70px] h-[70px]" />
      </figure>
      <div className="text-base-100 text-center lg:text-left">
        <h2 className="font-bold text-xl mb-2 capitalize">{text}</h2>
        {phoneNumber ? (
          <a className="hover:link" href={`tel:${additionalInfo}`}>
            {additionalInfo}
          </a>
        ) : (
          <p>{additionalInfo}</p>
        )}
      </div>
    </div>
  );
};
