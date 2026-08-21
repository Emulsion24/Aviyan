import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

// IMPORTANT: Adjust this import path to point to where you saved the client component!
import ProtestRegistrationManagement from "@/component/ProtestRegistrationManagement";

export const metadata = {
  title: "Protest Registrations | Admin Dashboard",
};

export default async function AdminProtestPage() {
  /*
  |--------------------------------------------------------------------------
  | 1. SERVER-SIDE AUTHENTICATION CHECK
  |--------------------------------------------------------------------------
  | We check for the auth_token cookie on the server. If it doesn't exist,
  | the user is instantly redirected to the login page before the UI loads.
  */
  
  // ADDED AWAIT HERE FOR NEXT.JS 15+
  const cookieStore = await cookies(); 
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    // Redirect unauthorized users to your login page
    redirect("/login"); 
  }

  /*
  |--------------------------------------------------------------------------
  | 2. RENDER THE PROTECTED PAGE
  |--------------------------------------------------------------------------
  */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8 shadow-sm sticky top-0 z-[100]">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* LEFT: Back to Dashboard */}
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="group flex items-center gap-2 text-sm font-black text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl border border-gray-200/60"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>
          </div>

          {/* RIGHT: Admin Badge & Live Site Link */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-black text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg uppercase tracking-widest mr-2">
              <ShieldAlert size={16} />
              Secure Admin Area
            </div>

            <Link 
              href="/" 
              className="group flex items-center gap-2 text-sm font-black text-green-700 hover:text-green-800 transition-colors bg-green-50 hover:bg-green-100 px-4 py-2.5 rounded-xl border border-green-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">View Live Site</span>
            </Link>
          </div>

        </div>
      </nav>

      {/* MAIN COMPONENT AREA */}
      <div className="flex-1 w-full">
        <ProtestRegistrationManagement />
      </div>

    </div>
  );
}