import Image from "next/image";
import {
  fetchUserProfile,
  fetchUserRepos,
  calculateStats,
  aggregateLanguages,
  fetchContributions,
  getTopRepos,
} from "@/lib/github";
import StatCard from "@/components/StatCard";
import LanguageChart from "@/components/LanguageChart";
import ContributionChart from "@/components/ContributionChart";
import RepoList from "@/components/RepoList";

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `${username} | DevPulse`,
    description: `GitHub analytics for ${username}`,
  };
}

export default async function DashboardPage({ params }) {
  const { username } = await params;

  let profile, repos, stats, langs, contributions, topRepos;

  try {
    [profile, repos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepos(username),
    ]);

    stats = calculateStats(repos);
    langs = aggregateLanguages(repos);
    topRepos = getTopRepos(repos);
    contributions = await fetchContributions(username);
  } catch {
    return (
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center p-6">
        <div className="font-mono text-xl text-dim-text">404_USER_NOT_FOUND</div>
      </div>
    );
  }

  const avatarClasses = "w-full max-w-[240px] border border-[#222] grayscale hover:grayscale-0 transition-all duration-500 object-cover";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      <div className="flex flex-col gap-16 md:flex-row md:gap-24">
        
        <aside className="w-full shrink-0 md:w-1/3 lg:w-1/4">
          <div className="flex flex-col gap-8">
            <Image
              src={profile.avatar_url}
              alt={profile.login}
              width={240}
              height={240}
              className={avatarClasses}
              unoptimized
            />
            
            <div>
              <h1 className="font-mono text-2xl font-bold">{profile.name || profile.login}</h1>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-brand-green hover:underline"
              >
                @{profile.login}
              </a>
            </div>

            {profile.bio && (
              <p className="text-sm text-dim-text leading-relaxed">{profile.bio}</p>
            )}

            <div className="font-mono text-xs text-dim-text space-y-1.5">
              <div>{profile.followers} followers</div>
              <div>{profile.following} following</div>
              <div>{profile.public_repos} repos</div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-20 overflow-hidden">
          
          <section className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard label="STARS" value={stats.totalStars} />
            <StatCard label="FORKS" value={stats.totalForks} />
            <StatCard label="REPOS" value={profile.public_repos} />
            <StatCard label="FOLLOWERS" value={profile.followers} />
          </section>

          <section className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-dim-text">
                Top Languages
              </h2>
              <LanguageChart data={langs} />
            </div>
            <div>
              <h2 className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-dim-text">
                Monthly Contributions
              </h2>
              <ContributionChart data={contributions} />
            </div>
          </section>

          <section>
            <h2 className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-dim-text">
              Top Repositories
            </h2>
            <RepoList repos={topRepos} />
          </section>

        </div>
      </div>
    </div>
  );
}
