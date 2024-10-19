import { DashboardIcon, PrinterIcon, BuyPagesIcon, PrintingLogIcon, SettingIcon } from './icons';

export const studentSideBarLinks = [
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
    route: '/student/printinglog',
    label: 'Printing Log',
  },
  {
    icon: SettingIcon,
    route: '/student/settings',
    label: 'Settings',
  },
];
