import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "Mobile Architect",
    "System Admin"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='w-full py-10 bg-background'>
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <motion.div
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="w-full h-12 rounded-full border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors bg-card shadow-sm"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='hidden md:block'>
                    <CarouselPrevious className="absolute -left-12 h-10 w-10 border border-border bg-card text-foreground hover:bg-muted" />
                    <CarouselNext className="absolute -right-12 h-10 w-10 border border-border bg-card text-foreground hover:bg-muted" />
                </div>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel