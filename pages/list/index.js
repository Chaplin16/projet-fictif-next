import React from "react";
import Link from "next/link";
import {v4 as uuidv4} from 'uuid'

export default function index(props) {
  //  console.log(props.array.forEach((item) => console.log(Object.keys(item)[0])));

  return (
    <div className="container">
      <h1 className="my-4">Les listes de Vocabulaire</h1>
      <ul className="list-group">
        {props.array.map((item) => (
          <li key={uuidv4()} className="list-group-item">
            <Link href={`/list/${item.name}`}>{item.name}</Link>
            {/* {Objetc.keys(item)[0]} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await import(`/data/list.json`);
  const array = data.englishList;

  return {
    props: {
      array: array,
    },
  };
}
