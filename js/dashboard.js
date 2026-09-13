EcoShelf.requireAuth();
(function () {
  const user = EcoShelf.currentUser();
  document.getElementById("user-greeting").textContent = user.name.split(" ")[0];

  const items = EcoShelf.listProducts().filter((p) => !p.donated);
  const analyzed = items.map((p) => ({ p, a: EcoShelf.AI.analyze(p) }));
  const counts = { Safe: 0, Warning: 0, Critical: 0, Expired: 0 };
  analyzed.forEach(({ a }) => counts[a.risk]++);
  const donationCount = analyzed.filter((x) => x.a.donationCandidate).length;

  const stats = [
    { label: "Total Products", value: items.length, cls: "", hint: "Active items on your shelves" },
    { label: "Safe", value: counts.Safe, cls: "", hint: "Plenty of time left" },
    {
      label: "Expiring Soon",
      value: counts.Warning,
      cls: "warning",
      hint: "Plan a meal around these",
    },
    {
      label: "Critical / Expired",
      value: counts.Critical + counts.Expired,
      cls: "critical",
      hint: "Act today",
    },
    { label: "Donate", value: donationCount, cls: "donation", hint: "Good to give away" },
  ];
  document.getElementById("stat-grid").innerHTML = stats
    .map(
      (s) => `
    <article class="stat-card ${s.cls}">
      <span class="stat-label">${s.label}</span>
      <div class="stat-value">${s.value}</div>
      <p class="stat-hint">${s.hint}</p>
    </article>`,
    )
    .join("");

  const total = Math.max(1, items.length);
  const rows = [
    ["Safe", "safe"],
    ["Warning", "warning"],
    ["Critical", "critical"],
    ["Expired", "expired"],
  ];
  document.getElementById("risk-bars").innerHTML = rows
    .map(
      ([k, cls]) => `
    <div class="risk-bar ${cls}">
      <span>${k}</span>
      <div class="risk-bar-track"><div class="risk-bar-fill" style="width:${(counts[k] / total) * 100}%"></div></div>
      <span class="risk-bar-count">${counts[k]}</span>
    </div>`,
    )
    .join("");

  const feed = EcoShelf.listActivity().slice(0, 12);
  document.getElementById("activity-feed").innerHTML = feed.length
    ? feed
        .map((a) => `<li><span>${a.text}</span><time>${EcoShelf.fmtRelative(a.at)}</time></li>`)
        .join("")
    : '<li class="muted">No activity yet — add a product to get started.</li>';
})();
