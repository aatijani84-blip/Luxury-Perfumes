    import { useEffect, useState } from "react";
    import {NavLink} from "react-router";
    import axios from "axios";
    import {Footer} from "./footer"

    export function MalePerfume() {

        const [malePerfumes, setMalePerfumes] = useState([]);
        const [clickedPerfume, setClickedPerfume] = useState(null);

    useEffect(() => {

    const fetchData = async () => {

        try {

        const response = await axios.get(
            "https://6a07dd4afa9b27c848fa593e.mockapi.io/perfume"
        );

        console.log(response.data)
        setMalePerfumes(response.data);

        } catch (error) {

        console.error("Error fetching male perfume data:", error);

        }
    };

    fetchData();

    }, []);

        const buttonAddToCart = (perfume) => {
        setTimeout(() => {
            alert(`${perfume.name} has been added to your cart!`);

        }, 500);
        console.log(`Added ${perfume.name} to cart!`);
        }

        const handlePerfumeClick = (perfume) => { 
            setClickedPerfume(perfume);
            setTimeout(() => { 
                setClickedPerfume(null);
            }, 1000)
        }

        const allFunction = (perfume) => { 
            buttonAddToCart(perfume);
            handlePerfumeClick(perfume);
        }

    return (
        <>
        <title>MALE PERFUMES</title>

        <div className="sticky top-0 left-0 w-full z-50 bg-transparent backdrop-filter backdrop-blur-sm border-b-2 border-amber-400">
        <h1 className="text-center lg:text-7xl text-3xl md:text-5xl font-bold my-6 p-8 mt-0 bg-gray-600">
            Men's Perfumes
        </h1>
        </div>

        <div className="flex md:flex-row py-4 xl:justify-evenly xl:flex-row md:justify-between md:flex xl:items-center md:items-center flex-col items-center justify-center w-full border-b-2 border-b-amber-400 bg-gray-100">
            <div className="sm:inline-block flex xl:flex-row md:items-center sm:items-center mb-3">
                <NavLink to ="/" className="text-4xl text-gray-400 hover:text-gray-800 hover:underline "> LUXURY PERFUMES </NavLink>
            </div>
        <div className="md:flex flex xl:flex-row md:items-center sm:items-center md:w-12/12 md:grow ">
            <input type='text' className="border-2 border-amber-400 rounded-l-lg px-3 py-2 xl:w-2xl md:w-12/12 sm:w-8/12" placeholder='Search perfumes...' />
            <button className="bg-gray-400 text-white rounded-r-lg px-4 py-2 cursor-pointer hover:bg-gray-600">Search</button>
        </div>
        </div>

        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 p-4">

            {malePerfumes.map((perfume) => (

            <div
                key={perfume.id}
                className="border border-amber-400 rounded-lg p-4 shadow-md flex flex-col items-center bg-gray-100 transition-transform duration-300 hover:scale-105"
            >

                <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-48 object-cover mb-2"
                />

                <h2 className="text-xl font-bold mb-2">
                {perfume.name}
                </h2>

                <p className="text-gray-600 mb-2">
                Brand: {perfume.brand}
                </p>

                <p className="text-lg font-bold">
                Release year: {perfume.releaseYear}
                </p>

                <p className="text-2xl  text-green-600">
                Price: GHc{perfume.price.toFixed(2)}
                    </p>

                <div className="grow"></div>

                    <button className="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-600"
                        onClick={() => allFunction(perfume)}
                    >

                        { clickedPerfume && clickedPerfume.id === perfume.id ? "Added!" : "Add to Cart" }
                </button>

            </div>
            ))}

        </div>

        <Footer />
        </>
    );
    }