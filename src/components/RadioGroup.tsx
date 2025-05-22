import React from 'react';

interface RadioOption {
  value: string | boolean;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === 'true' ? true : 
                     e.target.value === 'false' ? false : 
                     e.target.value;
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-purple-600">*</span>}
      </div>
      <div className="flex space-x-6">
        {options.map((option) => (
          <div key={option.label} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;