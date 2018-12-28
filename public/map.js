var mymap = L.map('mapid').setView([59.911491, 10.757933], 11);

// Place an empty map into the mapid div in index.html
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; OpenStreetMap contributors, CC-BY-SA, Imagery Mapbox',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVsbHVwcy1ub3JnZSIsImEiOiJjanB6YmUwMnMwOWRlM3hxamN3NHZtN3prIn0.iro4j4P91V8LLkleapIzIA'
}).addTo(mymap);

// Fetch data from the spreadsheet and turn it into markers on the map
function populateParks () {
    const url = "https://spreadsheets.google.com/feeds/cells/1JtH1FTFVCW9J32T9d763f6hD3vNnCA8INrx379bbXDw/od6/public/values?alt=json"
    fetch(url).then(response => response.json()).then(data => {
        const entries = data.feed.entry

        // Every spreadsheet cell is an object. This organizes the objects into rows
        // and stores the objects making out each "row" in arrays and stores them in entryObjects
        const numberOfRows = Number(entries[entries.length -1].gs$cell.row)
        let entryObjects = []
        for (i = 0; i < numberOfRows; i++) { 
            let entriesInRow = entries.filter(entry => {
                return Number(entry.gs$cell.row) === i + 1
            })
            entryObjects.push(entriesInRow)
        }

        // Extract the value from each cell object and organize them into park objects.
        const parks = []
        entryObjects.forEach(row => {
            let park = {
                city: row[0].content.$t,
                name: row[1].content.$t,
                description: row[2].content.$t,
                lat: row[3].content.$t,
                lon: row[4].content.$t
            }
            parks.push(park)
        })

        // Create map marker for each park object
        parks.forEach((park) => {
            L.marker([park.lat, park.lon])
              .addTo(mymap)
              .bindPopup(`<b>${park.name}</b><br>${park.description}`);
        })
    });
}
populateParks()