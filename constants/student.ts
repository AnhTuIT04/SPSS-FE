import { DashboardIcon, PrinterIcon, BuyPagesIcon, ProfileIcon } from './icons';

export const studentMenuItems = [
  {
    icon: DashboardIcon,
    route: '/student/dashboard',
    label: 'Dashboard',
  },
  {
    icon: PrinterIcon,
    route: '/student/print',
    label: 'Print',
  },
  {
    icon: BuyPagesIcon,
    route: '/student/buypages',
    label: 'Pages',
  },
  {
    icon: ProfileIcon,
    route: '/student/profile',
    label: 'Profile',
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
