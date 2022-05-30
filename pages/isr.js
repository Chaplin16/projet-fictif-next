import React from 'react'

export default function Contact(props) {

  return (
    <div>
        <h1>{props.data[0].en}</h1>
    </div>
  )
}

export async function getStaticProps() {
  const quote = await fetch("https://programming-quotes-api.herokuapp.com/Quotes?count=10")
  const data = await quote.json()


  return {
    props : {
      data
    },
    // cela revalide toutes les 20 secondes
    revalidate: 3 
  }
}
