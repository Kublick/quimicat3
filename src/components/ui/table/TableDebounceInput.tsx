import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function TableDebounceInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <Input
      label="Buscar"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      css={{
        maxWidth: "50%",
        my: "2rem",
      }}
      contentRight={<MagnifyingGlassIcon className="h-5 w-5" />}
    />
  );
}
