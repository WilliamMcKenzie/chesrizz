"use client"

import Navbar from "../components/customize/navbar"
import Edit from "../components/onboard/edit"

export default function Customize() {
    return <>
        <Navbar back_option={true}/>
        <Edit/>
    </>
}