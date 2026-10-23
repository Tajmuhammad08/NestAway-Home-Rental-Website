(() => {
    const properties = window.properties || [];
    const id = new URLSearchParams(window.location.search).get('id');
    const property = properties.find((item) => item.id === id) || properties[0];
    if (!property) return;

    document.title = `${property.location} | NestAway`;
    document.getElementById('propertyTitle').textContent = `${property.beds} BHK Home in ${property.location}`;
    document.getElementById('propertyImage').src = `./images/${property.image}`;
    document.getElementById('propertyImage').alt = `${property.beds} bedroom rental in ${property.location}`;
    document.getElementById('propertyPrice').textContent = `Rs.${property.price.toLocaleString('en-IN')}`;
    document.getElementById('propertyBeds').textContent = `${property.beds} BHK · ${property.area} · ${property.size}`;
    document.getElementById('propertyLocation').textContent = property.location;
    document.getElementById('propertyDescription').textContent = `A ${property.beds} bedroom rental home in ${property.location}, with approximately ${property.area} of space.`;
})();
