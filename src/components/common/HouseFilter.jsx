import React, {useState} from 'react';

const HouseFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")
    const handleSelectChange = (e) => {
        const selectedType = e.target.value
        setFilter(selectedType)

        const filteredHouses = data.filter((house) =>
            house.houseType.toLowerCase().includes(selectedType.toLowerCase())
        )
        setFilteredData(filteredHouses)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const houseTypes = ["", ...new Set(data.map((house) => house.houseType))]

    return (
        <div>
            <div className="input-group mb-3">
    <span className="input-group-text" id="room-type-filter">
      Filter house by type
    </span>
                <select
                    className="form-select w-50 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    aria-label="room type filter"
                    value={filter}
                    onChange={handleSelectChange}
                >
                    <option value="">select a house type</option>
                    {houseTypes.map((type, index) => (
                        <option key={index} value={String(type)}>
                            {String(type)}
                        </option>
                    ))}
                </select>
                <button
                    className="w-50 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="button"
                    onClick={clearFilter}
                >
                    Clear Filter
                </button>
            </div>
        </div>

    );
};

export default HouseFilter;