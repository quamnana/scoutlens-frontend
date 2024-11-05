const countries = require("i18n-iso-countries");

export async function getTeamAndPlayersTotals(data) {
  const totalTeams = data.reduce((sum, d) => sum + d.teams, 0);
  const totalPlayers = data.reduce((sum, d) => sum + d.players, 0);

  return { totalTeams, totalPlayers };
}

export async function convertCountryNames(data) {
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const updatedData = data.map((d) => ({
    ...d,
    nation: countries.getName(d.nation, "en"), // Convert code to country name
  }));
  return updatedData;
}

export function convertCountryName(countryCode) {
  // Register the locale for the "en" language
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const countryName = countries.getName(countryCode, "en");
  return countryName || countryCode;
}

export function getPositionTagColor(position) {
  let color;
  let _position;
  if (playerPositions["Goalkeeper"].includes(position)) {
    color = "orange";
    _position = position;
  } else if (playerPositions["Defender"].includes(position)) {
    color = "lime";
    _position = position;
  } else if (playerPositions["Midfielder"].includes(position)) {
    color = "gold";
    _position = position;
  } else {
    color = "volcano";
    _position = position;
  }

  return { color, _position };
}

export const playerPositions = {
  Goalkeeper: ["Goalkeeper"],
  Defender: ["Defender", "Fullback"],
  Midfielder: [
    "Midfielder",
    "Defensive Midfielder",
    "Wide Midfielder",
    "Attacking Midfielder",
  ],
  Forward: ["Attacker", "Winger"],
};
