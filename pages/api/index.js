import StationCongestion from '../components/StationCongestion';

export default function Home() {
  const stations = ['성신여대입구', '보문', '정릉'];
  
  return (
    <div>
      {stations.map(station => (
        <StationCongestion key={station} station={station} />
      ))}
    </div>
  );
}
