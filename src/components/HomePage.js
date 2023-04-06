import React, { useEffect } from 'react'
import ItemTable from './ItemTable';

const HomePage = () => {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
      })
  }, [])
  return (
    <div>
      <h3>Inventory:</h3>
      {items ? <ItemTable items={items} /> : <div>Loading...</div>}
    </div>
  )
}

export default HomePage