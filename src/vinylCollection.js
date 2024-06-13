import React, { useState } from "react";
import discogsService from "./services/discogsService";

const VinylCollection = () => {
    const [username, setUsername] = useState('');
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const changeUser = (event) => {
        setUsername(event.target.value);
    };

    const getCollection = async (username, page) => {
        setLoading(true);
        setError(null);
        setCollection([]);  // Clear the collection before loading new data
        try {
            const data = await discogsService.getCollection(username, page);
            setCollection(data.releases);
            setTotalPages(Math.ceil(data.pagination.items / data.pagination.per_page));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPage(1);
        getCollection(username, 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            getCollection(username, newPage);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            const newPage = page + 1;
            setPage(newPage);
            getCollection(username, newPage);
        }
    };

    return (
        <div className="searchSection">
            <form onSubmit={handleSubmit}>
                <label className="userForm">
                    Discogs Username:
                    <input type="text" value={username} onChange={changeUser} />
                </label>
                <button type="submit">Récupérer la collection</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="collectionsection">
                <ul className="collectioncontainer">
                    {collection.map((item) => (
                        <li className="collectionitem" key={`${item.id}-${item.basic_information.title}`}>
                            <div className="collectionitemCard">
                                <img className="itemcover" src={item.basic_information.cover_image} alt={item.basic_information.title} />
                                <div className="itemInfo">
                                    <p>{item.basic_information.title} </p>
                                    <p>{item.basic_information.artists.map(artist => artist.name).join(', ')}</p>
                                    <p>{item.basic_information.year}</p>
                                    <p> {item.basic_information.genres.join('/')}</p>
                                    <p> {item.basic_information.styles.join('/')}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page <= 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page >= totalPages}>Next</button>
            </div>
        </div>
    );
};

export default VinylCollection;
