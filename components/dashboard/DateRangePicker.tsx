'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';
import { subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangePicker = () => {
    'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';
import { subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { printData } from '@/constants/spso';
import LineChart from './LineChart';
import { Bar } from 'react-chartjs-2';
import BarChart from './BarChart';
import BarChartComponent from './BarChartComponent';

  return (
    <div>DateRangePicker</div>
  )
}

export default DateRangePicker