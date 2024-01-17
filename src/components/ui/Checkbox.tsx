import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="checkbox-label" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="checkbox-input"
      />
      <span className="checkbox-custom" />
      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
}
