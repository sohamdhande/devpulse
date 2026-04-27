"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="border-b border-[#222] bg-dashboard-bg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-mono text-sm tracking-widest text-dim-text hover:text-brand-green transition-colors"
        >
          DEVPULSE
        </Link>

        {status !== "loading" && (
          <div>
            {session ? (
              <div className="flex items-center gap-6">
                <Link 
                  href={`/${session.username}`} 
                  className="font-mono text-sm text-dim-text hover:text-main-text transition-colors"
                >
                  {session.username}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="font-mono text-sm tracking-widest text-dim-text hover:text-brand-green transition-colors"
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="border border-[#333] px-4 py-2 font-mono text-sm tracking-widest hover:bg-main-text hover:text-black transition-colors"
              >
                SIGN IN
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
