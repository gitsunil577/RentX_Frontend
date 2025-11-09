import React from 'react';

const ProductHero1 = () => {
    return (
        <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url("/images/products-hero.jpg")' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Explore Our Awesome Products
                    </h1>
                    <p className="mt-3 text-lg sm:mt-5 sm:text-xl lg:text-2xl">
                        Discover high-quality items designed with you in mind.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                            <a
                                href="/shop"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Shop Now
                            </a>
                        </div>
                        <div className="ml-3 inline-flex">
                            <a
                                href="/categories"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                View Categories
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHero1;