import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
    const inputRef = useRef(null)
  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <ol>
            <li>You will be asked 100 Question </li>
            <li>You will be awarded variable marks for each 100 Question </li>
            <li>You can review and change answer before Quiz submit</li>
            <li>Your ranks will be declared at end</li>
        </ol>
        <form id='form'>
            <input ref={inputRef} type="text" placeholder='Username'/>

        </form>
        <div className='start'>
            <Link className='btn' to={'quiz'}>Start Quiz</Link>
        </div>
    </div>
  )
}

