import React, { useEffect, useState } from 'react';
import Header from './Main/Header';
import Items from './Main/Items';

function App() {

  const serviceKey = '8IHrY9uE1sjBFggPsKwa2CZlUa50V%2Frqm9KqUsS5aYek74PDpApGWh3XGmXiZj1N1kCzckEnCWL2g0eJWidATg%3D%3D';
  const [parameter, setParameter] = useState({ CURRENT_DATE: '', DAY: '', CITY_AREA_ID: '' })
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  const getHttpState = (currentDate, inputValue, Selected) => {
    setParameter((prev) => {
      console.log(currentDate)
      console.log(Selected)
      return { ...prev, CURRENT_DATE: currentDate, DAY: inputValue, CITY_AREA_ID: Selected }
    })
  }

  useEffect(() => {
    if (parameter.CURRENT_DATE !== '' && parameter.DAY !== '' && parameter.CITY_AREA_ID !== '') {
      const fetchWeather = async (serviceKey, CURRENT_DATE, DAY, CITY_AREA_ID) => {

        setIsLoading(true)
        const baseUrl = 'https://apis.data.go.kr/1360000/TourStnInfoService1/getCityTourClmIdx1'
        const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&dataType=JSON&CURRENT_DATE=${CURRENT_DATE}&DAY=${DAY}&CITY_AREA_ID=${CITY_AREA_ID}`
        console.log(url)
        const response = await fetch(url, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('지역 날씨 api 호출 에러');
        }

        try {
          const responseData = await response.json()
          console.log(responseData)
          const detailData = await responseData['response']['body']['items']['item']
          console.log(detailData)



          const loadedData = []
          for (const key in detailData) {
            loadedData.push({
              id: key,
              tm: detailData[key].tm,
              totalCityName: detailData[key].totalCityName,
              kmaTci: detailData[key].kmaTci,
              TCI_GRADE: detailData[key].TCI_GRADE,
            })
          }
          setItems(loadedData)
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          throw new Error('에러')
        }

      }

      fetchWeather(serviceKey, parameter.CURRENT_DATE, parameter.DAY, parameter.CITY_AREA_ID).catch((error) => {
        setIsLoading(false)
        setError(error.message);
      })
    }
  }, [parameter])

  return (
    <React.Fragment>
      <Header getHttp={getHttpState} />
      {isLoading && <p>Loading....</p>}
      {!isLoading && items !== null && <Items items={items} />}
      {error && <div>{error}</div>}
    </React.Fragment>
  );
}

export default App;
