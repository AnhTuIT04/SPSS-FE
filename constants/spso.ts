import { DashboardIcon, PrinterIcon, StudentIcon, ReportIcon, SettingIcon } from './icons';

export const spsoMenuItems = [
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

export const printData = [
  { date: '2024-10-26', value: 40, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-10-27', value: 55, fileType: 'DOCX', printer: 'Printer B' },
  { date: '2024-10-28', value: 30, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-10-29', value: 70, fileType: 'JPEG', printer: 'Printer C' },
  { date: '2024-10-30', value: 20, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-11-01', value: 65, fileType: 'DOCX', printer: 'Printer B' },
  { date: '2024-11-02', value: 45, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-11-03', value: 75, fileType: 'JPEG', printer: 'Printer A' },
  { date: '2024-11-04', value: 80, fileType: 'PDF', printer: 'Printer B' },
  { date: '2024-11-05', value: 50, fileType: 'DOCX', printer: 'Printer C' },
  { date: '2024-11-06', value: 60, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-11-07', value: 30, fileType: 'JPEG', printer: 'Printer B' },
  { date: '2024-11-08', value: 90, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-11-09', value: 35, fileType: 'DOCX', printer: 'Printer A' },
  { date: '2024-11-10', value: 50, fileType: 'PDF', printer: 'Printer B' },
  { date: '2024-11-11', value: 70, fileType: 'JPEG', printer: 'Printer A' },
  { date: '2024-11-12', value: 80, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-11-13', value: 45, fileType: 'DOCX', printer: 'Printer A' },
  { date: '2024-11-14', value: 65, fileType: 'PDF', printer: 'Printer B' },
  { date: '2024-11-15', value: 25, fileType: 'JPEG', printer: 'Printer C' },
  { date: '2024-11-16', value: 50, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-11-17', value: 90, fileType: 'DOCX', printer: 'Printer B' },
  { date: '2024-11-18', value: 55, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-11-19', value: 80, fileType: 'JPEG', printer: 'Printer A' },
  { date: '2024-11-20', value: 60, fileType: 'PDF', printer: 'Printer B' },
  { date: '2024-11-21', value: 40, fileType: 'DOCX', printer: 'Printer C' },
  { date: '2024-11-22', value: 30, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-11-23', value: 70, fileType: 'JPEG', printer: 'Printer B' },
  { date: '2024-11-24', value: 45, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-11-25', value: 85, fileType: 'DOCX', printer: 'Printer A' },
  { date: '2024-11-26', value: 75, fileType: 'PDF', printer: 'Printer B' },
  { date: '2024-11-27', value: 20, fileType: 'JPEG', printer: 'Printer C' },
  { date: '2024-11-28', value: 60, fileType: 'PDF', printer: 'Printer A' },
  { date: '2024-11-29', value: 50, fileType: 'DOCX', printer: 'Printer B' },
  { date: '2024-11-30', value: 40, fileType: 'PDF', printer: 'Printer C' },
  { date: '2024-12-01', value: 55, fileType: 'JPEG', printer: 'Printer A' },
];

export const paymentData = [
  { date: '2024-10-26', value: 40 },
  { date: '2024-10-27', value: 55 },
  { date: '2024-10-28', value: 30 },
  { date: '2024-10-29', value: 70 },
  { date: '2024-10-30', value: 20 },
  { date: '2024-11-01', value: 65 },
  { date: '2024-11-02', value: 45 },
  { date: '2024-11-03', value: 75 },
  { date: '2024-11-04', value: 80 },
  { date: '2024-11-05', value: 50 },
  { date: '2024-11-06', value: 60 },
  { date: '2024-11-07', value: 30 },
  { date: '2024-11-08', value: 90 },
  { date: '2024-11-09', value: 35 },
  { date: '2024-11-10', value: 50 },
  { date: '2024-11-11', value: 70 },
  { date: '2024-11-12', value: 80 },
  { date: '2024-11-13', value: 45 },
  { date: '2024-11-14', value: 65 },
  { date: '2024-11-15', value: 25 },
  { date: '2024-11-16', value: 50 },
  { date: '2024-11-17', value: 90 },
  { date: '2024-11-18', value: 55 },
  { date: '2024-11-19', value: 80 },
  { date: '2024-11-20', value: 60 },
  { date: '2024-11-21', value: 40 },
  { date: '2024-11-22', value: 30 },
  { date: '2024-11-23', value: 70 },
  { date: '2024-11-24', value: 45 },
  { date: '2024-11-25', value: 85 },
  { date: '2024-11-26', value: 75 },
  { date: '2024-11-27', value: 20 },
  { date: '2024-11-28', value: 60 },
  { date: '2024-11-29', value: 50 },
  { date: '2024-11-30', value: 40 },
  { date: '2024-12-01', value: 55 },
];

type PrintingLog = {
  id: String;
  name: string;
  date: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  printer: string;
  status: string;
};
