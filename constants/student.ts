import { DashboardIcon, PrinterIcon, BuyPagesIcon, PrintingLogIcon, SettingIcon } from './icons';

export const studentMenuItems = [
  {
    icon: DashboardIcon,
    route: '/student/dashboard',
    label: 'Dashboard',
  },
  {
    icon: PrinterIcon,
    route: '/student/print',
    label: 'Print Docs',
  },
  {
    icon: BuyPagesIcon,
    route: '/student/buypages',
    label: 'Buy Pages',
  },
  {
    icon: PrintingLogIcon,
    route: '/student/log',
    label: 'Logs',
  },
  {
    icon: SettingIcon,
    route: '/student/settings',
    label: 'Settings',
  },
];

export const printers = [
  {
    id: 1,
    name: 'Máy in 1',
    location: 'Tầng 1',
    fileType: ['PDF', 'DOCX', 'JPEG'],
    status: 'Sẵn sàng',
  },
  { id: 2, name: 'Máy in 2', location: 'Tầng 2', fileType: ['PDF'], status: 'Sẵn sàng' },
  { id: 3, name: 'Máy in 3', location: 'Tầng 3', fileType: ['PDF', 'DOCX'], status: 'Đang bận' },
  {
    id: 4,
    name: 'Máy in 4',
    location: 'Tầng 4',
    fileType: ['PDF', 'DOCX', 'JPEG'],
    status: 'Sẵn sàng',
  },
  { id: 6, name: 'Máy in 5', location: 'Tầng 5', fileType: ['PDF', 'DOCX'], status: 'Sẵn sàng' },
  {
    id: 7,
    name: 'Máy in 1',
    location: 'Tầng 1',
    fileType: ['PDF', 'DOCX', 'JPEG'],
    status: 'Sẵn sàng',
  },
  { id: 8, name: 'Máy in 2', location: 'Tầng 2', fileType: ['PDF'], status: 'Sẵn sàng' },
];
