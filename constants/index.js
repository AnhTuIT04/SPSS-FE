import { DashboardIcon, PrinterIcon, StudentIcon, ReportIcon, SettingIcon } from './icons';

export const sideBarLinks = [
  {
    icon: DashboardIcon,
    route: '/spso/dashboard',
    label: 'Dashboard',
  },
  {
    icon: PrinterIcon,
    route: '/spso/printer',
    label: 'Printer',
  },
  {
    icon: StudentIcon,
    route: '/spso/student',
    label: 'Student',
  },
  {
    icon: ReportIcon,
    route: '/spso/report',
    label: 'Report',
  },
  {
    icon: SettingIcon,
    route: '/spso/setting',
    label: 'Setting',
  },
];

export const dashboardCards = [
  {
    imgURL: '/assets/total_user.svg',
    label: 'Total User',
    statistic: '2,024',
    trend: 'up',
    trendValue: '8.5%',
  },
  {
    imgURL: '/assets/total_file.svg',
    label: 'Total File',
    statistic: '1,034',
    trend: 'up',
    trendValue: '1.3%',
  },
  {
    imgURL: '/assets/total_money.svg',
    label: 'Total Money',
    statistic: '$100,000',
    trend: 'down',
    trendValue: '4.3%',
  },
  {
    imgURL: '/assets/total_pending.svg',
    label: 'Total Pending',
    statistic: '2,040',
    trend: 'up',
    trendValue: '1.8%',
  },
];
