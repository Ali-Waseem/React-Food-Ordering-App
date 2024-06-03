import { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import baseUrls from "../../baseUrls";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
    const [meals, setMealsList] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    
    //isLoading IS HANDLED BY YOUR CUSTOM HOOK. SINCE IT'S CUSTOM YOU CAN CONFIGURE AND RETURN ANYTHING FOR IT
    const { isLoading, sendRequest: getMeals } = useHttp()

    useEffect(() => {
    const getResultData = (resultData) => {
        const data = []
            for(const key in resultData) {
            data.push({
                id: key,
                name: resultData[key].name,
                description: resultData[key].description,
                price: resultData[key].price,
            })
        }
        setMealsList(data);
    }
        getMeals({
            url: baseUrls.fetchMealsUrl
        }, getResultData)
    
},[])

    return <Fragment>
        <section className={classes.meals}>
            <Card>
        {!isLoading && <ul>
            {meals.map(meal => 
                <MealItem 
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                />
            )}
        </ul>}
        {isLoading && <p>Please Wait...</p>}
            </Card>
            </section>
    </Fragment>
}
export default AvailableMeals;