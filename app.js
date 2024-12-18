const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // 정적 파일 제공

const PORT = process.env.PORT || 3000;

// 서울시 공공데이터 API 키와 기본 URL 설정
const API_KEY = '4c757a466772796738376651577744';
const API_URL = 'http://swopenAPI.seoul.go.kr/api/subway';

// 역 목록 및 실시간 정보 엔드포인트
const stations = ['성신여대입구', '보문', '정릉'];

app.get('/api/subway', async (req, res) => {
  try {
    const results = await Promise.all(
      stations.map(station =>
        axios.get(`${API_URL}/${API_KEY}/json/realtimeStationArrival/0/5/${encodeURIComponent(station)}`)
      )
    );

    const data = results.map(result => result.data.realtimeArrivalList);
    res.json({ stations, data });
  } catch (error) {
    console.error('Error fetching subway data:', error.message);
    res.status(500).json({ error: 'Failed to fetch subway data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});