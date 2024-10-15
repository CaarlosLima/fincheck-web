import { forwardRef, useState } from 'react';

import { EyeIcon } from 'src/view/components/icons/EyeIcon';
import { Input, InputProps } from 'src/view/components/Input';

type InputPasswordProps = Omit<InputProps, 'type' | 'ref' | 'suffix'>;

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        suffix={
          <button
            type="button"
            className="absolute w-5 top-1/2 -translate-y-1/2 right-3 flex items-center justify-center"
            title={`${showPassword ? 'Ocultar' : 'Mostrar'} senha`}
            onClick={toggleShowPassword}
            tabIndex={-1}
          >
            <EyeIcon open={!showPassword} className="stroke-gray-900" />
          </button>
        }
      />
    );
  },
);
