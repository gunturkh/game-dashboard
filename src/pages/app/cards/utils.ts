export function calculateValues(levels, initialProfit, initialUpgradePrice) {
  // Loop through each level object
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    console.log("level.price_multiplier", level.price_multiplier);

    // For level 1, use the initial values
    if (level.level === 1) {
      level.upgrade_price = initialUpgradePrice * level.price_multiplier;
      level.profit_per_hour = initialProfit * level.profit_per_hour_multiplier;
      level.profit_per_hour_increase = level.profit_per_hour;
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
