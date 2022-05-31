import React, { useRef } from "react";

export default function Add() {

    // ici on lie nos inputs à nos useRef()  cela permet de selectionner facilement des elements avec React
    const enWord = useRef()
    const frWord = useRef()

    const handleSubmit = e => {
        e.preventDefault()

        const newWord = {
            en: enWord.current.value,  //ceci fait reference au reference qui vont stocker ce qu on va selectionner dans la propriete current
            fr: frWord.current.value
        }

        // ici on appelle notre api avec un deuxieme parametre CAR c est une requete POST on a besoin de plus de choses à prendre en compte 
        fetch(`/https://projet-fictif-next.vercel.app/api/vocapi`, {
            method: "POST",
            body: JSON.stringify(newWord),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json()) //la response en json
        .then(data => {

            console.log(data)
        })

        enWord.current.value = ""; //on vide ensuite le formulaire/les input
        frWord.current.value = "";
    }

  return (
    <div className="container p-4">
        {/* quand on appuie il faut une action, ce sera handleSubmit avec le onSubmit */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="addEn" className="form-label">
          Ajouter un mot en Anglais
        </label>
        <input ref={enWord} type="text" className="form-control" id="addEn" />

{/* Rappel htmlFor doit  etre identique à l id */}
        <label htmlFor="addFr" className="form-label">
          Ajouter un mot en Français
        </label>
        <input ref={frWord} type="text" className="form-control" id="addFr" />

        <button className="btn btn-primary mt-4">Ajouter</button>
      </form>
    </div>
  );
}
