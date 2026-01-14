import List from './List';

function App() {

  const fruits = [{id: 1, name: 'Apple', calories: 95}, 
                    {id: 2, name: 'Banana', calories: 105}, 
                    {id: 3, name: 'Cherry', calories: 50}, 
                    {id: 4, name: 'Date', calories: 20}];

  const groceries = [{id: 1, name: 'Bread', calories: 80}, 
                      {id: 2, name: 'Milk', calories: 150}, 
                      {id: 3, name: 'Eggs', calories: 70}];


  return (
    <>
    <List items={fruits} category="Fruits" />
    <List items={groceries} category="Groceries" />
    </>

  );
}
 
export default App
