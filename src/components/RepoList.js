export default function RepoList({ repos }) {
  if (!repos?.length) return <div className="font-mono text-sm text-dim-text">No repositories found</div>;

  const itemClass = "group flex flex-col py-5 border-b border-[#222] hover:bg-white/[0.02] transition-colors sm:flex-row sm:items-baseline sm:justify-between px-3 -mx-3";

  return (
    <div className="flex flex-col">
      {repos.map((r) => (
        <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" className={itemClass}>
          <div className="flex flex-col sm:max-w-[70%]">
            <h4 className="font-mono text-base text-main-text group-hover:text-brand-green transition-colors text-ellipsis-custom">
              {r.name}
            </h4>
            {r.description && (
              <p className="mt-1.5 text-sm text-dim-text line-clamp-1">{r.description}</p>
            )}
          </div>

          <div className="mt-3 flex shrink-0 items-center gap-5 font-mono text-xs text-dim-text sm:mt-0">
            {r.language && <span>{r.language}</span>}
            <span title="Stars" className="group-hover:text-white transition-colors">
              ★ {r.stars.toLocaleString()}
            </span>
            <span title="Forks" className="group-hover:text-white transition-colors">
              ⑂ {r.forks.toLocaleString()}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
