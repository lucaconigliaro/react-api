function AppCard({post, onCancel}) {
    return (
        <div className="card small-card">
        <img src={post.immagine} alt={post.titolo} className="card-img-top" />
        <div className="card-body">
          <h4>{post.titolo}</h4>
          <p>{post.contenuto}</p>
          <button onClick={onCancel} className="btn btn-danger">🗑️ Elimina</button>
        </div>
      </div>
    )
};

export default AppCard;