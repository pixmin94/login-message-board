import React, { useEffect, useState } from "react";

export default function Message(){
    const [records, setRecords] = useState([]);

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
    
        getRecords();
    
        return;
    }, [records.length]);

    return (
        <div>
            {records.map(record => {
                return (
                    <div key={record._id}>
                        <h3>{record.title}</h3>
                        <span>"{record.message}"</span><br></br>
                        <span>- {record.name}</span>
                    </div>
                )
            })}
            
        </div>
    );
}