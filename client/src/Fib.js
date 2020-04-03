import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    async function fetchValues() {
        const getValues = await axios.get('/api/values/current');
        setValues(getValues.data)
    }

    async function fetchIndexes() {
        const getSeenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(getSeenIndexes.data)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await axios.post('/api/values', {
            index: index
        })

        fetchValues();
        fetchIndexes();
        setIndex('')
    }

    function renderSeenIndexes() {
        return seenIndexes.map(({ number }) => number).join(', ')
    }
  
    function renderValues() {
        return Object.keys(values).map(key => {
            return (
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            )
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index: </label>
                <input value={index} onChange={e => setIndex(e.target.value)}/>
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen: </h3>
            {renderSeenIndexes()}

            <h3>Calculated Values: </h3>
            {renderValues()}
        </div>
    )

} 

export default Fib;