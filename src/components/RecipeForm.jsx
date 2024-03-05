import React, { useEffect, useState } from "react";

const RecipeForm = () => {
  const [isaddIngrident, isSetInGrident] = useState(false);
  const [localStore, setLocaStore] = useState([]);
  console.log("local sotarge",localStore)
  const intial = {
    titles: "",
    description: "",
    rating: 0,
    cookingTime: 0,
    imageUpload: "",
    tomato: 0,
    batata: 0,
    onion: 0,
    other: 0,
  };
  const [field, setFiled] = useState(intial);
  const getLocalStorageData = JSON.parse(localStorage.getItem("recipe"));
  useEffect(() => {
    if (getLocalStorageData && JSON.stringify(getLocalStorageData) !== JSON.stringify(localStore)) {
      setLocaStore(getLocalStorageData);
    }
  }, [getLocalStorageData, localStore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiled((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = (e) => {
    const data={
       id: localStore.length+1,
       ...field,
    }
    e.preventDefault();
    if (getLocalStorageData?.length > 0) {
      const updateData = [...getLocalStorageData, data];
      localStorage.setItem("recipe", JSON.stringify(updateData));
      setFiled({});
    } else {
      localStorage.setItem("recipe", JSON.stringify([data]));
      setFiled({});
    }
  };
  const deteldatafromLocalStorage = (id) => {
    const filterData = localStore?.filter((v) => v.id !== id);
    localStorage.setItem("recipe", JSON.stringify(filterData));
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "50px",
          gap: "20px",
        }}
      >
        <input
          type="text"
          name="titles"
          placeholder="Enter the recipe title"
          onChange={handleChange}
          value={field.titles}
        />
        <textarea
          name="description"
          placeholder="Enter the recipe description"
          onChange={handleChange}
          value={field.description}
        />
        <input
          type="number"
          onChange={handleChange}
          name="rating"
          placeholder="Enter the recipe rating"
          value={field.rating}
        />
        <input
          type="number"
          onChange={handleChange}
          name="cookingTime"
          placeholder="Enter the recipe cooking time"
          value={field.cookingTime}
        />
        <input
          type="file"
          name="imageUpload"
          placeholder="Upload image"
          onChange={handleChange}
          value={field.imageUpload ||""}
        />
        <div>
          <h3>Ingridients</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              isSetInGrident(!isaddIngrident);
            }}
          >
            +
          </button>
        </div>
        {isaddIngrident && (
          <>
            <label>
              tomato
              <input
                type="checkbox"
                name="tomato"
                onChange={handleChange}
                checked={field.tomato}
                value={1}
              />
            </label>
            <label>
              batata
              <input
                type="checkbox"
                name="batata"
                onChange={handleChange}
                checked={field.batata}
                value={2}
              />
            </label>
            <label>
              Onion
              <input
                type="checkbox"
                onChange={handleChange}
                name="onion"
                checked={field.onion}
                value={3}
              />
            </label>
            <label>
              other
              <input
                type="checkbox"
                name="other"
                onChange={handleChange}
                checked={field.other}
                value={4}
              />
            </label>
          </>
        )}
        <button onClick={handleClick}>Submit</button>
      </form>
      {localStore?.map((v) => (
        <li>
          {v.titles}{" "}
          <button onClick={() => deteldatafromLocalStorage(v.id)}>
            delete
          </button>
        </li>
      ))}
    </>
  );
};

export default RecipeForm;
