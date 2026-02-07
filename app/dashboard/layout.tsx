import { Sidebar } from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#050505] text-white font-mono selection:bg-purple-500/30">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden border-l border-white/5 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                        {[...Array(144)].map((_, i) => (
                            <div key={i} className="border-r border-b border-white/10" />
                        ))}
                    </div>
                </div>

                <header className="h-16 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <h1 className="text-xs font-bold uppercase tracking-widest text-gray-400">CV-LDR Console / <span className="text-white">New Generation</span></h1>
                    </div>
                    <UserButton />
                </header>
                <div className="flex-1 overflow-hidden p-8 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
