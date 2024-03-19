function totalCostPerUnitFromWarehouse(weight) {
  const quotient = Math.floor(weight / 5);
  const remainder = weight % 5;

  if (weight <= 5) {
    return 10;
  }

  let totalCostPerUnit = 10 + (quotient - 1) * 8;
  if (remainder) {
    totalCostPerUnit += 8;
  }
  return totalCostPerUnit;
}

function calculateWeightArray(order) {
  const productWeights = {
    A: 3,
    B: 2,
    C: 8,
    D: 12,
    E: 25,
    F: 15,
    G: 0.5,
    H: 1,
    I: 2,
  };

  const weightArray = [];
  ["ABC", "DEF", "GHI"].forEach((group, index) => {
    weightArray.push(
      group
        .split("")
        .reduce(
          (sum, product) =>
            sum + (order[product] || 0) * productWeights[product],
          0
        )
    );
  });
  return weightArray;
}

function calculateCostArray(weightArray) {
  const costArray = [];
  weightArray.forEach((weight) => {
    const cost = totalCostPerUnitFromWarehouse(weight);
    costArray.push(cost);
  });
  return costArray;
}

function calculateFinalCost(order) {
  const distance = [3, 2.5, 2];
  const normalCost = [0, 25, 20];

  const weightArray = calculateWeightArray(order);
  const costArray = calculateCostArray(weightArray);

  let totalCost = 0;
  weightArray.forEach((weight, index) => {
    if (weight !== 0) {
      totalCost +=
        Math.floor(costArray[index] * distance[index]) + normalCost[index];
    }
  });
  return totalCost;
}

module.exports = { calculateFinalCost };
