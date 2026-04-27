import { Octokit } from "@octokit/rest";
import { graphql } from "@octokit/graphql";

const createClient = (token) => new Octokit(token ? { auth: token } : {});

export async function fetchUserProfile(username, token) {
  const { data } = await createClient(token).users.getByUsername({ username });

  return {
    login: data.login,
    name: data.name,
    bio: data.bio,
    avatar_url: data.avatar_url,
    followers: data.followers,
    following: data.following,
    public_repos: data.public_repos,
    html_url: data.html_url,
  };
}

export async function fetchUserRepos(username, token) {
  const octokit = createClient(token);
  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username,
    type: "owner",
    sort: "updated",
    per_page: 100,
  });

  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export const calculateStats = (repos) => {
  let totalStars = 0;
  let totalForks = 0;

  for (const r of repos) {
    totalStars += r.stargazers_count || 0;
    totalForks += r.forks_count || 0;
  }

  return { totalStars, totalForks };
};

export const aggregateLanguages = (repos) => {
  const langs = {};

  for (const r of repos) {
    if (r.language) {
      langs[r.language] = (langs[r.language] || 0) + 1;
    }
  }

  return Object.entries(langs)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

export async function fetchContributions(username) {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString();
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

  const months = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months[k] = {
      month: d.toLocaleString("default", { month: "short" }),
      commits: 0,
    };
  }

  try {
    const gql = graphql.defaults({
      headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
    });

    const { user } = await gql(`
      {
        user(login: "${username}") {
          contributionsCollection(from: "${from}", to: "${to}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `);

    const { weeks } = user.contributionsCollection.contributionCalendar;
    for (const w of weeks) {
      for (const d of w.contributionDays) {
        const k = d.date.slice(0, 7);
        if (months[k]) months[k].commits += d.contributionCount;
      }
    }
  } catch (err) {
    console.error("GraphQL contributions error:", err.message);
  }

  return Object.values(months);
}

export const getTopRepos = (repos) => repos.slice(0, 5).map((r) => ({
  name: r.name,
  description: r.description,
  stars: r.stargazers_count,
  forks: r.forks_count,
  language: r.language,
  html_url: r.html_url,
}));
