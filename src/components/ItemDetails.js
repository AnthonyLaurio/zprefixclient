import React, { useState, useRef } from 'react'
import '../stylesheets/ItemDetails.css'

const ItemDetails = ({ item, setDetails, userId, handleDelete, getItems}) => {
  const [edit, setEdit] = useState(false);
  const editedItem = useRef({id: item.id, userId: userId, name: item.name, description: item.description, quantity: item.quantity });

  const handleEdit = () => {
    fetch(`http://localhost:3001/items`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedItem.current)
    })
      .then(res => res.json())
      .then(data => {
        getItems();
        setDetails(editedItem.current)
        setEdit(false);
      })
  }


  const setupEdit = () => {
    editedItem.current = {id: item.id, userId: userId, name: item.name, description: item.description, quantity: item.quantity };
    setEdit(true);
  }

  if (`${item.userId}` === userId) {
    if (!edit) {
      return (
        <div className='details-box bg-dark text-light d-flex flex-column align-items-center'>
          <h3>{item.name}</h3>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Description:</strong></p>
          <p className='details-description mb-3 text-center'>{item.description}</p>
          <div className='d-flex flex-row w-75 justify-content-evenly'>
          <button className='btn details-button btn-primary' onClick={() => setDetails({})}>Back</button>
          <button className='btn details-button btn-warning' onClick={() => setupEdit()}>Edit</button>
          <button className='btn details-button btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      )
    } else {
      return (
      <div className='details-box bg-dark text-light d-flex flex-column align-items-center'>
        <input type='text' className='form-control w-50' defaultValue={item.name} onChange={(e) => { editedItem.current.name = e.target.value }} />
        <p><strong>Quantity:</strong></p>
        <input type='text' className='form-control w-25' defaultValue={item.quantity} onChange={(e) => { editedItem.current.quantity = e.target.value }} />
        <p><strong>Description:</strong></p>
        <textarea rows='5' cols='50' className='mb-3 text-description' onChange={(e) => {editedItem.current.description = e.target.value}} defaultValue={item.description}></textarea>
        <div className='d-flex flex-row w-75 justify-content-evenly'>
        <button className='btn details-button btn-primary' onClick={() => setEdit(false)}>Cancel</button>
        <button className='btn details-button btn-success' onClick={() => handleEdit()}>Save</button>
        <button className='btn details-button btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
      )
    }

  } else {
    return (
      <div className='details-box bg-dark text-light d-flex flex-column align-items-center'>
        <h3>{item.name}</h3>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Description:</strong></p>
        <p className='details-description mb-3 text-center'>{item.description}</p>
        <button className='btn details-button btn-primary' onClick={() => setDetails({})}>Back</button>
      </div>
    )
  }

}

export default ItemDetails