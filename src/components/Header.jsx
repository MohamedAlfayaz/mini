import React from 'react'
import { Link } from "react-router-dom"


export const Header = () => {
  return (
    <div className="d-flex my-2 justify-content-evenly align-items-center bg-">
        <img className='align-items-center'style={{width:'100px'}}src="src/assets/logo.png" alt="logo" />
        <div className="d-flex fw-bold">Maxmoc Motor Works PVT LTD</div>
        <ul className='d-flex align-items-center gap-3 '>
        <li style={{listStyle:'none'}}>
          <Link className='text-decoration-none navbar-brand ' to={"/"}>Tax Invoice</Link>
        </li>
      </ul>
    </div>
  )
}
