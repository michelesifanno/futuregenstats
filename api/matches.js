import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { date } = req.query;

  try {
    const matches = await fotmob.getMatchesByDate(date);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching matches data' });
  }
}
