import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold text-gray-900">CoverLetterGen</span>
        </div>
        <nav className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Log In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 mr-4"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-4xl">
          Generate <span className="text-blue-600">Viral Cover Letters</span>{" "}
          in Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Stop staring at a blank screen. Paste your resume and the job
          description, and let our advanced AI write a compelling, unique cover
          letter that gets you hired.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started for Free
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Go to Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Feature Grid / Social Proof (Placeholder) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-left px-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              ✨
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI-Powered Magic
            </h3>
            <p className="text-gray-600">
              Uses GPT-5 class models to analyze your resume and match it
              perfectly to the job requirements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              🚀
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Instant Generation
            </h3>
            <p className="text-gray-600">
              Get a complete, formatted letter in under 10 seconds. No more
              writer's block.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
              💾
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Save & Manage
            </h3>
            <p className="text-gray-600">
              Keep track of all your applications in one secure dashboard.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-100">
        © {new Date().getFullYear()} CoverLetterGen. All rights reserved.
      </footer>
    </div>
  );
}
