import { BiBriefcase, BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import React, { useState , useEffect} from "react";
import axios from 'axios';


const Filters = ({ onCategoryChange, onServiceChange }) => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedServiceId , setSelectedServiceId] = useState(null);
    const [properties, setProperties] = useState([]);

   
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userAuth/Show/');
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
        onCategoryChange(categoryId); // Appel de la fonction de rappel
      };
    
      const handleServiceChange = (serviceId) => {
        setSelectedServiceId(serviceId);
        onServiceChange(serviceId); // Appel de la fonction de rappel
      };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userAuth/service-list/');
                setServices(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);


    const handleSearch = async () => {
        if (selectedCategoryId !== null && selectedServiceId !== null) {
            try {
                const response = await axios.get(`http://localhost:8000/userAuth/properties-by-category-and-service/${selectedCategoryId}/${selectedServiceId}/`);

                setProperties(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
    };


  return (
    <div className="md:max-w-[80%] w-full mx-auto relative -mt-8 sm:-mt-20">
      <div className="flex-col bg-white gap-x-4 flex-center-between gap-y-4 md:gap-y-0 md:flex-row card card-shadow dark:shadow-none">
        <div className="flex-col flex-1 w-full flex-align-center gap-x-4 md:w-fit sm:flex-row gap-y-4 sm:gap-y-0">
          {/* <div className="flex-1 w-full p-2 rounded-lg md:w-fit bg-slate-100 dark:bg-hover-color-dark card-bordered">
            <h1 className="font-bold">Location</h1>
            <div className="flex-align-center gap-x-2">
              <BiMap />
              <input
                type="text"
                className="w-full bg-transparent border-0 outline-none"
                placeholder="Enter location of the property"
              />
            </div>
          </div> */}
          <div className="flex-1 w-full p-2 rounded-lg md:w-fit bg-slate-100 dark:bg-hover-color-dark card-bordered">
            <h1 className="font-bold">Property Type</h1>
            <div className="flex-align-center gap-x-2">
              <BiBuildings />
            <select onChange={(e) => handleCategoryChange(e.target.value)} 
            className="w-full bg-transparent border-0 outline-none dark:bg-hover-color-dark opacity-70"
            >
            <option value="">Select Property Type</option>
            {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
            </select>
            </div>
          </div>
        </div>
        <div className="flex-col flex-1 w-full flex-align-center gap-x-4 md:w-fit sm:flex-row gap-y-4 sm:gap-y-0">
          {/* <div className="flex-1 w-full p-2 rounded-lg md:w-fit bg-slate-100 dark:bg-hover-color-dark card-bordered">
            <h1 className="font-bold">Price range</h1>
            <div className="flex-align-center gap-x-2">
              <BiMoney />
              <select 
            value={selectedPriceRange} 
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="w-full bg-transparent border-0 outline-none dark:bg-hover-color-dark opacity-70"
        >
            <option value="">Select Price Range</option>
            {priceRanges.map(priceRange => (
                <option key={priceRange.value} value={priceRange.value}>{priceRange.label}</option>
            ))}
        </select>
            </div>
          </div> */}
          <div className="flex-1 w-full p-2 border rounded-lg md:w-fit bg-slate-100 dark:bg-hover-color-dark dark:border-dark-light">
            <h1 className="font-bold">For</h1>
            <div className="flex-align-center gap-x-2">
              <BiBriefcase />
              <select onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full bg-transparent border-0 outline-none opacity-70 dark:bg-hover-color-dark"
>
            <option value="">Select Service</option>
            {services.map(service => (
                        <option key={service.id_service} value={service.id_service}>{service.type_service}</option>
                    ))}
        </select>
            </div>
          </div>
        </div>
        <button onClick={handleSearch} className="w-full btn btn-primary md:w-fit">search</button>
      </div>
    </div>
  );
};

export default Filters;