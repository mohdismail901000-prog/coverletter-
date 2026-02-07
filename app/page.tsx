import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-mono selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-purple-600 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-white -rotate-45" />
          </div>
          <span className="text-sm font-bold tracking-tighter uppercase">CoverLetterGen</span>
        </div>
        <nav className="flex items-center gap-6">
          {!userId ? (
            <SignInButton mode="modal">
              <button className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition">
                Authenticate
              </button>
            </SignInButton>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition"
              >
                Console
              </Link>
              <UserButton />
            </>
          )}
        </nav>
      </header>

      <main className="flex-1 relative flex flex-col items-start justify-center px-12 py-20 overflow-hidden">
        {/* Decorative Grid and Squares (Matching Screenshot) */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="grid grid-cols-6 grid-rows-10 gap-0 border-l border-b border-white/10 w-full h-full">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="border-r border-t border-white/10 flex items-center justify-center">
                {i === 12 && <div className="w-8 h-8 bg-purple-500 m-1" />}
                {i === 15 && <div className="w-8 h-8 bg-purple-600/50 m-1" />}
                {i === 28 && <div className="w-8 h-8 bg-teal-400 m-1" />}
                {i === 45 && <div className="w-8 h-8 bg-purple-800 m-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-2xl relative z-10">
          <div className="mb-8 space-y-1">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">15:42:00 INCOMING HTTP REQUEST DETECTED ...</p>
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">15:42:03 SERVICE WAKING UP ...</p>
            <p className="text-purple-400 text-xs uppercase tracking-[0.3em] font-bold">15:42:05 ALLOCATING COMPUTE RESOURCES ...</p>
          </div>

          <div className="mb-12">
            <pre className="text-purple-500 text-[8px] sm:text-[10px] leading-none opacity-80 mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              {`   _  _  ____  __    ___  _____  __  __  ____ 
  ( \\/ )(  __)(  )  / __)(  _  )(  \\/  )(  __)
   \\  /  ) _)  / (_/( (__  )(_)(  )    (  ) _) 
    \\/  (____)\\____/ \\___)(_____)(_/\\/\\/)(____)`}
            </pre>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 leading-none">
              Generation <span className="text-purple-500">Optimized</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg leading-relaxed uppercase tracking-wider">
              Viral cover letters forged in the latent space.
              Zero writer&apos;s block. Maximum signal strength.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {!userId ? (
              <SignInButton mode="modal">
                <button className="px-8 py-3 bg-white text-black text-xs uppercase font-bold tracking-widest hover:bg-purple-500 hover:text-white transition-all transform active:scale-95">
                  Execute Startup
                </button>
              </SignInButton>
            ) : (
              <Link href="/dashboard">
                <button className="px-8 py-3 bg-white text-black text-xs uppercase font-bold tracking-widest hover:bg-purple-500 hover:text-white transition-all transform active:scale-95">
                  Open Console
                </button>
              </Link>
            )}
            <div className="h-[1px] w-20 bg-white/20" />
            <span className="text-[10px] text-gray-600 uppercase tracking-widest animate-pulse">
              System Ready
            </span>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Steady hands. Clean logs. Your app is live ..</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-8 flex justify-between items-center border-t border-white/5 opacity-40">
        <div className="text-[10px] uppercase tracking-widest">© 2026 CV-LDR-GEN</div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest">
          <span className="hover:text-purple-400 cursor-pointer">Documentation</span>
          <span className="hover:text-purple-400 cursor-pointer">API Status</span>
        </div>
      </footer>
    </div>
  );
}
