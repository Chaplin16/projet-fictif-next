import React from "react";
import { v4 as uuidv4 } from "uuid";


export default function Contact(props) {
  console.log(props.data);
  return (
    <div>
      <h1 className="text-center pt-4 text-info">Auteurs et citations</h1>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {props.data.map((item, index) => (
          <div className="card w-25 h-auto me-3 mb-3 bg-secondary" key={index}>
            <div className="card-body">
              <h5 className="card-title text-danger">{item.author}</h5>
              <h6 className="card-subtitle mb-2  text-white">{item.id}</h6>
              <p className="card-text text-warning">{item.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const quote = await fetch(
    "https://programming-quotes-api.herokuapp.com/Quotes?count=10"
  );
  const data = await quote.json();

  return {
    props: {
      data,
    }
  };
}
