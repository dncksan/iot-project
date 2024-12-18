const API_URL = '/api/subway';

async function fetchSubwayData() {
  try {
    const response = await fetch(API_URL);
    const { stations, data } = await response.json();

    const container = document.getElementById('stations');
    container.innerHTML = ''; // 기존 내용을 초기화

    stations.forEach((station, index) => {
      const arrivals = data[index];
      const stationDiv = document.createElement('div');
      stationDiv.className = 'bg-white p-4 rounded shadow';

      const stationName = document.createElement('h2');
      stationName.className = 'text-xl font-bold mb-2';
      stationName.textContent = station;

      stationDiv.appendChild(stationName);

      arrivals.forEach(arrival => {
        const arrivalInfo = document.createElement('p');
        arrivalInfo.textContent = `${arrival.trainLineNm} - ${arrival.arvlMsg2}`;
        stationDiv.appendChild(arrivalInfo);
      });

      container.appendChild(stationDiv);
    });
  } catch (error) {
    console.error('Error fetching subway data:', error.message);
  }
}

// 실시간 데이터 업데이트
setInterval(fetchSubwayData, 60000); // 매 1분마다 업데이트
fetchSubwayData();