import { useState } from "react"
import { useEffect } from "react"
import axios from '../axios'

function TestPage() {

    const [tables, setTables] = useState([])
    const list = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]

    useEffect(() => {
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
            {/* <div className="container my-5"> */}
                <div className="row row-cols-10">
                    {
                        list.map((num) => (
                            <div className="bg-info text-prime">
                                {num}
                            </div>
                        ))
                    }
                </div>
            {/* </div> */}
        </>
    )
}

export default TestPage