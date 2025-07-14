// src/components/Card.tsx


type CardProps = {
  label: string;
  value: number;
  unit?: string;
  change: number;
  icon: React.ReactNode;
  lastMonthValue?: number;
  thisMonthRange?: string;
  lastMonthRange?: string;
};

export default function Card({
  label,
  value,
  unit,
  change,
  icon,
  lastMonthValue,
  thisMonthRange,
  lastMonthRange
}: CardProps) {
  const isNegative = change < 0;
  const iconArrow = isNegative ? '▼' : '▲';
  const changeColor = isNegative ? 'text-red-500' : 'text-green-600';

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 relative flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-gray-500 text-sm">{label}</h3>
          <div className="text-xl opacity-40">{icon}</div>
        </div>

        <p className="text-2xl font-bold text-black mb-1">
          {unit && <span className="text-sm text-gray-500 mr-1">{unit}</span>}
          {value.toLocaleString()}
        </p>

        {label !== 'Target Revenue' ? (
          <p className={`text-sm ${changeColor}`}>
            {iconArrow} {Math.abs(change)}% vs last month{' '}
            {lastMonthValue !== undefined && (
              <span className="ml-1 text-blue-400 text-xs">
                (
                {unit === 'Br' && <span className="text-blue-500 text-xs mr-1">Br</span>}
                {lastMonthValue.toLocaleString()}
                )
              </span>
            )}
          </p>
        ) : (
          <p style={{ visibility: 'hidden', height: '1em', marginBottom: 0 }}>
            Placeholder
          </p>
        )}
      </div>

      
      

      {label !== 'Target Revenue' ? (
        <div>
          <div className={'text-right text-xs text-gray-400 mt-2'}>
            Current Month {thisMonthRange && <span className={'text-blue-400 ml-1'}>{thisMonthRange}</span>}
          </div>
          <div className={'text-right text-xs text-gray-400 mt-2'}>
            Last Month {lastMonthRange && <span className={'text-blue-400 ml-1'}>{lastMonthRange}</span>}
          </div>
        </div>
      ) : (
        <p style={{ visibility: 'hidden', height: '1em', marginBottom: 0 }}>
          Placeholder
        </p>
      )}


    </div>
  );
}
