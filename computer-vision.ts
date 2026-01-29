// Function simulating obstacle detection for autonomous car
export function getObstacleEvents() {
  // Randomly decide if obstacle is on the left or right
  const coinFlip = Boolean(Math.random() > 0.5);

  return {
    ObstacleLeft: coinFlip, // True if obstacle is on the left
    ObstacleRight: !coinFlip, // True if obstacle is on the right
  };
}