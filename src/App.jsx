import { useEffect, useState } from "react";

// Struttura base per un nuovo articolo
const initialFormData = {
  id: "",
  titolo: "",
  immagine: "",
  contenuto: "",
}

function App() {
  const [article, setArticle] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  // Gestione del modulo quando viene inviato
  const handleArticleForm = (event) => {
    event.preventDefault();
    if (formData.titolo !== "") {

      const newArticle = {
        ...formData, // Copia tutti i dati attualmente nel modulo.
        id: Date.now() // Aggiunge un ID unico basato sull'ora attuale.
      };

      const newArray = [...article, newArticle]; // Crea un nuovo array con l'articolo aggiunto.
      setArticle(newArray);

      setFormData(initialFormData);
    };
  };

  const cancel = (idToDelete) => {
    const newArray = article.filter(curArticle => curArticle.id !== idToDelete);
    setArticle(newArray);
  }

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
            <div className="row row-cols-2">
              {article.map((curArticle) => (
                <div className="col" key={curArticle.id}>
                  <div className="card">
                    <img src={curArticle.immagine} alt={curArticle.titolo} className="card-img-top" />
                    <div className="card-body">
                      <h4>{curArticle.titolo}</h4>
                      <p>{curArticle.contenuto}</p>
                      <button onClick={() => cancel(curArticle.id)} className="btn btn-danger">🗑️ Elimina</button>
                    </div>
                  </div>
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