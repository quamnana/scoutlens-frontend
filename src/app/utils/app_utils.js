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

export function getPositionTagColor(position) {
  let color;
  let _position;
  if (position === "GK") {
    color = "orange";
    _position = "Goalkeeper";
  } else if (["DF"].includes(position)) {
    color = "lime";
    _position = "Defender";
  } else if (["MF", "MFDF", "MFFW", "DFMF"]) {
    color = "gold";
    _position = "Midfielder";
  } else {
    color = "volcano";
    _position = "Forward";
  }

  return { color, _position };
}
