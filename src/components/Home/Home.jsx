import React from 'react';
import Hero from '../Hero/Hero';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import Categories from '../Categories/Categories';
import RecentlyAdded from '../RecentlyAdded/RecentlyAdded';
import BestSellers from '../BestSellers/BestSellers';
import PromoBanners from '../PromoBanners/PromoBanners';
import Services from '../Services/Services';
import PopularBooks from '../PopularBooks/PopularBooks';
import Testimonials from '../Testimonials/Testimonials';
import MapSection from '../MapSection/MapSection';

const Home = () => {
    return (
        <main className="w-full">
            <Hero />
            <Categories />
            <RecommendedBooks />
            <RecentlyAdded />
            <BestSellers />
            <PopularBooks />
            <PromoBanners />
            <Services />
            <MapSection />
            <Testimonials />
        </main>
    );
};

export default Home;
