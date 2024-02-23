'use client'
import clsx from 'clsx';
import { useSidebarToggleContext } from '@/contexts/SidebarToggleContext';

export default function SiteNotice() {
    const { sidebarCollapse } = useSidebarToggleContext();

    const layoutClass = clsx('bg-danger text-white py-1 text-xs uppercase text-center ml-0', {
        'md:ml-20': sidebarCollapse,
        'md:ml-64': !sidebarCollapse,
      });

  return (
    <div className={layoutClass}>Beta: Data may be subject to change or loss.</div>
  );
}