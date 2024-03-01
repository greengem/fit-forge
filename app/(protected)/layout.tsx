import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import ActiveWorkoutWarning from "@/components/Notices/ActiveWorkoutWarning";
import LayoutWrapper from "./LayoutWrapper.client";
import SiteNotice from "./SiteNotice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SiteNotice />
      <div className="flex grow">
        <Sidebar />
        <main className="flex flex-col grow w-full">
          <Navbar />
          <LayoutWrapper>
            <ActiveWorkoutWarning />
            {children}
          </LayoutWrapper>
        </main>
      </div>
    </ClerkProvider>
  );
}
