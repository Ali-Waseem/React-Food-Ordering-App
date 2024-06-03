import { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import baseUrls from "../../baseUrls";

const AvailableMeals = () => {
    const [meals, setMealsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const getMeals = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(baseUrls.fetchMealsUrl,{});
        if(!response.ok) {
            throw new Error('Request Failed');
        }
        const responseData = await response.json();
        const data = [];
        
        for(const key in responseData) {
            data.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
            })
        }
        setMealsList(data);
        setIsLoading(false);
    },[])


    useEffect(() => {
        getMeals()
        .catch(error => {
            console.log(error);
        });
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