import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function Quote() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
 
    useEffect(() => {

        fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {

    function random() {
        const date = new Date();
        console.log(date.getFullYear())
        console.log(date.getDate())
        console.log((date.getMonth() + 1))
        console.log('test ' + data.length)
        console.log(date.getFullYear() * date.getDate() * (date.getMonth() + 1))
        return (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % data.length;
        
    }
    console.log('answer ' + random())
    setQuote(data[random()].text)
    setAuthor(data[random()].author.split(',')[0])


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