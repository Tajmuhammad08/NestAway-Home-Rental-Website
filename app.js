const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const sidebar = document.querySelector('.nav-list');

const showMenu = () => {
    line1.classList.toggle('active');
    line2.classList.toggle('active');
    line3.classList.toggle('active');
    sidebar.classList.toggle('active');
};

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
        const budget = Number(document.getElementById('budgetSearch').value) || Infinity;
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
