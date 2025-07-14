// src/app/page.tsx


'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Card from '@/components/CardFullMonthComparison';
import { useRouter } from 'next/navigation';

// import { metrics } from '@/data/metrics'; // REMOVE UNUSED IMPORT

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
  'Target Revenue': '🎯',
  'Total Revenue': '💲',
  'Active Users': '👥',
  'Conversion Rate': '🎯',
  'Order Count': '🛒',
  'Page Views': '🌐',
  'Performance Score': '⚡',
  'New Users': '🆕',
};

const tabList = [
  { label: 'Overview', icon: '📈' },
  { label: 'Performance', icon: '🚀' },
  { label: 'Team', icon: '👥' },
  { label: 'Goals', icon: '🎯' },
  { label: 'Alerts', icon: '⚠️' },
];

// Memoize the data to prevent re-renders
// const revenueData = [
//   { month: 'Jan', value: 180000 },
//   { month: 'Feb', value: 190000 },
//   { month: 'Mar', value: 200000 },
//   { month: 'Apr', value: 215000 },
//   { month: 'May', value: 230000 },
//   { month: 'Jun', value: 240000 },
//   { month: 'July', value: 244300 },
//   { month: 'Aug', value: 249900 },
//   { month: 'Sep', value: 240110 },
//   { month: 'Oct', value: 240055 },
//   { month: 'Nov', value: 210000 },
//   { month: 'Dec', value: 340000 },
// ];

// const trafficData = [
//   { day: 'Mon', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Tue', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Wed', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Thu', IOS: 4000, Android: 3000, Web: 2500 },
//   { day: 'Fri', IOS: 3500, Android: 3500, Web: 4000 },
//   { day: 'Sat', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Sun', IOS: 5000, Android: 4000, Web: 3000 },
// ];

interface ConversionDataItem {
  name: string;
  value: number;
}

// interface WeeklyPerformanceDataItem {
//   day: string;
//   IOS: number;
//   Android: number;
//   Web: number;
// }

const conversionData: ConversionDataItem[] = [
  { name: 'Converted', value: 68 },
  { name: 'Abandoned Cart', value: 22 },
  { name: 'Bounced', value: 10 }
];

// const weeklyPerformanceData: WeeklyPerformanceDataItem[] = [
//   { day: 'Mon', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Tue', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Wed', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Thu', IOS: 4000, Android: 3000, Web: 2500 },
//   { day: 'Fri', IOS: 3500, Android: 3500, Web: 4000 },
//   { day: 'Sat', IOS: 3000, Android: 4000, Web: 2000 },
//   { day: 'Sun', IOS: 5000, Android: 4000, Web: 3000 }
// ];

const COLORS = ['#00BC86', '#FF9900', '#FF2F30'];
const platformColors = {
  IOS: '#FF9900',
  Android: '#00BA84',
  Web: '#0082F3'
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
const RevenueChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="month" 
        tick={{ fontSize: 12 }} 
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        name="Revenue"
        stroke="#3b82f6"
        dot
        animationDuration={1500}
      />
      <Line
        type="monotone"
        dataKey="target"
        name="Target"
        stroke="#f87171"
        strokeDasharray="5 5"
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const TrafficChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="day" 
        tick={{ fontSize: 12 }} 
      />
      <YAxis />
      <Tooltip />
      <Legend />
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

const PerformanceChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="month" 
        tick={{ fontSize: 12 }} 
      />
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


// Inside page.tsx (Option 1)
interface Metric {
  label: string;
  value: number;
  change: number;
  unit?: string;
  lastMonthValue?: number;
  thisMonthRange?: string; // formatted as (e.g., "Jul 1 – Jul 31")
  // lastMonthRange?: string; // formatted as (e.g., "Jul 1 – Jul 31")
}


export default function FullMonthComparison() {

  // 1. First state declarations
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Replace the any[] with Metric[]
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const router = useRouter();


  // Route Change
  const handleGoToMainDashboard = () => {
    router.push('/');
  };

  const handleGoToDateFilter = () => {
    router.push('/dateFilter');
  };



  // CHARTS (define these two new states)
  const [revenueChartData, setRevenueChartData] = useState<any[]>([]);
  const [trafficChartData, setTrafficChartData] = useState<any[]>([]);
  const [performanceChartData, setPerformanceChartData] = useState<any[]>([]);
  const [conversionData, setConversionData] = useState<any[]>([]);
  // FOR LOADING STATE
  const [loading, setLoading] = useState(false);  
  


  // 2. Then callback functions
  const fetchDashboardData = useCallback(async (token: string) => {
    // FOR LOADING STATE
    setLoading(true); // Start loading
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/dashboards/dashboard-count-one`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle unauthorized cases
      if (res.status === 401 || res.status === 403) {
        console.warn('Unauthorized access - redirecting to login:', {
          status: res.status,
        });
        router.push('/login');
        return;
      }

      // Handle other non-successful responses
      if (!res.ok) {
        const errorBody = await res.text(); // Optional: parse response error body safely
        // console.log('Dashboard fetch failed:', res.status, errorBody);
        console.warn('Dashboard fetch failed:', res.status, errorBody);
        router.push('/login');
        return;
      }
      
      const response = await res.json();
      const data = response.data;

      const formatDateRange = (start: string, end: string) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        const startDate = new Date(start).toLocaleDateString(undefined, options);
        const endDate = new Date(end).toLocaleDateString(undefined, options);
        return `(${startDate} – ${endDate})`;
      };


      const formattedMetrics: Metric[] = [
        {
          label: 'Target Revenue',
          value: parseFloat(data.target_revenue?.description.replace(/,/g, '')) || 0,
          change: 0,
          unit: 'Br',
        },
        {
          label: 'Total Revenue',
          value: data.total_revenue?.this_month ?? 0,
          change: data.total_revenue?.percentage_change ?? 0,
          lastMonthValue: data.total_revenue?.last_month,
          thisMonthRange: formatDateRange(data.total_revenue?.start_date, data.total_revenue?.end_date),
          // lastMonthRange: formatDateRange(data.total_revenue?.last_month_start, data.total_revenue?.last_month_end),
          unit: 'Br',
        },
        {
          label: 'Active Users',
          value: data.active_users?.this_month ?? 0,
          change: data.active_users?.percentage_change ?? 0,
          lastMonthValue: data.active_users?.last_month,
          thisMonthRange: formatDateRange(data.active_users?.start_date, data.active_users?.end_date),
          // lastMonthRange: formatDateRange(data.active_users?.last_month_start, data.active_users?.last_month_end),
        },
        {
          label: 'Order Count',
          value: data.order_count?.this_month ?? 0,
          change: data.order_count?.percentage_change ?? 0,
          lastMonthValue: data.order_count?.last_month,
          thisMonthRange: formatDateRange(data.order_count?.start_date, data.order_count?.end_date),
          // lastMonthRange: formatDateRange(data.order_count?.last_month_start, data.order_count?.last_month_end),
        },
        {
          label: 'Page Views',
          value: data.page_views?.this_month ?? 0,
          change: data.page_views?.percentage_change ?? 0,
          lastMonthValue: data.page_views?.last_month,
          thisMonthRange: formatDateRange(data.page_views?.start_date, data.page_views?.end_date),
          // lastMonthRange: formatDateRange(data.page_views?.last_month_start, data.page_views?.last_month_end),
        },
        {
          label: 'New Users',
          value: data.new_users_of_this_month.this_month ?? 0,
          change: data.new_users_of_this_month?.percentage_change ?? 0,
          lastMonthValue: data.new_users_of_this_month?.last_month,
          thisMonthRange: formatDateRange(data.new_users_of_this_month?.start_date, data.new_users_of_this_month?.end_date),
          // lastMonthRange: formatDateRange(data.new_users_of_this_month?.last_month_start, data.new_users_of_this_month?.last_month_end),
        }
      ];

      setMetrics(formattedMetrics);


      


      // 1. Parse revenue trend for chart
      const trend = data.monthly_revenue_trend.map((item: any) => ({
        month: item.label,
        value: item.total,
        target: parseFloat(data.target_revenue?.description.replace(/,/g, '')) || 0, // same target for all months
      }));

      // 2. Parse traffic sources for last 7 days
      const traffic = data.traffic_breakdown_of_the_last_seven_days.map((item: any) => ({
        day: item.date,
        IOS: item.apple ?? item.ios ?? 0, // fallback to 'apple' if 'ios' is missing
        Android: item.android ?? 0,
        Web: item.web ?? 0,
      }));

      // 3. Parse traffic sources for last 12 months
      const performance = data.traffic_breakdown_of_the_last_twelve_months.map((item: any) => ({
        month: item.label,
        IOS: item.apple ?? item.ios ?? 0, 
        Android: item.android ?? 0,
        Web: item.web ?? 0,
      }));


      // 4. order status counts
      const conversion = Object.entries(data.order_statuses).map(([key, value]) => ({
        name: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // e.g. "converted_orders" → "Converted Orders"
        value: value,
      }));



      setRevenueChartData(trend);
      setTrafficChartData(traffic);
      setPerformanceChartData(performance);
      setConversionData(conversion);



    } catch (err) {
      console.warn(err);
      router.push('/login');
    } finally {
     
      // FOR LOADING STATE
      setLoading(false); // Stop loading in all cases
    }
  }, [router]);


  // 3. Then effects
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token || typeof token !== 'string') {
      console.warn('Invalid or missing token');
      router.push('/login');
      return;
    }

    fetchDashboardData(token);

  }, [fetchDashboardData, router]); // <- both are dependencies here



  // refresh page // rerender page
  const handleRefresh = () => {
  const token = localStorage.getItem('authToken');
  if (token && typeof token === 'string') {
      fetchDashboardData(token);
    } else {
      router.push('/login');
    }
  };



  /**
   * NOT used BECAUSE: Export should be done from the backend - USING the data directly from the DATABASE
   */
  const exportMetricsToCSV = () => {
    const headers = ['Label', 'Value', 'Change', 'Last Month', 'Date Range', 'Unit'];
    const rows = metrics.map(metric => [
      metric.label,
      metric.value,
      metric.change,
      metric.lastMonthValue ?? '',
      metric.thisMonthRange ?? '',
      // metric.lastMonthRange ?? '',
      metric.unit ?? '',
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dashboard_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  




  return (
    <main className="min-h-screen bg-white flex justify-center p-4">
      <div className="w-full max-w-[95vw] bg-[#EEF7FF] rounded-3xl transition-shadow duration-300 hover:shadow-2xl">
        {/* Header */}
        <header className="w-full bg-white p-6 shadow-sm flex justify-between items-center flex-wrap gap-4 rounded-t-3xl">
          <h1 className="text-2xl font-bold text-black">
            Seregela Performance Hub{' '}
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm ml-2">Live</span>
          </h1>
          <div className="flex items-center gap-4">

          <TimeDisplay />

          <button
            onClick={handleRefresh}
            disabled={loading} // FOR LOADING STATE
                className={`px-4 py-2 rounded-md transition text-white ${
                    loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                >

                {/* // FOR LOADING STATE */}
                {/* NORMAL LOADING */}
                {/* {loading ? 'Refreshing...' : 'Refresh Data'} */}


                {/* // FOR LOADING STATE */}
                {/* LOADING USING SPINNER */}
                {loading ? (
                    <span className="flex items-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        />
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    Refreshing...
                    </span>
                ) : (
                    'Refresh Data'
                )}
          </button>          

          {/* <button
            onClick={exportMetricsToCSV}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:shadow text-black transition-shadow"
          >
            Export Report
          </button> */}


          <div className="p-4">
            <button
              onClick={handleGoToDateFilter}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              <span role="img" aria-label="calendar">📅</span>
              More
            </button>
          </div>

          <div className="p-4">
            <button
              onClick={handleGoToMainDashboard}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              <span role="img" aria-label="calendar"></span>
              Main Dashboard
            </button>
          </div>


          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              router.push('/login');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
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
          <h4 className="font-bold my-2 text-black">This Month Values</h4>
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
                  <RevenueChart data={revenueChartData} />
                </ChartWrapper>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Traffic Sources</h3>
                <ChartWrapper chartKey="traffic">
                  <TrafficChart data={trafficChartData} />
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
                            {`${item.name}: ${item.value}`}
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
                <PerformanceChart data={performanceChartData} />
              </ChartWrapper>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}