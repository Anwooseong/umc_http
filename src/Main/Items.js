import Card from '../UI/Card'
import classes from './Items.module.css'
import WeatherItem from './WeatherItem'

const Items = (props) => {
    return (
        <div className={classes.weather}>
            <Card>
                <ul className={classes['ul-tag']}>
                    {props.items.map((item) => (
                        <WeatherItem
                            key={item.id}
                            id={item.id}
                            tm={item.tm}
                            totalCityName={item.totalCityName}
                            kmaTci={item.kmaTci}
                            TCI_GRADE={item.TCI_GRADE}
                        />
                    ))}
                </ul>
            </Card>
        </div>
    )
}

export default Items