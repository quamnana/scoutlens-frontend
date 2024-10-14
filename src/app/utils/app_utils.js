export async function getTeamAndPlayersTotals(data) {
  const totalTeams = data.reduce((sum, d) => sum + d.teams, 0);
  const totalPlayers = data.reduce((sum, d) => sum + d.players, 0);

  return { totalTeams, totalPlayers };
}

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export async function convertCountryNames(data) {
  const updatedData = data.map((d) => ({
    ...d,
    nation: countries.getName(d.nation, "en"), // Convert code to country name
  }));
  return updatedData;
}
