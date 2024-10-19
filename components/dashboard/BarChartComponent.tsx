// components/BarChartComponent.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface BarChartComponentProps {
  data: { date: string; value: number, filetype: string, printer: string }[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <div className="w-full h-[500px] bg-white p-4 shadow-lg rounded-lg">
      <span className='font-semibold'><p>Printing Log</p></span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
