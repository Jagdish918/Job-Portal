import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, Banknote, ListFilter } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: Briefcase,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist"]
    },
    {
        filterType: "Salary Range",
        icon: Banknote,
        array: ["0 - 3 LPA", "3 - 6 LPA", "6 - 10 LPA", "10 - 20 LPA", "20+ LPA"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-card p-5 rounded-2xl border border-border shadow-sm sticky top-24'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <ListFilter className='h-4 w-4 text-primary' />
                    <h1 className='font-semibold text-base text-foreground'>
                        Filter Jobs
                    </h1>
                </div>
                {selectedValue && (
                    <button 
                        onClick={() => setSelectedValue('')}
                        className='text-xs font-semibold text-muted-foreground hover:text-primary transition-colors'
                    >
                        Clear All
                    </button>
                )}
            </div>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-5">
                {
                    filterData.map((data, index) => (
                        <div key={index} className='space-y-3'>
                            <h2 className='font-semibold text-sm flex items-center gap-2 text-foreground/90'>
                                <data.icon className='h-4 w-4 text-muted-foreground' />
                                {data.filterType}
                            </h2>
                            
                            <div className='space-y-2'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div 
                                                key={idx}
                                                className="flex items-center space-x-2 cursor-pointer"
                                            >
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard