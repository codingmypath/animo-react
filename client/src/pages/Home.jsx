import React, { useEffect, useMemo, useState } from 'react'
import { CalendarHeader } from '../components/CalendarHeader';
import { Day } from '../components/Day';
import { NewEntry } from '../components/NewEntry';
import { DeleteEntry } from '../components/DeleteEntry';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import { render } from "react-dom";
import Quote from '../components/Quote';
import CryptoJS from 'crypto-js';



function Home() {

  // const [formData, setFormData] = useState({
  //     date: '',
  //     title: '',
  //     mood: '',
  //     description: '',
  // })
  // const [error, setError] = useState(false);


  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [events, setEvents] = useState(
  //   localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
  // );
  const [showEntriesError, setShowEntriesError] = useState(false);
  const { currentUser} = useSelector(state => state.user);
  const [userEntries, setUserEntries] = useState([]);

  
  //PROBLEM: THIS IS INITUALLY EMPTY ON FIRST RENDER BECAUSE OF EMPTY ARRAY STATE!
  const eventForDate = date => userEntries.find(e => e.date === date);
  console.log('eventforDate', eventForDate())

  // useEffect(() => {
  //   localStorage.setItem('events', JSON.stringify(events));
  //   console.log('events?', events)
  // }, [events]);

  

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    
    if (nav !== 0) {
      today.setMonth(new Date().getMonth() + nav);
    }

    const month = today.getMonth()  //Gives you the month number
    const day = today.getDate() //Gives you the day number
    const year = today.getFullYear()    //Gives you the year 

    const firstOfMonth = new Date(year, month, 1);  //Gives you the date. Ex: Sat Oct 01 2022 00:00:00 GMT-0700 (Pacific Daylight Time)
    const fullDaysInMonth = new Date(year, month + 1, 0).getDate(); //Gives you the number of days in the month

    const dateString = firstOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${today.toLocaleDateString('en-us', {month: 'long'})} ${year}`)
  
    let dayWithZ = 0;
    let monthWithZ = 0;
  
    // Gives you the amount of days before the first day of the month on the first week
    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);   
    
    const daysArr = [];

    for (let i = 1; i <= paddingDays + fullDaysInMonth; i++) {
      // let dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;

      if (i - paddingDays < 10) {
        dayWithZ = ('0' + (i - paddingDays)).slice(-2) 
        // console.log("dayWithZ = " + dayWithZ)
        // daySquare.id = `date_${year}-${month+1}-${dayWithZ}`;
        // dayStringTest = `${year}-${month + 1}-${dayWithZ}`;
      } 
    
      if (i -paddingDays >= 10){
        dayWithZ = i-paddingDays;
        // daySquare.id = `date_${year}-${month+1}-${i-paddingDays}`;
        // dayStringTest = `${year}-${month + 1}-${i-paddingDays}`;
      }

      if ((month + 1) < 10) {
            monthWithZ = ('0' + (month + 1)).slice(-2)
            // dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;
      } 

      if ((month + 1) >= 10) {
        monthWithZ = month + 1;
      }
      let dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;
      // console.log('DAYSTRINGTEST', dayStringTest)
  
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayStringTest),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayStringTest,
        });
      } else {
        daysArr.push({
        value: 'padding',
        event: null,
        isCurrentDay: false,
        date: '',
        });
      }

    }
    setDays(daysArr);

  }, [setDays, nav, userEntries]);



  useEffect(() => {

    async function fetchData() {
    try {
      setShowEntriesError(false);
        const res = await fetch(`/api/user/entries/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowEntriesError(true);
          return;
        }
        setUserEntries(data);
        setIsLoading(false);
        console.log('try', userEntries)
        console.log('days', days)
    } catch (error) {
      setShowEntriesError(true);
    }
  }
    fetchData();
    

  }, [])




  
  console.log('daysafter', days)
  console.log('userEntries', userEntries)
  // console.log('events', events)
  console.log('userEntries.mood', userEntries.mood)


  const onDelete = async (entryId) => {
    try {
        const res = await fetch(`/api/entry/delete/${entryId}`, {
            method: 'DELETE',
        });
        console.log("res", res)
        const data = await res.json();
        if (data.success === false) {
            console.log(data.message);
            return;
        }
        setUserEntries((prev) => prev.filter((listing) => listing._id !== entryId))
        setClicked(null);
    } catch (error) {
        console.log(error.message);
    }
}


  return (
    <>
    { userEntries &&
      <div>
      <section className="font-mulish px-2 w-full sm:px-9 max-w-[800px] m-auto mt-20 p-4 pb-20">
          {/* <section className="quote">
              <h1>Quote of the Day</h1>
              <p className="quotes"></p>
              <h4 className="author"></h4>
          </section> */}
          <Quote />

          <CalendarHeader 
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav + 1)}
            onBack={() => setNav(nav - 1)}
          />

          <ul className="flex justify-center p-0 text-xs sm:text-sm">
              <li className='w-full text-center flex-1 list-none '>Sunday</li>
              <li className='w-full text-center flex-1 list-none '>Monday</li>
              <li className='w-full text-center flex-1 list-none '>Tuesday</li>
              <li className='w-full text-center flex-1 list-none'>Wednesday</li>
              <li className='w-full text-center flex-1 list-none'>Thursday</li>
              <li className='w-full text-center flex-1 list-none'>Friday</li>
              <li className='w-full text-center flex-1 list-none'>Saturday</li>
          </ul>
          

          <section id="calendar" className="grid grid-cols-7 justify-items-center">
            {days && days.map((d, index) => (
              <Day 
                key={index} 
                day={d} 
                event={userEntries}
                onClick={() => {
                  // console.log("d", d)
                  // console.log("d.date", d.date)
                  // console.log("Click")
                  // console.log("EFD", eventForDate)
                  if (d.value !== 'padding') {
                    setClicked(d.date);
                  }
                }} 
              />
              //  <div>{d?.event?.title}</div>
            ))}
          </section>
          {/* <ul className="pt-2.5 pl-72 justify-end flex">
              <li className='flex-none h-20'><span className="bg-red-200 inline-block w-4 h-4 border-r-sm"></span>
              <span className="legend-label">Good</span></li>
              <li id="legendLi"><span className="bg-blue-300 inline-block w-4 h-4 border-r-sm"></span>
                  <span className="legend-label">Meh</span></li>
              <li id="legendLi"><span className="bg-blue-400 inline-block w-4 h-4 border-r-sm"></span>
                  <span className="legend-label">Bad</span></li>
          </ul> */}

      </section>
              
    {
      clicked && !eventForDate(clicked) &&
      <NewEntry 
        entryDate={clicked}
        onClose={() => setClicked(null)}
        onEntry={() => setClicked(null)}
        onSave={title => {
          setUserEntries([...entries, {title, date: clicked}])
          setClicked(null);
        }}
      />
    }

     {
      clicked && eventForDate(clicked) &&
      // <DeleteEntry 
      //   eventText={eventForDate(clicked)}
      //   onClose={() => setClicked(null)}
      //   onDelete={() => onDelete}
      // />
      <div>
        <form id="deleteEventModal" className="font-mulish bg-lightestGreen text-veryDarkGreen z-20 p-6 rounded-md w-[375px] min-h-[450px]  absolute m-auto text-center left-0 right-0 my-[-600px]">
            <h2 className="font-extrabold p-2 text-lg">Journal Entry</h2>
            {/* <input id="date" className="block date" type="date" value={eventText.date} name="date" min="2022-01-01" max="" required /> */}
            <p className='p-2'>{eventForDate(clicked).date}</p>
            <h2 className="font-bold pt-4">Title</h2>
            <p id="eventText" className="p-2">{eventForDate(clicked).title}</p>
            <h2 className="font-bold pt-4">Mood</h2>
              { 
                eventForDate(clicked).mood === 'good' ? <p className='p-2'>Happy</p> :
                eventForDate(clicked).mood === 'meh' ? <p className='p-2'>Meh</p> : <p className='p-2'>Sad</p>  
              }
            <h2 className="font-bold pt-4">What happened today?</h2>
            {/* <p className="p-2 pb-4">{CryptoJS.AES.decrypt(eventForDate(clicked).description.toString(), 'password').toString(CryptoJS.enc.Utf8)}</p> */}
            <p className="p-2 pb-4">{ eventForDate(clicked).description.toString() }</p>
            <button onClick={() => onDelete(eventForDate(clicked)._id)} type="button" className="journal-button del text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5 mt-4" id="deleteButton">Delete</button>
            <button onClick={() => setClicked(null)} type="button" id="closeButton" className="del text-md cursor-pointer bg-darkGreen text-white rounded-sm p-1.5 m-1.5 mt-4">Close</button>
        </form> 
            <div id="modalBackDrop" className="top-0 left-0 bottom-0 z-10 absolute bg-black bg-opacity-70 w-full h-full block"></div>
        </div>
    }

   {/* {
      clicked && eventForDate(clicked) &&
      <DeleteEntry 
        eventText={eventForDate(clicked)}
        onClose={() => setClicked(null)}
        onDelete={() => {
          setUserEntries(entries.filter(e => e.date != clicked))
          setClicked(null);
        }}
      />
    } */}
    </div>
}
    </>
  ) 
}


export default Home;
