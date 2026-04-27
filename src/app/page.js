"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.username) router.push(`/${session.username}`);
  }, [session, router]);

  const btnClass = "border border-[#333] px-6 py-2 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-white hover:text-black";

  return (
    <div className="relative flex min-h-screen flex-col bg-grid bg-background selection:bg-brand-green selection:text-black">
      <header className="flex w-full items-center justify-between p-6 z-10 md:p-10">
        <div className="font-mono text-sm text-dim-text">DevPulse</div>
        <div>
          {status !== "loading" && !session ? (
            <button onClick={() => signIn("github")} className={btnClass}>
              Sign In
            </button>
          ) : (
            <div className="font-mono text-sm text-dim-text">...</div>
          )}
        </div>
      </header>

      <main className="flex flex-1 items-center px-6 md:px-20 z-10">
        <div className="max-w-4xl text-left">
          <h1 className="font-mono text-5xl font-bold leading-[1.1] md:text-8xl">
            Your GitHub, <br />
            actually <span className="text-brand-green">readable.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-dim-text">
            Contribution trends, language stats, and repo insights — in one shareable URL.
          </p>
        </div>
      </main>

      <footer className="p-6 md:p-10 z-10">
        <div className="font-mono text-xs text-dim-text">devpulse.dev</div>
      </footer>
    </div>
  );
}
