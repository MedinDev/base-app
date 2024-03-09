import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:1906"
})

/* This function adds a new house to the database */
export async function addHouse(photo, houseType,
                               housePrice, houseRoom,
                               houseBathroom, houseSurface,
                               houseCountry, houseAddress,
                               houseYear, houseDescription) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("houseType", houseType)
    formData.append("housePrice", housePrice)
    formData.append("houseRoom", houseRoom)
    formData.append("houseBathroom", houseBathroom)
    formData.append("houseSurface", houseSurface)
    formData.append("houseCountry", houseCountry)
    formData.append("houseAddress", houseAddress)
    formData.append("houseYear", houseYear)
    formData.append("houseDescription", houseDescription)

    const response = await api.post("/houses/add/new-house", formData)
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

/* This function gets all house types from the database */
export async function getHouseTypes() {
    try {
        const response = await api.get("houses/house/types");
        return response.data;
    } catch (error) {
        console.error("Error fetching house types:", error);
        throw new Error("An unexpected error occurred while fetching house types.");
    }
}
