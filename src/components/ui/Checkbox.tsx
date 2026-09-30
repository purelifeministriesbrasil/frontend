import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  id?: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  "aria-describedby"?: string;
  className?: string;
}

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  disabled = false,
  label,
  description,
  "aria-describedby": ariaDescribedBy,
  className = "",
}: CheckboxProps) {
  const generatedId = id || (name ? `checkbox-${name}` : undefined);

  return (
    <label
      htmlFor={generatedId}
      className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          id={generatedId}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={ariaDescribedBy}
          className="sr-only peer"
        />
        {/* Shadcn-inspired custom animated checkbox box */}
        <div
          className={`w-5 h-5 rounded-xs border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
            checked
              ? "bg-[#044A82] border-[#044A82] shadow-xs ring-2 ring-[#044A82]/20"
              : "bg-white border-[#DEDEDE] group-hover:border-[#044A82]/60 group-hover:bg-[#F5F2EC]/40"
          } peer-focus-visible:ring-2 peer-focus-visible:ring-[#044A82] peer-focus-visible:ring-offset-2 peer-active:scale-90`}
        >
          <Check
            className={`w-3.5 h-3.5 text-white stroke-[3] transition-all duration-200 ease-out transform ${
              checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="font-montserrat text-xs text-[#454A50] leading-relaxed group-hover:text-[#1C2530] transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="font-montserrat text-[0.7rem] text-[#727272] mt-0.5 leading-snug">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
