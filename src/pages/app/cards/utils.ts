export function calculateValues(levels, initialProfit, initialUpgradePrice) {
  // Loop through each level object
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    console.log("level.price_multiplier", level.price_multiplier);

    // // For level 0, use the initial values
    if (level.level === 0) {
      level.upgrade_price = parseFloat(initialUpgradePrice);
      level.profit_per_hour = parseFloat(initialProfit);
      level.profit_per_hour_increase = parseFloat(initialProfit);
    }
    // For level 1, use the initial values
    else if (level.level === 1) {
      level.upgrade_price = parseFloat(initialUpgradePrice) * parseFloat(level.price_multiplier);
      level.profit_per_hour = parseFloat(initialProfit) + parseFloat(initialProfit) * parseFloat(level.profit_per_hour_multiplier);
      level.profit_per_hour_increase = parseFloat(initialProfit) * parseFloat(level.profit_per_hour_multiplier);;
    } else {
      // For subsequent levels, use the previous level's upgrade_price and profit_per_hour_increase
      const previousLevel = levels[i - 1];
      console.log("previousLevel", previousLevel);
      level.upgrade_price =
        previousLevel.upgrade_price +
        previousLevel.upgrade_price * previousLevel.price_multiplier;

      level.profit_per_hour =
        previousLevel.profit_per_hour +
        previousLevel.profit_per_hour * level.profit_per_hour_multiplier;

      level.profit_per_hour_increase =
        previousLevel.profit_per_hour * level.profit_per_hour_multiplier;
    }
  }

  return levels;
}
