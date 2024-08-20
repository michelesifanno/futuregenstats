import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { matchId } = req.query;

  try {
    const matchDetails = await fotmob.getMatchDetails(matchId);
    res.status(200).json(matchDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching match details' });
  }
}
