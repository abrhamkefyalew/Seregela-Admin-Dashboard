type CardProps = {
  label: string;
  value: number;
  unit?: string;
  change: number;
  icon: React.ReactNode;
};

export default function Card({ label, value, unit, change, icon }: CardProps) {
  const isNegative = change < 0;
  const iconArrow = isNegative ? '▼' : '▲';
  const changeColor = isNegative ? 'text-red-500' : 'text-green-600';

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 relative">
      <div className="absolute top-4 right-4 text-xl opacity-40">
        {icon}
      </div>
      <h3 className="text-gray-500 text-sm">{label}</h3>
      <p className="text-2xl font-bold my-2 text-black">
        {unit || ''}{value.toLocaleString()}
      </p>
      <p className={`text-sm ${changeColor}`}>
        {iconArrow} {Math.abs(change)}% vs last month
      </p>
    </div>
  );
}
