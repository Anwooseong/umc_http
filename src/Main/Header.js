import { useEffect, useState } from 'react';
import classes from './Header.module.css'
//pageNo
//numOfRows
//CURRENT_DATE
//COURSE_ID
const Header = (props) => {
    const selectList = ["apple", "banana", "grape", "orange"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

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

    return (
        <header>
            <form>
                <p>현재날짜와 시간 : {`${year}${month}${day}${hours}`}</p>
                <div>
                    <label htmlFor='pageNo'>페이지 번호</label>
                    <input type='text' id='pageNo' />
                </div>
                <div>
                    <label htmlFor='numOfRows'>첫 화면 보여줄 갯수</label>
                    <input type='text' id='numOfRows' />
                </div>
                <div>
        <select onChange={handleSelect} value={Selected}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <hr />
        <p>
          Selected: <b>{Selected}</b>
        </p>
      </div>
            </form>
        </header>
    )
}

export default Header