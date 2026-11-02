import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
