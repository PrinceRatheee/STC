"use client";
import React from 'react';
import Image from "next/image";
import '../styles/workGuide.css';

const WorkGuide = () => {
  return (
    <div className='flex flex-wrap flex-col  py-20 workGuide justify-center '>
        <div className='flex flex-wrap flex-col w-3/4 container  items-center'>
            <p className='mb-2 '>FEATURES</p>
            <h1>How it Works</h1>
            <p className='mt-4 max-w-lg'>Cryptocurrency markets have seen an increase in volume in recent weeks, which is a great opportunity for new traders.</p>
        </div>
        <div className='flex flex-wrap justify-center gap-8 mt-8  '>
            <div className='bg-white specs-div pt-16 flex items-center flex-col pb-8 px-8' >
                <div><Image src="/analytics.png" className='mb-8' width={60} height={13} /></div>
                <h3 className='mb-3'>Profitability</h3>
                <p className='text-center'>Increase your rate of probability with our best prediction system</p>
            </div>
            <div className='bg-white specs-div pt-16 flex items-center flex-col pb-8 px-8' >
                <Image src="/dollar.png" className='mb-8' width={60} height={13} />
                <h3 className='mb-3'>Transparency</h3>
                <p>Be aware of frauds. Join us. We are genuine and transparent</p>
            </div>
            <div className='bg-white specs-div pt-16 flex items-center flex-col pb-8 px-8' >
                <Image src="/money-bag.png" className='mb-8' width={60} height={13} />
                <h3 className='mb-3'>Security</h3>
                <p>Increase the security of your funds with our extra layer of authentication</p>
            </div>
            
        </div>
    </div>
  )
}

export default WorkGuide