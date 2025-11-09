import { useEffect, useState } from "react";
import axios from "axios";

const CategoriesHero1 = () => {
  const categories = ["Cars", "Bikes", "Scooters", "Bicycles", "SUVs", "Trucks", "Electric Vehicles"];
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE}/vehicle/all-vehicles`);
        setAllProducts(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [BASE]);

  const filteredProducts = allProducts.filter(
    (product) => product.categoryID?.name === selectedCategory
  );

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden w-full pt-0 pb-20 mt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Explore Vehicle Categories
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-200/80 sm:mt-4 mb-12">
            Browse through our diverse range of vehicle categories to find
            the perfect ride for your journey.
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative group px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                    : "bg-slate-900/80 backdrop-blur-xl text-slate-300 border border-slate-700/50 hover:border-blue-500/50 hover:text-white"
                }`}
              >
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg"></div>
                )}
                <span className="relative">{category}</span>
              </button>
            ))}
          </div>

          {/* Products display section */}
          {selectedCategory && (
            <div className="mt-12">
              <div className="relative group mb-8 inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30"></div>
                <h2 className="relative text-3xl font-bold text-white bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-xl border border-slate-700/50">
                  {selectedCategory}
                </h2>
              </div>

              {loading ? (
                <p className="text-blue-300 text-lg animate-pulse">Loading vehicles...</p>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                        <div className="relative w-full h-48 overflow-hidden">
                          <img
                            src={
                              product.image ||
                              "https://placehold.co/300x200?text=No+Image"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {product.name}
                          </h3>
                          <p className="text-blue-400 font-bold text-xl mt-auto">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-lg">
                  No vehicles found in this category.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesHero1;
