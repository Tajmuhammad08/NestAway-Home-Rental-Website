const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const sidebar = document.querySelector('.nav-list');

const showMenu = () => {
    if (!sidebar || !line1 || !line2 || !line3) return;
    line1.classList.toggle('active');
    line2.classList.toggle('active');
    line3.classList.toggle('active');
    sidebar.classList.toggle('active');
};

// Attach a stable property ID to each listing so booking always opens that listing.
document.querySelectorAll('#product .product-card').forEach((card, index) => {
    const property = window.properties && window.properties[index];
    if (!property) return;
    card.dataset.propertyId = property.id;
    const image = card.querySelector('.product-img');
    if (image) {
        image.src = `./images/${property.image}`;
        image.alt = `${property.beds} bedroom rental in ${property.location}`;
        image.removeAttribute('width');
    }
    const locationLabel = card.querySelector('.card-info-content:first-child p');
    const facts = card.querySelectorAll('.card-info-content .content p');
    const priceLabel = card.querySelector('.price p');
    if (locationLabel) locationLabel.textContent = property.location;
    if (facts[0]) facts[0].textContent = `${property.beds} Bed`;
    if (facts[1]) facts[1].textContent = property.size;
    if (facts[2]) facts[2].textContent = property.area;
    if (priceLabel) priceLabel.textContent = `Rs.${property.price.toLocaleString('en-IN')}`;
    const bookingLink = card.querySelector('.booking-btn');
    if (bookingLink) bookingLink.href = `./inform.html?id=${encodeURIComponent(property.id)}`;
});

document.querySelectorAll('.nav-list a').forEach((link) => {
    link.addEventListener('click', () => {
        line1.classList.remove('active');
        line2.classList.remove('active');
        line3.classList.remove('active');
        sidebar.classList.remove('active');
    });
});

const searchForm = document.getElementById('propertySearchForm');
if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const location = document.getElementById('locationSearch').value.trim().toLowerCase();
        const type = document.getElementById('typeSearch').value.trim().toLowerCase();
        const budgetValue = document.getElementById('budgetSearch').value;
        const budget = budgetValue === '' ? Infinity : Number(budgetValue);
        const cards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        cards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            const priceText = card.querySelector('.price p')?.textContent || '';
            const price = Number(priceText.replace(/\D/g, '')) || 0;
            const matchesLocation = !location || cardText.includes(location);
            const matchesType = !type || cardText.includes(type);
            const matchesBudget = price <= budget;
            const matches = matchesLocation && matchesType && matchesBudget;

            card.style.display = matches ? '' : 'none';
            if (matches) visibleCount += 1;
        });

        document.getElementById('product').scrollIntoView({ behavior: 'smooth' });
        if (visibleCount === 0) {
            alert('No properties match your search. Try a different location, bed count, or budget.');
        }
    });
}

const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('subscribeEmail').value.trim();
        alert(`Thanks for subscribing, ${email}! This demo does not send emails yet.`);
        subscribeForm.reset();
    });
}

if (typeof TweenMax !== 'undefined') {
    TweenMax.from('.navbar', 1, { delay: .3, x: -40, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('.header-headline', 2, { delay: .5, y: 80, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('.header-subtitle', 3, { delay: .5, y: 20, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('.cta', 4, { delay: .5, y: 20, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('#propertySearchForm', 2, { delay: .3, y: 80, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('.product-info', 2, { delay: .5, x: -100, opacity: 0, ease: Expo.easeInOut });
    TweenMax.from('.product-card', 2, { delay: .5, y: 100, opacity: 0, ease: Expo.easeInOut });
}
