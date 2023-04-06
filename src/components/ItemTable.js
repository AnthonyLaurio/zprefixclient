import React, { useRef, useState } from 'react'
import { Table } from 'react-bootstrap'
import '../stylesheets/ItemTable.css'
import ItemDetails from './ItemDetails';

const ItemTable = ({ items, userId, getItems }) => {
  const itemRef = useRef({ userId: userId, name: '', quantity: '', description: '' });
  const [details, setDetails] = useState({});

  const handleAdd = () => {
    fetch(`http://localhost:3001/items/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemRef.current)
    })
      .then(res => res.json())
      .then(data => {
        getItems();
        console.log(data);
      })
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setDetails({});
        getItems();
        console.log(data);
      })
  }

  if (userId === undefined) {
    return (
      <>
        {Object.keys(details).length === 0 ? null : <ItemDetails item={details} setDetails={setDetails}/>}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th>Item Name</th>
              <th className='text-center quantity-header'>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} onClick={(e) => {setDetails(item)}}>
                <td className='text-center'>{item.id}</td>
                <td>{item.name}</td>
                <td className='text-center'>{item.quantity}</td>
                <td className='text-nowrap'>{item.description.length >= 100 ? `${item.description.slice(0, 97)}...` : item.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
  else {
    return (
      <>
      {Object.keys(details).length === 0 ? null : <ItemDetails item={details} setDetails={setDetails} userId={userId} handleDelete={handleDelete} getItems={getItems}/>}
      <Table striped bordered hover variant="dark">
        <thead className='text-center'>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th className='quantity-header'>Quantity</th>
            <th>Description</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr key='add'>
            <td className='text-center'>0</td>
            <td className=''><input type='text' className='form-control' placeholder='name' onChange={(e) => { itemRef.current.name = e.target.value }} /></td>
            <td><input type='text' className='form-control' placeholder='quantity' onChange={(e) => { itemRef.current.quantity = e.target.value }} /></td>
            <td><input type='text' className='form-control' placeholder='description' onChange={(e) => { itemRef.current.description = e.target.value }} /></td>
            <td><button type='button' className='btn btn-success' onClick={() => handleAdd()}>Add</button></td>
          </tr>
          {items.map((item, index) => (
            <tr key={index} onClick={(e) => {setDetails(item)}}>
              <td className='text-center'>{item.id}</td>
              <td>{item.name}</td>
              <td className='text-center'>{item.quantity}</td>
              <td className='text-nowrap'>{item.description.length >= 100 ? `${item.description.slice(0, 97)}...` : item.description}</td>
              <td className='d-flex justify-content-evenly'>
                <button type='button' className='btn btn-danger' onClick={() => { handleDelete(item.id) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </>
    )
  }
}

export default ItemTable