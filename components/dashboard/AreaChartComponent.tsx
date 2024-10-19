import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date: string;
  value: number;
  fileType: string;
  printer: string;
}

interface AreaChartProps {
  data: DataPoint[];
}

const AreaChartComponent: React.FC<AreaChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[500px] bg-white p-4 shadow-lg rounded-lg">
      <span className='font-semibold'><p>Payment Log</p></span>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <Tooltip />
          {/* <Legend /> */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="url(#colorUv)"
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
