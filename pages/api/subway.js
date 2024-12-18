import axios from 'axios';

export default async function handler(req, res) {
  const { station } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
  const url = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/5/${station}`;
  
  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}