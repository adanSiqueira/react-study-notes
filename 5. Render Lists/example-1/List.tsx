type FoodItem = {
    id: number,
    name: string,
    calories: number
};

interface Props {
    items: Array<FoodItem>,
    category: string
};

function List(props: Props){

    const itemList = props.items;
    const category = props.category;
    
    const listItems = itemList.map(item => 
    <li key={item.id}>
        {item.name}: {item.calories} calories
    </li>
    );

    return (<>

    <h3>{category}</h3>
    <ol>{listItems}</ol>

    </>);
}

export default List;