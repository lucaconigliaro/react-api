import axios from "axios";
import { useEffect, useState } from "react";
import AppCard from "./components/AppCard";

// Struttura base per un nuovo articolo
const initialFormData = {
  id: "",
  titolo: "",
  immagine: "",
  contenuto: "",
};

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [article, setArticle] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get(`${apiUrl}/posts`)
      .then((resp) => {
        setArticle(resp.data.data);
      })
  };

  const handleArticleForm = (event) => {
    event.preventDefault();
    axios.post(`${apiUrl}/posts`, formData)
      .then((resp) => {
        const newArray = [...article, resp.data];
        setArticle(newArray);
        setFormData(initialFormData);
      })
  };

  const cancel = (idToDelete) => {
    axios.delete(`${apiUrl}/posts/${idToDelete}`)
      .then(() => {
        const newArray = article.filter((curArticle) => curArticle.id !== idToDelete);
        setArticle(newArray);
      })
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name; // Nome del campo modificato.
    const newValue = event.target.value; // Nuovo valore inserito.

    const newData = {
      ...formData,
      [keyToChange]: newValue
    };

    setFormData(newData);
  };


  return (
    <>
      <div className="container">
        <section>
          <h2>Nuovi Articoli</h2>
          {article.length > 0 ? (
            <div className="card-container">
              {article.map((curArticle) => (
                <div className="col" key={curArticle.id}>
                  <AppCard post={curArticle} onCancel={() => cancel(curArticle.id)} />
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun articolo</p>
          )}
        </section>

        <section>
          <h3>Aggiungi un nuovo articolo</h3>
          <form onSubmit={handleArticleForm}>
            <div>
              <label htmlFor="articleTitle">Nome dell'articolo</label>
              <input
                id="articleTitle"
                type="text"
                className="form-control mb-2"
                placeholder="Inserisci il titolo dell'articolo"
                name="titolo"
                value={formData.titolo}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="articleImage">Immagine dell'articolo</label>
              <input
                id="articleImage"
                type="text"
                className="form-control mb-2"
                placeholder="Inserisci l'immagine dell'articolo"
                name="immagine"
                value={formData.immagine}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="articleContent">Contenuto dell'articolo</label>
              <textarea
                id="articleContent"
                className="form-control mb-2"
                placeholder="Inserisci il contenuto dell'articolo"
                name="contenuto"
                value={formData.contenuto}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-success mt-2"
              disabled={!formData.titolo || !formData.contenuto}
            >
              Invia
            </button>

          </form>
        </section>
      </div>
    </>
  );
};

export default App