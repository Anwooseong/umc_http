import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch('https://apis.data.go.kr/1360000/TourStnInfoService1/getCityTourClmIdx1?serviceKey=8IHrY9uE1sjBFggPsKwa2CZlUa50V%2Frqm9KqUsS5aYek74PDpApGWh3XGmXiZj1N1kCzckEnCWL2g0eJWidATg%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&CURRENT_DATE=2018123110&DAY=3&CITY_AREA_ID=5013000000', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('날씨 api 호출 에러');
      }

      try {
        const responseData = await response.json()
        const detailData = await responseData['response']['body']['items']
        console.log(detailData)
      } catch (error) {
        throw new Error('에러')
      }

    }

    fetchWeather().catch((error) => {
      console.log(error.message)
      console.log('hi')
      setError(error.message);
    })
  }, [])

  return (
    <div>
      <h1>hello</h1>
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
