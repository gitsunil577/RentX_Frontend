import React from 'react'
import Hero from './Hero';
import Categories from './Categories';
import Vehicles from './Vehicles';

function ProductPage() {
    return (
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* <Hero /> */}
            <Categories />
            <Vehicles />
        </div>
     );
}

export default ProductPage;