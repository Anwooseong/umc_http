import { useEffect, useState } from 'react';
import classes from './Header.module.css'
import Card from '../UI/Card';

//CURRENT_DATE, DAY, CITY_AREA_ID
// 3114000000	울산 남구
// 3117000000	울산 동구
// 3120000000	울산 북구
// 3171000000	울산 울주군
// 3111000000	울산 중구
const Header = (props) => {
  const selectList = [
    { 'id': 3114000000, 'cityName': '울산 남구' },
    { 'id': 3117000000, 'cityName': '울산 동구' },
    { 'id': 3120000000, 'cityName': '울산 북구' },
    { 'id': 3171000000, 'cityName': '울산 울주군' },
    { 'id': 3111000000, 'cityName': '울산 중구' },
  ];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [Selected, setSelected] = useState(selectList[0].id);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    const date = `${year}${month}${day}${hours}`
    props.getHttp(date, inputValue, Selected)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return (
    <div className={classes['outer-container']}>
      <Card>
        <form className={classes['form-container']} onSubmit={submitHandler}>
          <p>현재 시각 : {`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`}</p>
          <div>
            <label htmlFor='day'>예보 기간</label>
            <input className={`${classes['inner-container']} ${classes['input-tag']}`} type='number' id='day' value={inputValue} onChange={handleInputChange} /><span>일</span>
          </div>
          <div>
            <select onChange={handleSelect} value={Selected} className={`${classes['inner-container']} ${classes['select-tag']}`} >
              {selectList.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.cityName}
                </option>
              ))}
            </select>
          </div>
          <button onClick={props.logoutHandler} className={classes['logout']}>Logout</button>
          <button>Submit</button>
        </form>
      </Card>
    </div>
  )
}

export default Header