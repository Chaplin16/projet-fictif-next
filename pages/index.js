import styles from "../styles/Home.module.css";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Image from "next/image";
import img from "../public/woman-work.png";

// pour utiliser les données qui sont retournées d un fichier cote client il faut mettre en parametres props
export default function Home(props) {
  const [state, setState] = useState(false);

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    fetch(`/api/vocapi`)
      .then((response) => response.json())
      .then((data) => setState(data));
  };

  let randomWord;
  if (state) {
    const array = state.englishList[0].data;
    randomWord = array[Math.floor(Math.random() * array.length)].en;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <title className={styles.titre}>Titre</title>
      </Head>
      <div>
        <h1 className="text-center p-3">Mots au hasard</h1>
        <button onClick={newWord} className="btn btn-primary d-block m-auto">
          GET RANDOM WORD
        </button>
        <h2 className="text-center p-3">{randomWord}</h2>
      </div>
      <div className="text-center">
        <Image
          layout="intrinsic"
          placeholder="blur"
          src={img}
          width="558"
          height="640"
          alt="femme au travail"
        />
      </div>
    </>
  );
}

// methode utilisée pour appeler des données d'une api, d une bdd (ici il s agit d un dossier dans data )
// de maniere assyncrome puisqu on attends les donnees
export async function getStaticProps() {
  // voici les données qui arrivent
  const data = await import(`/data/vocabulary.json`);

  // on extrait le tableau de données dans array avec le nom du tableau, dans le fichier il s appelle vocabulary
  const array = data.vocabulary;

  //  Si on veut retourner une erreur 404 ssi par exemple le tableau est vide
  if (array.length === 0) {
    return {
      //     notFound : true
      redirect: {
        destination: "./isr",
      },
    };
  }

  if (array.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    // et je retourne un objet qui doit s appeler props! c est obligatoire
    props: {
      array: array,
    },
  };
}
