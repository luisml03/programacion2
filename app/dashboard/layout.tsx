import type { Metadata } from 'next';
import { SidebarComponent } from '@/components/navComponents/Sidebar';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className="flex">
      <SidebarComponent />
      <div className="ml-64 flex-1 p-4 overflow-y-auto h-screen">
        {children}
      </div>
    </section>
	)
}
