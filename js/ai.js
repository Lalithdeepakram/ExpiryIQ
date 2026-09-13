/* EcoShelf AI — transparent, explainable rules engine.
 * Swap analyze() for a real ML model later without touching the UI. */
(function (global) {
  const SHELF_LIFE = {
    Milk: 3,
    Bread: 5,
    Fruits: 7,
    Vegetables: 5,
    Meat: 2,
    Eggs: 21,
    "Frozen Food": 90,
    Beverages: 30,
    Snacks: 60,
    "Canned Food": 180,
    Other: 14,
  };

  function shelfLifeFor(category) {
    return SHELF_LIFE[category] != null ? SHELF_LIFE[category] : SHELF_LIFE["Other"];
  }

  function daysBetween(a, b) {
    const ms = 1000 * 60 * 60 * 24;
    return Math.round((b.getTime() - a.getTime()) / ms);
  }

  function classify(daysRemaining, shelfLife) {
    if (daysRemaining < 0) return "Expired";
    // proportional thresholds so short-life items still get warnings
    const warnCut = Math.max(2, Math.round(shelfLife * 0.4));
    const critCut = Math.max(1, Math.round(shelfLife * 0.15));
    if (daysRemaining <= critCut) return "Critical";
    if (daysRemaining <= warnCut) return "Warning";
    return "Safe";
  }

  function tagClassFor(risk) {
    return { Safe: "", Warning: "amber", Critical: "rust", Expired: "ink" }[risk];
  }

  function analyze(product) {
    const shelfLife = shelfLifeFor(product.category);
    const added = new Date(product.dateAdded);
    const expiryDate = new Date(added.getTime());
    expiryDate.setDate(expiryDate.getDate() + shelfLife);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysRemaining = daysBetween(today, expiryDate);
    const risk = classify(daysRemaining, shelfLife);
    const freshnessPct = Math.max(0, Math.min(100, Math.round((daysRemaining / shelfLife) * 100)));
    const donationCandidate = (risk === "Warning" || risk === "Critical") && daysRemaining >= 0;
    return {
      shelfLife,
      expiryDate,
      daysRemaining,
      risk,
      freshnessPct,
      donationCandidate,
      tagClass: tagClassFor(risk),
    };
  }

  global.EcoShelfAI = {
    analyze,
    categories: () => Object.keys(SHELF_LIFE),
    shelfLifeFor,
  };
})(window);
