import React, { useEffect, useState } from 'react';
import Header from './Main/Header';
import Items from './Main/Items';
import classes from './App.module.css'

function App() {

  const serviceKey = '8IHrY9uE1sjBFggPsKwa2CZlUa50V%2Frqm9KqUsS5aYek74PDpApGWh3XGmXiZj1N1kCzckEnCWL2g0eJWidATg%3D%3D';
  const [parameter, setParameter] = useState({ CURRENT_DATE: '', DAY: '', CITY_AREA_ID: '' })
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getHttpState = (currentDate, inputValue, Selected) => {
    setParameter((prev) => {
      console.log(currentDate)
      console.log(Selected)
      return { ...prev, CURRENT_DATE: currentDate, DAY: inputValue, CITY_AREA_ID: Selected }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // 토큰이 존재하는 경우 서버로 토큰 유효성 검사 요청을 보낸다고 가정
      validateToken(token)
        .then((response) => {
          if (response.valid) {
            setLogin(true); // 토큰이 유효하면 로그인 상태로 설정
          } else {
            localStorage.removeItem('jwt'); // 토큰이 유효하지 않으면 삭제
          }
        })
        .catch((error) => {
          console.log('토큰 유효성 검사 오류:', error);
        });
    }
  }, [])

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



  const loginHandler = () => {
    const jwt = 'my_token';
    localStorage.setItem('jwt', jwt)
    setLogin(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('jwt');
    setLogin(false)
  }

  const userNameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const validateToken = (token) => {
    // 서버로 토큰 유효성 검사 요청을 보내는 함수
    return new Promise((resolve, reject) => {
      // 토큰 유효성 검사 로직 구현
      // 예제에서는 간단히 토큰이 유효하다고 가정
      setTimeout(() => {
        resolve({ valid: true });
      }, 1000);
    });
  };

  if (!login) {
    return (
      <div className={classes['modal']}>
        <div className={classes['form-container']}>
          <input
            className={`${classes['inner-container']} ${classes['input-tag']}`}
            type="text"
            placeholder="아이디"
            value={username}
            onChange={userNameHandler}
          />
          <input
            className={`${classes['inner-container']} ${classes['input-tag']}`}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={passwordHandler}
          />
          <button onClick={loginHandler}>로그인</button>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Header getHttp={getHttpState} logoutHandler={logoutHandler} />
      {isLoading && <p>Loading....</p>}
      {!isLoading && items !== null && <Items items={items} />}
      {error && <div>{error}</div>}
    </React.Fragment>
  );
}

export default App;
