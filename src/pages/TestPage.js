import { useState } from "react"
import { useEffect } from "react"
import axios from '../axios'

function TestPage() {

    const [tables, setTables] = useState([])
    const event_id = 3

    useEffect(()=> {
        async function getTables() {
            try {
                const response = await axios.get('/atables')
                console.log(response.data)
                setTables(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getTables()
    }, [])
    return (
        <>
            <div>
                {
                    tables.map((table)=> (
                        <div>{table.name}</div>
                    ))
                }
            </div>  
        </>
    )
}

export default TestPage