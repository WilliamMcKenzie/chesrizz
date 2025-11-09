'use client'

import Card from "./card"

export default function TinderSwiper(props : any) {
    return (props.users.length == 0 ? <h1>EMPTY</h1> :
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Card user={props.users[0]} active={true} onSwipe={(direction) => { props.swipe(direction) }}/>
      </div>
    </div>)
}