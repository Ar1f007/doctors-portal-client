import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';

export const FormRow = ({ text, type, classes, passwordWithIcon }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`form-control w-full max-w-lg ${classes}`}>
      <label className="label">
        <span className="label-text">{text}</span>
      </label>
      {!passwordWithIcon ? (
        <input
          type={type}
          aria-label={`enter ${text}`}
          className="input input-bordered w-full max-w-lg"
        />
      ) : (
        <div className="relative flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            aria-label={`enter ${text}`}
            className="input input-bordered w-full max-w-lg"
          />
          <div
            className="absolute right-0 mr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiHide className="text-lg text-neutral" />
            ) : (
              <BiShow className="text-lg text-neutral" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
