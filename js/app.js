/* EcoShelf shared logic: storage, auth, products, activity, toasts. */
(function (global) {
  const KEYS = {
    users: "ecoshelf.users",
    session: "ecoshelf.session",
    products: "ecoshelf.products",
    activity: "ecoshelf.activity",
    seeded: "ecoshelf.seeded",
  };

  const read = (k, fb) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? fb;
    } catch {
      return fb;
    }
  };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // ---------- Auth ----------
  function signup(name, email, password) {
    if (!name || !email || !password) return { ok: false, error: "All fields are required." };
    if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Enter a valid email." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const users = read(KEYS.users, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "That email is already registered." };
    }
    const user = { id: crypto.randomUUID(), name, email, password };
    users.push(user);
    write(KEYS.users, users);
    write(KEYS.session, { userId: user.id, email: user.email, name: user.name });
    return { ok: true };
  }

  function login(email, password) {
    const users = read(KEYS.users, []);
    const u = users.find(
      (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password,
    );
    if (!u) return { ok: false, error: "Wrong email or password." };
    write(KEYS.session, { userId: u.id, email: u.email, name: u.name });
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(KEYS.session);
    location.href = "login.html";
  }
  function currentUser() {
    return read(KEYS.session, null);
  }

  function requireAuth() {
    if (!currentUser()) {
      location.href = "login.html";
    }
  }

  // ---------- Products ----------
  function listProducts() {
    const u = currentUser();
    return read(KEYS.products, []).filter((p) => !u || p.userId === u.userId);
  }

  function addProduct(data) {
    const u = currentUser();
    if (!u) return;
    const all = read(KEYS.products, []);
    const p = {
      id: crypto.randomUUID(),
      userId: u.userId,
      name: data.name,
      category: data.category,
      quantity: Number(data.quantity) || 1,
      unit: data.unit || "pcs",
      dateAdded: data.dateAdded,
      donated: false,
      createdAt: new Date().toISOString(),
    };
    all.push(p);
    write(KEYS.products, all);
    logActivity(`Added ${p.name} (${p.category})`);
    return p;
  }

  function updateProduct(id, patch) {
    const all = read(KEYS.products, []);
    const i = all.findIndex((p) => p.id === id);
    if (i < 0) return;
    all[i] = { ...all[i], ...patch };
    write(KEYS.products, all);
  }

  function deleteProduct(id) {
    const all = read(KEYS.products, []);
    const p = all.find((x) => x.id === id);
    write(
      KEYS.products,
      all.filter((x) => x.id !== id),
    );
    if (p) logActivity(`Removed ${p.name}`);
  }

  function findProduct(id) {
    return read(KEYS.products, []).find((p) => p.id === id);
  }

  // ---------- Activity ----------
  function logActivity(text) {
    const u = currentUser();
    if (!u) return;
    const all = read(KEYS.activity, []);
    all.unshift({ id: crypto.randomUUID(), userId: u.userId, text, at: new Date().toISOString() });
    write(KEYS.activity, all.slice(0, 100));
  }
  function listActivity() {
    const u = currentUser();
    return read(KEYS.activity, []).filter((a) => !u || a.userId === u.userId);
  }

  // ---------- Helpers ----------
  function fmtDate(d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }
  function fmtRelative(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.round(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return m + "m ago";
    const h = Math.round(m / 60);
    if (h < 24) return h + "h ago";
    const d = Math.round(h / 24);
    return d + "d ago";
  }

  // ---------- Toast ----------
  function toast(msg) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  // ---------- Seed demo data on first load ----------
  function seedIfNeeded() {
    if (localStorage.getItem(KEYS.seeded)) return;
    localStorage.setItem(KEYS.seeded, "1");
    const demoUser = {
      id: "demo-user",
      name: "Demo Grocer",
      email: "demo@ecoshelf.app",
      password: "demo123",
    };
    const users = read(KEYS.users, []);
    if (!users.some((u) => u.email === demoUser.email)) {
      users.push(demoUser);
      write(KEYS.users, users);
    }
    const today = new Date();
    const daysAgo = (n) => {
      const d = new Date(today);
      d.setDate(d.getDate() - n);
      return d.toISOString().slice(0, 10);
    };
    const seed = [
      { name: "Whole Milk", category: "Milk", quantity: 2, unit: "L", dateAdded: daysAgo(2) },
      {
        name: "Sourdough Loaf",
        category: "Bread",
        quantity: 1,
        unit: "loaf",
        dateAdded: daysAgo(4),
      },
      {
        name: "Baby Spinach",
        category: "Vegetables",
        quantity: 1,
        unit: "bag",
        dateAdded: daysAgo(5),
      },
      { name: "Apples", category: "Fruits", quantity: 6, unit: "pcs", dateAdded: daysAgo(1) },
      { name: "Ground Beef", category: "Meat", quantity: 500, unit: "g", dateAdded: daysAgo(1) },
      {
        name: "Free-range Eggs",
        category: "Eggs",
        quantity: 12,
        unit: "pcs",
        dateAdded: daysAgo(7),
      },
      {
        name: "Frozen Berries",
        category: "Frozen Food",
        quantity: 1,
        unit: "bag",
        dateAdded: daysAgo(20),
      },
      {
        name: "Canned Chickpeas",
        category: "Canned Food",
        quantity: 3,
        unit: "cans",
        dateAdded: daysAgo(30),
      },
      {
        name: "Orange Juice",
        category: "Beverages",
        quantity: 1,
        unit: "L",
        dateAdded: daysAgo(10),
      },
    ];
    const all = read(KEYS.products, []);
    seed.forEach((s) =>
      all.push({
        id: crypto.randomUUID(),
        userId: demoUser.id,
        donated: false,
        createdAt: new Date().toISOString(),
        ...s,
      }),
    );
    write(KEYS.products, all);
    const act = read(KEYS.activity, []);
    act.unshift({
      id: crypto.randomUUID(),
      userId: demoUser.id,
      text: "Seeded demo pantry",
      at: new Date().toISOString(),
    });
    write(KEYS.activity, act);
  }

  seedIfNeeded();

  global.EcoShelf = {
    signup,
    login,
    logout,
    currentUser,
    requireAuth,
    listProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    findProduct,
    logActivity,
    listActivity,
    fmtDate,
    fmtRelative,
    toast,
    AI: global.EcoShelfAI,
  };
})(window);
