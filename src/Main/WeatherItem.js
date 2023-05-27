import classes from './WeatherItem.module.css'

const WeatherItem = (props) => {
    return (
        <li className={classes.weather}>
            <div>
                <h3>{props.totalCityName}</h3>
                <div className={classes.tm}>{props.tm}</div>
                <div className={classes.kmaTci}>미세먼지 농도 → ({props.kmaTci})</div>
                <div className={classes.TCI_GRADE}>미세먼지 등급 - {props.TCI_GRADE}</div>
            </div>
        </li>
    )
}

export default WeatherItem