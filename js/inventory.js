EcoShelf.requireAuth();
(function () {
  const catSel = document.getElementById("filter-cat");
  EcoShelf.AI.categories().forEach((c) => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    catSel.appendChild(o);
  });

  const search = document.getElementById("search");
  const filterCat = document.getElementById("filter-cat");
  const filterRisk = document.getElementById("filter-risk");
  [search, filterCat, filterRisk].forEach((el) => el.addEventListener("input", render));

  function render() {
    const q = search.value.trim().toLowerCase();
    const fc = filterCat.value;
    const fr = filterRisk.value;
    const rows = EcoShelf.listProducts()
      .map((p) => ({ p, a: EcoShelf.AI.analyze(p) }))
      .filter(
        ({ p, a }) =>
          (!q || p.name.toLowerCase().includes(q)) &&
          (!fc || p.category === fc) &&
          (!fr || a.risk === fr),
      );

    document.getElementById("empty").hidden = rows.length > 0;
    document.getElementById("inv-body").innerHTML = rows
      .map(
        ({ p, a }) => `
      <tr${p.donated ? ' style="opacity:.55"' : ""}>
        <td><strong>${escapeHtml(p.name)}</strong>${p.donated ? ' <span class="muted small">(donated)</span>' : ""}</td>
        <td>${p.category}</td>
        <td>${p.quantity} ${p.unit}</td>
        <td>${EcoShelf.fmtDate(p.dateAdded)}</td>
        <td>${EcoShelf.fmtDate(a.expiryDate)} <span class="muted small">(${a.daysRemaining}d)</span></td>
        <td><div class="freshness-bar" style="width:120px"><span style="width:${a.freshnessPct}%"></span></div></td>
        <td><span class="risk-badge ${a.tagClass}">${a.risk}</span></td>
        <td>
          <div class="row-actions">
            ${!p.donated ? `<button class="icon-btn" data-donate="${p.id}">Donate</button>` : ""}
            <button class="icon-btn" data-edit="${p.id}">Edit</button>
            <button class="icon-btn danger" data-del="${p.id}">Delete</button>
          </div>
        </td>
      </tr>`,
      )
      .join("");

    document.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", () => {
        if (confirm("Delete this product?")) {
          EcoShelf.deleteProduct(b.dataset.del);
          render();
        }
      }),
    );
    document.querySelectorAll("[data-donate]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = EcoShelf.findProduct(b.dataset.donate);
        EcoShelf.updateProduct(b.dataset.donate, { donated: true });
        EcoShelf.logActivity(`Donated ${p.name}`);
        EcoShelf.toast("Marked as donated");
        render();
      }),
    );
    document.querySelectorAll("[data-edit]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = EcoShelf.findProduct(b.dataset.edit);
        const nq = prompt(`New quantity for ${p.name}:`, p.quantity);
        if (nq == null) return;
        const q = Number(nq);
        if (!Number.isFinite(q) || q < 0) return;
        EcoShelf.updateProduct(p.id, { quantity: q });
        EcoShelf.logActivity(`Updated ${p.name} → ${q} ${p.unit}`);
        render();
      }),
    );
  }

  function escapeHtml(s) {
    return s.replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  }
  render();
})();
