import React, { useEffect, useState, useContext } from 'react'
import ItemTable from './ItemTable'
import { myContext } from '../App'

const PersonalInventory = () => {
  const [items, setItems] = useState([]);
  const { cookies , url} = useContext(myContext);
  
  useEffect(() => {
    getItems();
  }, [])

  const getItems = () => {
    fetch(`${url}/items/${cookies.auth}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
      }
      )
  }

  return (
    <div>
      <ItemTable items={items} userId={cookies.auth} getItems={getItems}/>
    </div>
  )
}

export default PersonalInventory