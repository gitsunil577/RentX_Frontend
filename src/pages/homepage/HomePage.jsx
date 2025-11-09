import React from 'react'
import Hero from './Hero';
import VehicleFooter from './VehicleFooter';
import Chatbot from '../../components/Chatbot';

function HomePage() {
    return (
        <div>
            <Hero />
            <VehicleFooter />
            <Chatbot />
        </div>
     );
}

export default HomePage;