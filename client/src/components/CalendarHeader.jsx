import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export const CalendarHeader = ({ onNext, onBack, dateDisplay}) => {
    return (
        <section className='font-mulish flex justify-center pb-4 p-4 text-darkGreen'>
            <a onClick={onBack} id="back-month" className="cursor-pointer mt-3 fa-solid fa-angle-left"><FontAwesomeIcon icon={faAngleLeft} /></a>
            <div className='text-center w-80 text-4xl px-4'>{dateDisplay}</div>
            <a onClick={onNext} id="forward-month" className="cursor-pointer mt-3 fa-solid fa-angle-right"><FontAwesomeIcon icon={faAngleRight} /></a>
        </section>
    );
};