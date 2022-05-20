export const AppointmentCard = ({ service, setTreatment }) => {
  const { name, slots } = service;
  const slotsCount = slots?.length;

  return (
    <div
      className="card lg:max-w-lg bg-base-100 "
      style={{ boxShadow: '3px 4px 10px 2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="card-body text-center">
        <h2 className="text-secondary text-xl font-semibold text-center">{name}</h2>
        <div>
          {slotsCount > 0 ? (
            <p className="text-neutral">
              {slots[0].split('-')[0]} - {slots[slotsCount - 1].split('-')[1]}
            </p>
          ) : null}

          {slotsCount > 1 ? (
            <p>{slotsCount} spaces available</p>
          ) : slotsCount !== 0 ? (
            <p>{slotsCount} space available</p>
          ) : (
            <p>No space available</p>
          )}
        </div>
        <div className="card-actions justify-center mt-2">
          <label
            htmlFor="bookingModal"
            onClick={() => setTreatment(service)}
            className="btn modal-button btn-secondary text-base-100"
            disabled={slots?.length === 0}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};
