/* Injects the shared navbar into #navbar-root on every page. */
(function () {
  function render() {
    const root = document.getElementById("navbar-root");
    if (!root) return;
    const user = EcoShelf.currentUser();
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    const link = (href, label) => {
      const active = href.toLowerCase() === page ? ' class="active"' : "";
      return `<li><a href="${href}"${active}>${label}</a></li>`;
    };

    const links = user
      ? `
      ${link("dashboard.html", "Dashboard")}
      ${link("inventory.html", "Inventory")}
      ${link("add-product.html", "Add Product")}
      ${link("donation.html", "Donations")}
    `
      : `
      ${link("index.html", "Home")}
    `;

    const auth = user
      ? `<span class="nav-user">${user.name}</span>
         <button class="btn btn-ghost btn-sm" id="logout-btn" style="color:var(--cream);border-color:var(--cream)">Logout</button>`
      : `<a href="login.html">Login</a><a href="signup.html" class="btn btn-primary btn-sm">Sign up</a>`;

    root.innerHTML = `
      <nav class="navbar" aria-label="Primary">
        <a class="brand" href="${user ? "dashboard.html" : "index.html"}">EcoShelf</a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-auth">${auth}</div>
      </nav>`;

    const btn = document.getElementById("logout-btn");
    if (btn) btn.addEventListener("click", EcoShelf.logout);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
