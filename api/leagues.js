import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
  try {
    const leagues = await fotmob.getAllLeagues();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leagues data' });
  }
}
