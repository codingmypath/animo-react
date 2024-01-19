import React from "react";



export const DeleteEntry = ({onDelete, eventText, onClose }) => {
    console.log('eventText', eventText)

    // const handleDelete = async (entryId) => {
    //     try {
    //         const res = await fetch(`/api/entry/delete/${entryId}`, {
    //             method: 'DELETE',
    //         });
    //         const data = await res.json();
    //         if (data.success === false) {
    //             console.log(data.message);
    //             return;
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    console.log("event id:", eventText._id)
    return (
        
        <div>
        <form id="deleteEventModal" className="font-mulish z-20 p-6 bg-lightGreen rounded-md w-[350px] top-[100px] left-2/4 absolute m-auto text-center">
            <h2 className="font-bold p-2 ">Event</h2>
            {/* <input id="date" className="block date" type="date" value={eventText.date} name="date" min="2022-01-01" max="" required /> */}
            <p>{eventText.date}</p>
            <h2 className="font-bold p-2">Title</h2>
            <p id="eventText" className="p-2">{eventText.title}</p>
            <h2 className="font-bold p-2">Mood</h2>
            <h2 className="font-bold p-2">What happened today?</h2>
            <p className="pb-4">{eventText.description}</p>
            <button onClick={onDelete} className="journal-button del text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5" id="deleteButton">Delete</button>
            <button onClick={onClose} type="button" id="closeButton" className="del text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5">Close</button>
        </form> 
            <div id="modalBackDrop" className="top-0 left-0 z-10 absolute bg-black bg-opacity-70 w-full h-screen block"></div>
        </div>
        // <>
        // <form id="deleteEventModal" className="z-20 p-6 bg-slate-300 rounded-md w-[350px] top-[100px] left-2/4 absolute m-auto text-center">
        //     <h2 className="font-bold p-2">Event</h2>
        //     {/* <input id="date" className="block date" type="date" value={eventText.date} name="date" min="2022-01-01" max="" required /> */}
        //     <p>{eventText.date}</p>
        //     <h2 className="font-bold p-2">Title</h2>
        //     <p id="eventText" className="p-2">{eventText.title}</p>
        //     <h2 className="font-bold p-2">What happened today?</h2>
        //     <p className="pb-4">{eventText.description}</p>
        //     <button onClick={onDelete} className="journal-button del text-md cursor-pointer bg-blue-500 text-white rounded-sm p-1.5 m-1.5" id="deleteButton">Delete</button>
        //     <button onClick={onClose} type="button" id="closeButton" className="del text-md cursor-pointer bg-blue-500 text-white rounded-sm p-1.5 m-1.5">Close</button>
        // </form> 
        //     <div id="modalBackDrop" className="top-0 left-0 z-10 absolute bg-black bg-opacity-70 w-full h-full block"></div>
        // </>
    )
}