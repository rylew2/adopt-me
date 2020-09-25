import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); // inside useState parens is default state  //all hooks begin with use

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS); //custom hook
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", []);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    //gets called after render (want first render to happen)
    //run when changing sets of breeds (going from cats ==> dog)
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); //list of dependencies - if any of these change, re-run this effect after re-render (won't run on location change)

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>

        <AnimalDropdown />
        <BreedDropdown />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
