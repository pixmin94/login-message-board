import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"

export default function Message(){
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
        const response = await fetch(`https://forum-backend.onrender.com/record/`);
    
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const records = await response.json();
        setRecords(records);
        }
    
        getRecords().then(() => setLoading(false));
    
        return;
    }, [records.length]);

    return loading ? (
        <div class ="flex justify-center items-center absolute inset-0 m-auto">
            <Spinner />
        </div>
        ) : (
        <div class="flex flex-col justify-center space-y-3">
            {records.map(record => {
                return (
                    <div 
                        class="text-left border-2 rounded-lg px-8 py-3 mx-12 mt-4" 
                        key={record._id}
                    >
                        <h3>{record.title}</h3>
                        <span>"{record.message}"</span><br></br>
                        <span>~ {record.name}</span>
                    </div>
                )
            })}
            
        </div>
    );
}