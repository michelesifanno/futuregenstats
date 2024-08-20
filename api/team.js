import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { teamId } = req.query;

  try {
    const teamData = await fotmob.getTeam(teamId);
    res.status(200).json(teamData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching team data' });
  }
}
