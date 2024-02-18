import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function Quote() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
 
    useEffect(() => {
    
        fetch("https://mentalhealthapi-txsj.onrender.com/api/allQuotes")
            .then(res => res.json())
            .then(data => {
                function random() {
                    const date = new Date();
                    let days = date.getFullYear() * date.getDate() * (date.getMonth() + 1);
                    console.log('days: ', days)
                    return (Math.floor(days) % data.length);
                }

                console.log("random:", random())
                setQuote(data[random()].quote);
                setAuthor(data[random()].author);
            })
        
    .catch(err => {
        console.log(`error ${err}`)
    })
    }, [])     

    return (
        <div>
            <section className="quote p-4 m-auto text-center max-w-[800px] border rounded-sm bg-lightestGreen text-darkGreen ">
              <h1 className='font-bold text-xl p-2'>Quote of the Day</h1>
              <p className="quotes">"{quote}"</p>
              <h4 className="author text-right">- {author}</h4>
          </section>
        </div>
    )
}