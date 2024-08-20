import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const news = await fotmob.getWorldNews();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching world news' });
  }
}
