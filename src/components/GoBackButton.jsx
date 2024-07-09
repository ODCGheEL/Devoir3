import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RiArrowGoBackFill } from "react-icons/ri";


export default function GoBackButton() {
  return (
    <Button className='my-2'>
        <Link to='/' className='text-white'>
        <RiArrowGoBackFill size={20} className='mx-1'/>
        Go Back</Link>
    </Button>
  )
}
