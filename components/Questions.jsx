"use client";

import  React from 'react';
import "../styles/questions.css";
import  Accordion  from '@/components/Accordion';
import BasicAccordion from '@/components/Accordion';


const Questions = () => {
  return (
    <div>
        


        <div className="flex flex-col container gap-4 items-center max-w-5xl pt-20">
            <p className='questions-p1'>FAQ</p>
            <h2 className='questions-h2'>Still have Questions?</h2>
            <p className='questions-p2'>Check below for some of the frequently questions asked by users below.</p>
            <BasicAccordion/>
        </div>
    </div>
  )
}

export default Questions