import { useState, useEffect } from 'react'
import axios from 'axios'

export const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const value = await axios.get('/api/values/current')
            const indexes = await axios.get('/api/values/all')
            if (value.data !== null)
            {
                console.log(value.data, ": ", indexes.data);
                setValues(value.data);
                setSeenIndexes(indexes.data)
            }
        }
        fetchData()
        console.log("State is set: ", values, index)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/api/values', {
            index
        })
        const value = await axios.get('/api/values/current')
        const indexes = await axios.get('/api/values/all')
        if (value.data !== null)
        {
            console.log(value.data, ": ", indexes.data);
            setValues(value.data);
            setSeenIndexes(indexes.data)
        }
        setIndex('')
    }
    const renderValues = () => {
        const entries = []
        console.log("Values: ", values);
        Object.entries(values).forEach(([key, value]) => {
            console.log("Key: ", key);
            entries.push(
                <div key={key}>
                    For index {key} I calculated {value}
                </div>
            )
        });
        
        return entries
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={e => setIndex(e.target.value)}/>
                <button >Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            <p>
            {seenIndexes.map(({ number }) => number).join(', ')}
            </p>
            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
    )
}