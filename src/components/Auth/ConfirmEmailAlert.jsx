import { AiOutlineClose } from 'react-icons/ai';

export const ConfirmEmailAlert = ({ setShowAlert }) => {
  return (
    <div className="shadow-lg flex bg-base-200 py-4 w-full max-w-[1366px] mx-auto rounded-xl">
      <div className="flex-1 flex justify-center items-center gap-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="text-neutral">
          The email for your account needs to be confirmed. Please follow the link we sent to your
          email.
        </div>
      </div>

      <div className="tooltip tooltip-bottom tooltip-info z-10" data-tip="close" tabIndex={0}>
        <AiOutlineClose
          onClick={() => setShowAlert(false)}
          aria-label="Close email confirmation alert"
          className="text-xl text-neutral cursor-pointer mr-5"
        />
      </div>
    </div>
  );
};
