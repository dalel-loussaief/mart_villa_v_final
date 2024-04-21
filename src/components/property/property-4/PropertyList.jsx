import React, { useState, useEffect } from "react";
import SingleProductCard from "../../common/page-componets/SingleProductCard";
import Filters1 from "../../home/home-1/Filters1";
import { property } from "../../../data/dummyData";

const PropertyList = ({ basis }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    console.log(property.id)
    // Effectuez la requête initiale pour récupérer toutes les propriétés
    fetch("http://localhost:8000/userAuth/properties/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProperties(data);
        setProperties(data); // Enregistrez une copie des propriétés initiales
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Mettez à jour les propriétés lorsqu'une nouvelle catégorie ou un nouveau service est sélectionné
  useEffect(() => {
    // Vérifiez si la catégorie et le service sont sélectionnés avant de filtrer les propriétés
    if (selectedCategoryId !== null && selectedServiceId !== null) {
      // Effectuez une requête pour récupérer les propriétés filtrées
      fetch(`http://localhost:8000/userAuth/properties-by-category-and-service/${selectedCategoryId}/${selectedServiceId}/`)

        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setProperties(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedCategoryId, selectedServiceId]);

  return (
    <div className="pt-20 px-[3%] md:px-[6%]">
      <Filters1
        onCategoryChange={setSelectedCategoryId}
        onServiceChange={setSelectedServiceId}
      />
      {error && <p>Error: {error}</p>}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center mb-7"></div>
        <div className="flex flex-wrap gap-4">
          {properties.map((property) => (
            <SingleProductCard key={property.id} {...property} basis={basis} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;