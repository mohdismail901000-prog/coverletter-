import { Sidebar } from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">New Cover Letter</h1>
                    <UserButton afterSignOutUrl="/" />
                </header>
                <div className="flex-1 overflow-hidden p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
