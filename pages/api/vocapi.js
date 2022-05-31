import fs from "fs"; //methode pour travailler avec les fichiers sur le serveur
import path from "path";

//functiond e base pour une api, il faut l appeler handler
export default function handler(req, res) {
    try {
    if (req.method === "GET") {

      const filePath = path.join(process.cwd(), `data`, `list.json`); //on prend le dossier courant et le fichier .json
      const fileData = fs.readFileSync(filePath);  //cette methode lit le fichier et retourne les donnees
      const data = JSON.parse(fileData); // on transforme ces donnees en js

      res.status(200).json(data);

    }//si ce n est pas un GET alors c est un post : 
    else if (req.method === "POST"){

        const enWord = req.body.en; //request puis le corps du body puis en / on isole le mot en anglais 
        const frWord = req.body.fr; //pareil pour fr

        const newWord = {
          en: enWord, // en et fr correspondent a la facon dont c est ecrit sur l api /faut le presenter de la meme maniere
          fr: frWord
        }


        //maintenant il faut utiliser ce nouveau fichier pour remplacer l ancien avec ces nouvelles donnees
        const filePath = path.join(process.cwd(), `data`, `list.json`) // d abord on trouve le chemin
        const fileData = fs.readFileSync(filePath) // on recupere les donnees à partir du chemin
        const data = JSON.parse(fileData) // on cree du js a partir du json
        data.englishList[0].data.push(newWord) //c est du js donc on le manipule comme telle , ici on rajoute dans son emplacement en suivant son chemin dans l api où lobjet newWord sera ecrit
        fs.writeFileSync(filePath, JSON.stringify(data)) //ceci cree un nouveau fichier en remplacant l ancien et en transformant le JS en JSON
        
        //RAPPEL : stingify ou parse sont les deux methodes pour transformer du js en json ou l inverse


        //on envoit une reponse, le status ca 201 qa fonctionne suivi d un message
        res.status(201).json({message: "Bravo !"}) 
    }
  }catch (err) {
      res.status(500).send({ message: 'failed to fetch data', error: err })
  }
}
