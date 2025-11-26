import React, { useState, useEffect } from "react";

const Genres = () => {
    const [genres, setGenres] = useState([]);
    // console.log("Current genres state:", genres);

    useEffect(() => {
        fetch("http://localhost:3005/api/v1/genres")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched genres:", data);
                setGenres(data)
            })
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    return (
        <div>
            <h2>Book Genres</h2>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default Genres;