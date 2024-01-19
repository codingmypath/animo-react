import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";



export const Day = ( {day, onClick}) => {
    const className = `font-mulish w-full h-[60px] m-0 border-[0.25px] border-lightestGreen white no-underline flex sm:h-[75px] sm:w-[75px] md:h-[100px] md:w-[100px] bg-veryLightGreen md:bg-white p-1 cursor-pointer rounded-sm sm:m-0.5 ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'rounded-sm !border-2 !border-middleGreen' : ''}`;
    
    console.log("Day component", day)
    console.log("Day event", day.event)
    return (
        <div onClick={onClick} className={className}>
            {day.value === 'padding' ? '' : day.value}

            
            {/* {day.event && <div className="w-full bg-blue-200 text-center rounded-sm">{day.event.title}</div>} */}
            {/* {day.event.mood ? <div>testingt this out</div> : ""} */}
            { day.event ? 
            (day.event.mood === 'good') ? <div className="w-full text-center mr-3 rounded-sm"><FontAwesomeIcon className="text-middleGreen text-center mt-3 sm:h-7 sm:mt-7 " icon={faFaceSmile} /></div> : 
            (day.event.mood === 'meh') ? <div className="w-full text-center mr-3 rounded-sm"><FontAwesomeIcon className="text-middleGreen text-center mt-3 sm:h-7 sm:mt-7" icon={faFaceMeh} /></div>  :
            (day.event.mood === 'bad') ? <div className="w-full text-center mr-3 rounded-sm"><FontAwesomeIcon className="text-middleGreen text-center mt-3 sm:h-7 sm:mt-7" icon={faFaceFrown} /></div> :  "" : "" }
        </div>
    )
}

// import React from "react";

// export const Day = ( {day, onClick}) => {
//     const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
//     return (
//         <div onClick={onClick} className={className}>
//             {day.value === 'padding' ? '' : day.value}

//             {day.event && <div className="event">{day.event.title}</div>}
//         </div>
//     )
// }