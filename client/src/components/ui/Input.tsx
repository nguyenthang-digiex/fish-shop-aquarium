export default function Input({
  label,
  value,
  onChange,
  classLabel,
  className,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  classLabel?: string;
  className?: string;
}) {
  return (
    <div>
      <label className={`${classLabel} mb-2 block text-sm text-slate-400`}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${className} w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 focus:border-cyan-400 focus:outline-none`}
      />
    </div>
  );
}
