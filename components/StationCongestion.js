import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const Container = styled.div`
  /* 기존 스타일 */
`;

const LikeButton = styled.button`
  background-color: ${props => (props.liked ? 'red' : '#ddd')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

function StationCongestion({ station }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/subway?station=${station}`);
        setData(response.data.realtimeArrivalList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [station]);

  return (
    <Container>
      <Title>{station} 역 혼잡도</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => (
          <CongestionItem key={index}>
            <p>{item.trainLineNm}</p>
            <p>도착 예정: {item.arvlMsg2}</p>
            <p>현재 위치: {item.arvlMsg3}</p>
          </CongestionItem>
        ))
      )}
      <LikeButton liked={liked} onClick={() => setLiked(!liked)}>
        {liked ? '좋아요 취소' : '좋아요'}
      </LikeButton>
    </Container>
  );
}

export default StationCongestion;