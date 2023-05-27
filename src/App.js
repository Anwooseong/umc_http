import React, { useEffect, useState } from 'react';
import classes from './App.module.css'
import Header from './Main/Header';
//tm : 날짜와 시간
//thema : 코스나 장소의 주제
//courseId : 코스의 고유 식별자인 코스 ID
//courseAreaId : 코스가 속한 지역의 고유 식별자인 코스 지역 ID
//courseAreaName : 코스가 속한 지역의 이름
//courseName : 코스의 이름
//spotAreaId : 해당 장소가 속한 지역의 고유 식별자인 장소 지역 ID
//spotName : 장소의 이름
//th3 : 온도
//wd : 풍향
//ws : 풍속
//sky : 하늘 상태, 일반적으로 1은 맑음
      //1: 맑음
      //2: 구름 조금
      //3: 구름 많음
      //4: 흐림
      //5: 비
      //6: 눈/비
      //7: 눈
//rhm : 상대 습도
//pop : 강수 확률

//serviceKey
//pageNo
//numOfRows
//dataType
//CURRENT_DATE
//HOUR
//COURSE_ID
//https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1?serviceKey=8IHrY9uE1sjBFggPsKwa2CZlUa50V%2Frqm9KqUsS5aYek74PDpApGWh3XGmXiZj1N1kCzckEnCWL2g0eJWidATg%3D%3D&pageNo=1&numOfRows=30&dataType=JSON&CURRENT_DATE=2023052610&HOUR=24&COURSE_ID=1
function App() {

  const serviceKey = '8IHrY9uE1sjBFggPsKwa2CZlUa50V%2Frqm9KqUsS5aYek74PDpApGWh3XGmXiZj1N1kCzckEnCWL2g0eJWidATg%3D%3D';
  const [parameter, setParameter] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (serviceKey, pageNo, numOfRows, CURRENT_DATE, COURSE_ID) => {
      const baseUrl = 'https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1'
      const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=JSON&CURRENT_DATE=${CURRENT_DATE}&HOUR=24&COURSE_ID=${COURSE_ID}`
      console.log(url)
      const response = await fetch(url, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('날씨 api 호출 에러');
      }

      try {
        const responseData = await response.json()
        console.log(responseData)
        const detailData = await responseData['response']['body']['items']
        console.log(detailData)
      } catch (error) {
        throw new Error('에러')
      }

    }

    fetchWeather(serviceKey, 1, 30, 2023052610, 1).catch((error) => {
      console.log(error.message)
      console.log('hi')
      setError(error.message);
    })
  }, [parameter])

  return (
    <div className={classes['blue']}>
      <Header />
      {/* <ul class={classes["dropdown"]}>
        <li class={classes["dropbtn"]}>드롭다운</li>
        <ul class={classes["dropdown-content"]}>
          <li>링크1</li>
          <li>링크2</li>
          <li>링크3</li>
        </ul>
      </ul>
      {error && <div>{error}</div>} */}
    </div>
  );
}

export default App;
