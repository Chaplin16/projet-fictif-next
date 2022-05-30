import React from "react";
import styles from "../../styles/Home.module.css";
import {v4 as uuidv4} from 'uuid'
import {useRouter} from 'next/router'


export default function List(props) {
    console.log(props)
    const router = useRouter();

// Si la page ne reçoit pas les données alors apparaitre le h1 en attendant 
    if(!props.listEnCours){
        return <h1>Chargement</h1>
    }

    //{router.query.list} permet d afficher le titre grâce au router si l on veut en plus la premiere lettre en MAJ alors on fait comme dessous 
  return (
    <div className="container">
      <h1 className={styles.titre}>{router.query.list.charAt(0).toUpperCase() + router.query.list.slice(1)}</h1>
      <table className={styles.tableau}>
        <tbody>
          {props.listEnCours.map((el) => (
            <tr key={uuidv4()}>
              <td>{el.fr}</td>
              <td>{el.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// quand on a le getStatisPatsh() , on vient donner les données au getStatiscProps()
//en utilsant getStaticPath(), on a acces a un contexte
export async function getStaticProps(context) {
  const slug = context.params.list; //le contexte devient le slug  -  attention list a la fin est le nom de la page dynamique

  const data = await import(`/data/list.json`);

  //ici la methode find permet de trouver dans englishList ce que l on cherche un tableau qui a le list.name identique a slug
  const listEnCours = data.englishList.find((list) => list.name === slug);

//   si la page n est pas dans la liste de listEnCours alors erreur 404
    if(!listEnCours){
        return{
            notFound: true 
        }
    }   

  return {
    props: {
      listEnCours: listEnCours.data,
    },
  };
}

// dès qu il y a differents chemins/ chemins dynamiques on utilise getStaticPaths()
export async function getStaticPaths() {
  const data = await import(`/data/list.json`);

  // on peut mapper car tableau. item retourn un objet (item) qui contient comme propriete {params} avec le chemin dynamique {list} et le chemin du nom de la page que l on veut creer
  const paths = data.englishList.map((item) => ({
    params: { list: item.name },
  }));

  return {
    //on retourne un objet avec la propriété paths avec un S
    //qui contient un tableau
    //qui contient un objet avec la propriété PARAMS
    //qui aura comme objet le nom de notre [page].js    qui est le chemin dynamique de la page
    // paths: [
    //     {params: {list: "words"}},
    //     {params: {list: "adjectives"}},
    //     {params: {list: "verbs"}}
    // ],
    paths,
    fallback: false, //cela veut dire que si la page cherchée n est pas listée ici : alors ERROR 404
  };
}

//donc on vient de demander à next de creer une page statique avec le nom word  DONC /word ca sera une page dynamique
