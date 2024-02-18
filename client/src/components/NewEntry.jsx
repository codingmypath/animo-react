import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";



export const NewEntry = ({onSave, onEntry, onClose, entryDate}) => {
    const { currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    // const [title, setTitle] = useState('');
    // const [error, setError] = useState(false);

    const [date, setDate] = useState(entryDate);
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [mood, setMood] = useState('')

    const [formData, setFormData] = useState({
        date: entryDate,
        title: '',
        mood: 'good',
        description: '',
    })

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        if (e.target.value === 'good' || e.target.value === 'meh' || e.target.value === 'bad') {
            setFormData({
                ...formData,
                mood: e.target.id
            })
        }
        if (e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
     }
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            const res = await fetch('/api/entry/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message)
            }
            onEntry()
            window.location.reload();
            // navigate(`/entry/${data._id}`)
        } catch(error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const nameUpdate=(e) => {
        setTitle(e.target.value);
        console.log(title);
    }

    const paragraphUpdate =(e) => {
        setDescription(e.target.value);
        console.log(description)
    }


    return (
        <>
            {/* <form onSubmit={handleSubmit} id="newEventModal">
                <h2>Event</h2>
                <input id="date" className="block date" type="date" value="" name="date" min="2022-01-01" max="" required />
                <p id="eventText"></p>
                <button 
                    onClick={() => {
                        if (title) {
                            setError(false);
                            onSave(title);
                        } else {
                            setError(true);
                        }
                }} 
                className="journal-button del" id="deleteButton" >Delete</button>
                <button onClick={onClose} type="button" id="closeButton">Close</button>
            </form>  */}

        <form onSubmit={handleSubmit} id="newEventModal" className="font-mulish z-20 p-6 bg-lightestGreen rounded-md w-[375px] h-[550px] absolute m-auto text-center left-0 right-0 top-0 bottom-0">
        <h2 className="font-bold p-4 text-xl">Journal Entry</h2>
        <h3 className="font-bold pt-4">Date</h3>
        <p id="dateDisplay"></p>
        {/* <input id="date" className="block date" type="date" value={date} name="date" min="2022-01-01" max=""  readOnly required /> */}
        <p>{date}</p>
        <div className="title-form p-4">
            <label className="title-label font-bold p-4">Title</label>
            <p id="titleShow"></p>
            <input onChange={handleChange} className="input focus:outline-none pl-1" type="text" name="title" id="title" placeholder="Title" value={formData.title} required />
        </div>
        <h3 className="font-bold pt-4">How was your day?</h3>
        
        <section className="flex flex-row justify-center">
            <label className="m-2.5 text-lightGreen">
                <input onChange={handleChange} className ="hidden" id="good" type="radio" name="mood" value="good" checked={formData.mood === 'good'} required />
                <div className="radioButtons ">
                    <i className="fa-regular fa-face-smile face text-4xl cursor-pointer hover:text-middleGreen"><FontAwesomeIcon icon={faFaceSmile} /> </i>
                    
                </div>
            </label>

            <label className="m-2.5 text-lightGreen">
                <input onChange={handleChange} className="hidden" id="meh" type="radio" name="mood" value="meh" checked={formData.mood === 'meh'} />
                <div className="radioButtons">
                    <i className="fa-regular fa-face-meh face text-4xl cursor-pointer hover:text-middleGreen"><FontAwesomeIcon icon={faFaceMeh} /></i>
                </div>
            </label>

            <label className="m-2.5 text-lightGreen">
                <input onChange={handleChange} className="hidden " id="bad" type="radio" name="mood" value="bad" checked={formData.mood === 'bad'}  />
                <div className="radioButtons ">
                    <i className="fa-regular fa-face-frown face text-4xl cursor-pointer hover:text-middleGreen "><FontAwesomeIcon icon={faFaceFrown} /></i>
                </div>
            </label>
        </section>
        
        <p id="moodShow"></p>
        <h3 id="journal-today" className="font-bold pt-4">What happened today?</h3>
        <p id="journalShow"></p>
        <div className="textbox-div">
            <textarea onChange={handleChange} className="input focus:outline-none p-1 w-full " id="description" placeholder="Today.." name="description" rows="5" cols="35" required="required"></textarea><br />
        </div>
        
        <div className="button-div">
            <button className="text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5" type="submit" id="saveButton">Submit</button>
            {/* <button className="text-md cursor-pointer bg-blue-500 text-white rounded-sm p-1.5 m-1.5 del" id="deleteButton">Delete</button> */}
            <button onClick={onClose} type="button" id="cancelButton" className="del text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5" value="Cancel">Cancel</button>
        </div>
        </form>
            {/* <div id="newEventModal">
                <input 
                className={error ? 'error' : ''}
                value ={title}
                onChange={e => setTitle(e.target.value)}
                id="eventTitleInput"
                placeholder="Event Title"
                />
                <button 
                onClick={() => {
                    if (title) {
                        setError(false);
                        onSave(title)
                    } else {
                        setError(true);
                    }
                }} id="saveButton">Save</button>
                <button onClick={onClose} id="cancelButton deleteButon"></button>
            </div> */}
                
            <div id="modalBackDrop" className="top-0 left-0 z-10 fixed block w-screen bg-black bg-opacity-70 h-full"></div>
        </>
    )
}