'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import { metrics } from '@/data/metrics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';


const iconMap: Record<string, React.ReactNode> = {
  'Total Revenue': '💲',
  'Active Users': '👥',
  'Conversion Rate': '🎯',
  'Orders': '🛒',
  'Page Views': '🌐',
  'Performance Score': '⚡',
};

const tabList = [
  { label: 'Overview', icon: '📈' },
  { label: 'Performance', icon: '🚀' },
  { label: 'Team', icon: '👥' },
  { label: 'Goals', icon: '🎯' },
  { label: 'Alerts', icon: '⚠️' },
];

// Memoize the data to prevent re-renders
const revenueData = [
  { month: 'Jan', value: 180000 },
  { month: 'Feb', value: 190000 },
  { month: 'Mar', value: 200000 },
  { month: 'Apr', value: 215000 },
  { month: 'May', value: 230000 },
  { month: 'Jun', value: 240000 },
  { month: 'July', value: 244300 },
  { month: 'Aug', value: 249900 },
  { month: 'Sep', value: 240110 },
  { month: 'Oct', value: 240055 },
  { month: 'Nov', value: 210000 },
  { month: 'Dec', value: 340000 },
];

const trafficData = [
  { day: 'Mon', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Tue', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Wed', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Thu', IOS: 4000, Android: 3000, Web: 2500 },
  { day: 'Fri', IOS: 3500, Android: 3500, Web: 4000 },
  { day: 'Sat', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Sun', IOS: 5000, Android: 4000, Web: 3000 },
];

interface ConversionDataItem {
  name: string;
  value: number;
}

interface WeeklyPerformanceDataItem {
  day: string;
  IOS: number;
  Android: number;
  Web: number;
}

const conversionData: ConversionDataItem[] = [
  { name: 'Converted', value: 68 },
  { name: 'Abandoned Cart', value: 22 },
  { name: 'Bounced', value: 10 }
];

const weeklyPerformanceData: WeeklyPerformanceDataItem[] = [
  { day: 'Mon', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Tue', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Wed', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Thu', IOS: 4000, Android: 3000, Web: 2500 },
  { day: 'Fri', IOS: 3500, Android: 3500, Web: 4000 },
  { day: 'Sat', IOS: 3000, Android: 4000, Web: 2000 },
  { day: 'Sun', IOS: 5000, Android: 4000, Web: 3000 }
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
const platformColors = {
  IOS: '#FF6384',
  Android: '#36A2EB',
  Web: '#FFCE56'
};

// Create a separate component for the time display
const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="text-gray-600 text-sm">🕒 {currentTime}</div>;
};

// New approach for chart components
const ChartWrapper = ({ children, chartKey }: { children: React.ReactNode, chartKey: string }) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // This ensures animations only run on first mount
    initializedRef.current = true;
  }, []);

  return (
    <div 
      key={chartKey}
      className="w-full h-64"
    >
      {children}
    </div>
  );
};

// Simplified chart components without animation control
const RevenueChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#3b82f6" 
        dot 
        animationDuration={1500}
      />
    </LineChart>
  </ResponsiveContainer>
);

const TrafficChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={trafficData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Area 
        type="monotone" 
        dataKey="IOS" 
        stackId="1" 
        stroke="#f97316" 
        fill="#fcd34d" 
        animationDuration={1500}
      />
      <Area 
        type="monotone" 
        dataKey="Android" 
        stackId="1" 
        stroke="#10b981" 
        fill="#6ee7b7" 
        animationDuration={1500}
      />
      <Area 
        type="monotone" 
        dataKey="Web" 
        stackId="1" 
        stroke="#3b82f6" 
        fill="#93c5fd" 
        animationDuration={1500}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const ConversionChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={conversionData}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={80}
        paddingAngle={2}
        dataKey="value"
        label={false}
        animationDuration={1000}
        animationBegin={0}
        animationEasing="ease-out"
      >
        {conversionData.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </Pie>
      <Tooltip 
        formatter={(value) => [`${value}%`, 'Percentage']}
        contentStyle={{
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </PieChart>
  </ResponsiveContainer>
);

const PerformanceChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={weeklyPerformanceData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey="IOS" 
        fill={platformColors.IOS} 
        name="iOS" 
        animationDuration={1500}
      />
      <Bar 
        dataKey="Android" 
        fill={platformColors.Android} 
        name="Android" 
        animationDuration={1500}
      />
      <Bar 
        dataKey="Web" 
        fill={platformColors.Web} 
        name="Web" 
        animationDuration={1500}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="min-h-screen bg-white flex justify-center p-4">
      <div className="w-full max-w-[95vw] bg-[#EEF7FF] rounded-3xl">
        {/* Header */}
        <header className="w-full bg-white p-6 shadow-sm flex justify-between items-center flex-wrap gap-4 rounded-t-3xl">
          <h1 className="text-2xl font-bold text-black">
            Seregela Performance Hub{' '}
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm ml-2">Live</span>
          </h1>
          <div className="flex items-center gap-4">
            <TimeDisplay />
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:shadow text-black transition-shadow">
              Export Report
            </button>
          </div>
        </header>

        <div className="p-6 rounded-b-3xl">
          <section className="mb-4 max-w-full">
            <h2 className="text-xl font-semibold text-black">Performance Management Dashboard</h2>
            <p className="text-gray-600">
              Monitor, analyze, and optimize your business performance with real-time insights
            </p>
          </section>

          {/* Metrics grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="
                  rounded-xl
                  transform
                  transition-transform duration-300
                  shadow-lg
                  hover:shadow-xl
                  hover:scale-[1.03]
                "
              >
                <Card {...metric} icon={iconMap[metric.label] || ''} />
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex mt-10 w-full bg-gray-100 rounded-lg p-0.5">
            {tabList.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`
                  flex items-center gap-2 justify-center
                  px-4 py-1.5
                  flex-1
                  transition-all
                  duration-200
                  ${activeTab === tab.label 
                    ? 'bg-white text-black shadow-sm hover:translate-y-[-1px]' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  ${index !== tabList.length - 1 ? 'border-r border-gray-200' : ''}
                  rounded-[6px]
                `}
              >
                <span className="text-gray-400 text-sm">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Charts */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Revenue vs Target</h3>
                <ChartWrapper chartKey="revenue">
                  <RevenueChart />
                </ChartWrapper>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Traffic Sources</h3>
                <ChartWrapper chartKey="traffic">
                  <TrafficChart />
                </ChartWrapper>
              </div>
            </div>
          )}

          {activeTab === 'Performance' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Conversion Analysis</h3>
                <div className="w-full h-64 flex flex-col items-center">
                  <ChartWrapper chartKey="conversion">
                    <ConversionChart />
                  </ChartWrapper>
                  <div className="w-full flex justify-center mt-2">
                    <div className="flex flex-wrap justify-center gap-4">
                      {conversionData.map((item, index) => (
                        <div key={`legend-${index}`} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-xs text-gray-600">
                            {`${item.name}: ${item.value}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Weekly Performance by Platform</h3>
                <ChartWrapper chartKey="performance">
                  <PerformanceChart />
                </ChartWrapper>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}