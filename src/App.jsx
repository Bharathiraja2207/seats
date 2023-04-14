
import React, { useEffect, useState } from 'react';
import './App.css'
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');
console.log(selectedItems);
  const handleCheckboxChange = (event) => {
    const itemName = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems(selectedItems.concat([itemName]));
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
try{
  fetch('https://bookmyshow-backend.vercel.app/update-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: selectedItems })
  })
  setMessage("update success");
}
      catch(error) {
        console.error(error);
        setMessage('An error occurred while updating items');
      }
  };
  const [seat, setseat] = useState([]);
  useEffect(() => {
    fetch("https://bookmyshow-backend.vercel.app/bookingroom")
      .then((data) => data.json())
      .then((mvs) => setseat(mvs));
  }, []);
  console.log(seat);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='arrange'>
        {seat.map((e)=>(<div id={e.status}>
      
          <input  className={e.status} type="checkbox" value={e.name} onChange={handleCheckboxChange} />
          {e.name}
          
          </div>
         ))}
         </div>
        {/* <label>
          <input type="checkbox" value="Item 1" onChange={handleCheckboxChange} />
          Item 5
        </label>
        <label>
          <input type="checkbox" value="Item 2" onChange={handleCheckboxChange} />
          Item 7
        </label>
        <label>
          <input type="checkbox" value="Item 3" onChange={handleCheckboxChange} />
          Item 3
        </label>
        <label>
          <input type="checkbox" value="Item 4" onChange={handleCheckboxChange} />
          Item 8
        </label> */}
        <button type="submit">Update items</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

