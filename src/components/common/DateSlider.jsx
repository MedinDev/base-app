import React, {useState} from 'react';
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"

const DateSlider = ({onDateChange, onFilterChange}) => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    })

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDateChange(null, null)
        onFilterChange(null, null)
    }
    return (
        <>
            <div>
                <h5 className="mb-2">Filter bookings by date</h5>
                <DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4"/>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleClearFilter}>
                    Clear Filter
                </button>
            </div>

        </>
    )
}


export default DateSlider;