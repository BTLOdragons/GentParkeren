const apiUrl = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const container = document.getElementById("container");
// functie voor het ophalen van de data
async function fetchData() {
    
    try {
        
        const response = await fetch(apiUrl);
        console.log("Api successfuly fetched", response);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("response.json successfully", data);
        const parkings = data.results;
        console.log("data.results", parkings);

        parkings.forEach(parkings => {
            const {name, occupation, totalcapacity, availablecapacity , isopennow} = parkings;
            const occupied = occupation;
            const status = isopennow ? "open" : "closed";

            const parkingDiv = document.createElement("div");
            parkingDiv.className = "parking";
            parkingDiv.innerHTML = `
                 <h2> ${name} </h2>
                 <p><strong> Occupied: </strong> ${occupied} / ${availablecapacity} </p>
                 <p><strong> Available: </strong>${availablecapacity - occupied} </p>
                 <p class="${isopennow ? 'open' : 'closed'}"><strong> Status: </strong>${status} </p>
            `;
            container.appendChild(parkingDiv);
            
        });
        console.log("Made and appended div's");
    } catch (error){
        console.error("ara~ ara~ you've made a mistake", error)
    } finally {
        console.log('fetchData completed');
    };
};

fetchData();