import React,{useState,useEffect} from 'react'
import './Nav.css'

export const Nav = () => {
    const[show,setShow]=useState(false)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>110){
                setShow(true)
            }
            else{
                setShow(false)
            }
        })

        return()=>{
            window.removeEventListener("scroll")
        }
    },[])
    return (
        <div className={`nav ${show&& "nav_black"}`}>
            <h3>Movie center</h3>
        </div>
    )
}
