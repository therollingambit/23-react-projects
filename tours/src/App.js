import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter(t => t.id !== id );
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    await axios.get(url)
      .then(res => {
        console.log(res.data);
        setTours(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(() => {
    fetchTours();
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className='btn' onClick={fetchTours}>refresh</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App
