export const iconsList = [
  "batman",
  "deathstroke",
  "greenlantern",
  "hulk",
  "ironman",
  "joker",
  "lexluthor",
  "magneto",
  "mystique",
  "spiderman",
  "superman",
  "thanos",
  "flash",
  "thor",
  "wolverine",
  "wonderwoman",
];

export function getShuffledIconsList() {
  const array = [...iconsList];
  return array.sort(() => Math.random() - 0.5);
}
