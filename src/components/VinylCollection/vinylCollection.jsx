import React, { useEffect, useRef } from "react";
import Loader from '../Loader/Loader'

const VinylCollection = ({
    collection,
    loading,
    error,
    page,
    totalPages,
    handlePreviousPage,
    handleNextPage,
}) => {
    const collectionRef = useRef(null);

    useEffect(() => {
        if (!loading && collection.length > 0) {
            collectionRef.current?.focus();
            collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loading, collection]);

    return (
        <>
            <div className="collectionSection">
                {loading && <Loader />}


                <div className="collectionContainer">
                    <div ref={collectionRef} tabIndex="-1" role="list" aria-label="Collection de vinyles">
                        {collection.length > 0 && (
                            <ul className="collectionList">
                                {collection.map((item, index) => (
                                    <li
                                        className="collectionItem arrival"
                                        key={`${item.id}-${item.basic_information.title}`}
                                        style={{ animationDelay: `${index * 0.6}s` }}
                                        tabIndex="0"
                                    >
                                        <div className="collectionItemCard">
                                            <img
                                                className="itemCover"
                                                src={item.basic_information.cover_image}
                                                alt={`Pochette de l'album "${item.basic_information.title}" par ${item.basic_information.artists.map((artist) => artist.name).join(", ")} (${item.basic_information.year})`}
                                            />
                                            <div className="itemInfo">
                                                <p className="itemInfo__title">{item.basic_information.title}</p>
                                                <p className="itemInfo__artist">
                                                    {item.basic_information.artists
                                                        .map((artist) => artist.name)
                                                        .join(", ")}
                                                </p>
                                                <p>{item.basic_information.year}</p>
                                                <p>{item.basic_information.genres.join(" / ")}</p>
                                                <p>{item.basic_information.styles.join(" / ")}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {!loading && collection.length > 0 && (
                <div className="pagination">
                    <button
                        onClick={() => {
                            handlePreviousPage();
                            setTimeout(() => collectionRef.current?.focus(), 100);
                        }}
                        disabled={page <= 1}
                        aria-label="Aller à la page précédente"
                    >
                        Previous
                    </button>
                    <span className="pagination__number" aria-live="polite">
                        Page {page} sur {totalPages}
                    </span>
                    <button
                        onClick={() => {
                            handleNextPage();
                            setTimeout(() => collectionRef.current?.focus(), 100);
                        }}
                        disabled={page >= totalPages}
                        aria-label="Aller à la page suivante"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default VinylCollection;
