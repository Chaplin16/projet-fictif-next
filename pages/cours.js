import React from "react";

export default function Cours(props) {

  return (
    <div>
      <h1 className="my-2 text-center">Le BTC est à : {props.results.bpi.EUR.rate}</h1>
    </div>
  );
}

// On va chercher les donner sur une api
export async function getServerSideProps(context) {

    console.log(context)
  const data = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const results = await data.json();

  return {
    props: { results: results }
  };
}
