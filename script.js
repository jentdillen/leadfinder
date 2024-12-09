// Simpele authenticatie simulatie
let isLoggedIn = false;

// Voeg deze constante toe bovenaan het script
const ADMIN_EMAILS = CONFIG.ADMIN_EMAILS;

// Testdata voor bedrijven
const testCompanies = [
    // Nederland - Amsterdam
    {
        name: "Bakkerij De Hoek",
        location: "Amsterdam",
        coordinates: { lat: 52.3676, lng: 4.9041 },
        hasWebsite: false,
        address: "Hoofdstraat 1, 1234 AB Amsterdam",
        phone: "020-1234567",
        email: "info@bakkerijdehoek.nl"
    },
    {
        name: "Café Zondag",
        location: "Amsterdam",
        coordinates: { lat: 52.3739, lng: 4.8809 },
        hasWebsite: true,
        website: "https://www.cafezondag.nl",
        address: "Parkweg 15, 1234 CD Amsterdam",
        phone: "020-9876543",
        email: "contact@cafezondag.nl"
    },
    {
        name: "Digital Solutions Amsterdam",
        location: "Amsterdam",
        coordinates: { lat: 52.3762, lng: 4.8952 },
        hasWebsite: true,
        website: "https://www.digitalsolutions.nl",
        address: "Zuidas 88, 1082 AA Amsterdam",
        phone: "020-5558877",
        email: "info@digitalsolutions.nl"
    },
    // Nederland - Rotterdam
    {
        name: "Havenwerken Rotterdam",
        location: "Rotterdam",
        coordinates: { lat: 51.9225, lng: 4.4792 },
        hasWebsite: true,
        website: "https://www.havenwerken.nl",
        address: "Maasboulevard 100, 3072 Rotterdam",
        phone: "010-7654321",
        email: "info@havenwerken.nl"
    },
    {
        name: "Restaurant De Maas",
        location: "Rotterdam",
        coordinates: { lat: 51.9244, lng: 4.4777 },
        hasWebsite: false,
        address: "Wilhelminakade 52, 3072 AR Rotterdam",
        phone: "010-8765432",
        email: "reserveren@restaurantdemaas.nl"
    },
    // Nederland - Utrecht
    {
        name: "Slagerij van den Berg",
        location: "Utrecht",
        coordinates: { lat: 52.0907, lng: 5.1214 },
        hasWebsite: false,
        address: "Marktplein 8, 3521 XY Utrecht",
        phone: "030-5554433",
        email: "info@slagerijvandenberg.nl"
    },
    {
        name: "IT Campus Utrecht",
        location: "Utrecht",
        coordinates: { lat: 52.0894, lng: 5.1077 },
        hasWebsite: true,
        website: "https://www.itcampus-utrecht.nl",
        address: "Computerweg 10, 3542 DR Utrecht",
        phone: "030-6667788",
        email: "contact@itcampus-utrecht.nl"
    },
    // Nederland - Den Haag
    {
        name: "Strandpaviljoen Scheveningen",
        location: "Den Haag",
        coordinates: { lat: 52.1115, lng: 4.2834 },
        hasWebsite: true,
        website: "https://www.strandpaviljoen-scheveningen.nl",
        address: "Strandweg 145, 2586 JM Den Haag",
        phone: "070-3334455",
        email: "info@strandpaviljoen-scheveningen.nl"
    },
    // Nederland - Eindhoven
    {
        name: "Tech Startup Eindhoven",
        location: "Eindhoven",
        coordinates: { lat: 51.4416, lng: 5.4697 },
        hasWebsite: true,
        website: "https://www.techstartup-ehv.nl",
        address: "High Tech Campus 1, 5656 AE Eindhoven",
        phone: "040-7778899",
        email: "info@techstartup-ehv.nl"
    },
    // België - Brussel
    {
        name: "Chocolaterie Bruxelles",
        location: "Brussel",
        coordinates: { lat: 50.8503, lng: 4.3517 },
        hasWebsite: true,
        website: "https://www.chocolateriebruxelles.be",
        address: "Grote Markt 10, 1000 Brussel",
        phone: "+32 2 123 45 67",
        email: "info@chocolateriebruxelles.be"
    },
    {
        name: "Restaurant La Belle Vue",
        location: "Brussel",
        coordinates: { lat: 50.8466, lng: 4.3528 },
        hasWebsite: true,
        website: "https://www.labellevue.be",
        address: "Kunstberg 23, 1000 Brussel",
        phone: "+32 2 234 56 78",
        email: "reservations@labellevue.be"
    },
    // België - Antwerpen
    {
        name: "Diamant Handel Antwerpen",
        location: "Antwerpen",
        coordinates: { lat: 51.2194, lng: 4.4025 },
        hasWebsite: false,
        address: "Pelikaanstraat 78, 2018 Antwerpen",
        phone: "+32 3 345 67 89",
        email: "info@diamanthandel.be"
    },
    {
        name: "Haven Transport BV",
        location: "Antwerpen",
        coordinates: { lat: 51.2213, lng: 4.4051 },
        hasWebsite: true,
        website: "https://www.haventransport.be",
        address: "Havenstraat 100, 2030 Antwerpen",
        phone: "+32 3 456 78 90",
        email: "info@haventransport.be"
    },
    // België - Gent
    {
        name: "Textiel Fabriek Gent",
        location: "Gent",
        coordinates: { lat: 51.0543, lng: 3.7174 },
        hasWebsite: false,
        address: "Industrieweg 45, 9000 Gent",
        phone: "+32 9 567 89 01",
        email: "contact@textielfabriek.be"
    },
    {
        name: "Gentse Microbrouwerij",
        location: "Gent",
        coordinates: { lat: 51.0500, lng: 3.7167 },
        hasWebsite: true,
        website: "https://www.gentsebier.be",
        address: "Brouwersstraat 12, 9000 Gent",
        phone: "+32 9 678 90 12",
        email: "brouwerij@gentsebier.be"
    },
    // Nederland - Groningen
    {
        name: "Startup Noord",
        location: "Groningen",
        coordinates: { lat: 53.2194, lng: 6.5665 },
        hasWebsite: true,
        website: "https://www.startupnoord.nl",
        address: "Innovatieweg 1, 9747 AN Groningen",
        phone: "050-3334455",
        email: "info@startupnoord.nl"
    },
    // België - Brugge
    {
        name: "Kantwinkel Brugge",
        location: "Brugge",
        coordinates: { lat: 51.2093, lng: 3.2247 },
        hasWebsite: false,
        address: "Steenstraat 78, 8000 Brugge",
        phone: "+32 50 123 456",
        email: "info@kantwinkel.be"
    }
];

// Voeg deze functie toe voor gebruikersbeheer
function addUser(userName, email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check of de gebruiker al bestaat
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return false;
    }
    
    // Voeg nieuwe gebruiker toe met uitgebreide profielinformatie
    users.push({
        userName,
        email,
        company: '',
        phone: '',
        joinDate: new Date().toISOString(),
        profile: {
            searchCount: 0,
            savedCount: 0
        }
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Login form handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const loginEmail = e.target.elements[0].value;
        
        // Haal alle gebruikers op
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === loginEmail);
        
        if (user) {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Check of de gebruiker een admin is
            const isAdmin = ADMIN_EMAILS.includes(loginEmail);
            localStorage.setItem('isAdmin', isAdmin);
            window.location.href = 'dashboard.html';
        } else {
            alert('E-mailadres niet gevonden. Registreer eerst een account.');
            window.location.href = 'register.html';
        }
    });
}

// Register form handler
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userName = e.target.elements[0].value;
        const email = e.target.elements[1].value;
        
        if (addUser(userName, email)) {
            alert('Account succesvol aangemaakt! Je kunt nu inloggen.');
            window.location.href = 'index.html';
        } else {
            alert('Dit e-mailadres is al geregistreerd. Probeer in te loggen.');
            window.location.href = 'index.html';
        }
    });
}

// Check if user is logged in
function checkAuth() {
    const isDashboardOrSaved = window.location.pathname.includes('dashboard.html') || 
                              window.location.pathname.includes('saved.html') ||
                              window.location.pathname.includes('admin.html') ||
                              window.location.pathname.includes('profile.html'); // Voeg profile.html toe
    
    if (isDashboardOrSaved) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html';
        } else {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            document.getElementById('userName').textContent = `Welkom, ${currentUser.userName}`;
            
            // Toon admin knop indien admin
            const adminButton = document.getElementById('adminButton');
            if (adminButton && localStorage.getItem('isAdmin') === 'true') {
                adminButton.style.display = 'inline-flex';
            }
            
            // Check voor admin pagina toegang
            if (window.location.pathname.includes('admin.html') && localStorage.getItem('isAdmin') !== 'true') {
                window.location.href = 'dashboard.html';
            }
            
            if (window.location.pathname.includes('saved.html')) {
                displaySavedCompanies();
            } else if (window.location.pathname.includes('admin.html')) {
                displayAdminDashboard();
            } else if (window.location.pathname.includes('profile.html')) {
                loadUserProfile();
            }
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check authentication on page load
checkAuth();

// Voeg deze code toe aan je bestaande script.js
if (document.getElementById('searchForm')) {
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const location = document.getElementById('location').value.toLowerCase();
        const radius = parseInt(document.getElementById('radius').value);
        const noWebsiteOnly = document.getElementById('noWebsite').checked;
        
        console.log('Zoeken naar:', {
            location,
            radius,
            noWebsiteOnly
        });
        
        // Track de zoekopdracht
        trackUserActivity(`Zoekopdracht uitgevoerd voor locatie: ${location}`);
        
        // Filter bedrijven
        const filteredCompanies = testCompanies.filter(company => {
            console.log('Checking company:', company.name, company.location);
            
            // Filter op locatie (alleen als er een locatie is ingevuld)
            if (location && !company.location.toLowerCase().includes(location.toLowerCase())) {
                return false;
            }
            
            // Filter op website
            if (noWebsiteOnly && company.hasWebsite) {
                return false;
            }
            
            return true;
        });
        
        console.log('Gevonden bedrijven:', filteredCompanies);
        
        displayResults(filteredCompanies);
    });
}

// Voeg deze functie toe bovenaan het script
function toggleFavorite(companyId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const favoritesKey = `favorites_${currentUser.email}`; // Gebruik email van currentUser object
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    const index = favorites.indexOf(companyId);
    
    if (index === -1) {
        favorites.push(companyId);
        trackUserActivity(`Bedrijf opgeslagen: ${testCompanies[companyId].name}`);
        const favBtn = document.getElementById(`fav-${companyId}`);
        if (favBtn) favBtn.classList.add('favorited');
    } else {
        favorites.splice(index, 1);
        trackUserActivity(`Bedrijf verwijderd uit opgeslagen: ${testCompanies[companyId].name}`);
        const favBtn = document.getElementById(`fav-${companyId}`);
        if (favBtn) favBtn.classList.remove('favorited');
    }
    
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    
    // Als we op de saved pagina zijn, ververs de weergave
    if (window.location.pathname.includes('saved.html')) {
        displaySavedCompanies();
    }
}

// Update de displayResults functie
function displayResults(companies) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    if (companies.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Geen bedrijven gevonden die aan de criteria voldoen.</p>';
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const favoritesKey = `favorites_${currentUser.email}`; // Gebruik email van currentUser
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    
    companies.forEach((company, index) => {
        const isFavorite = favorites.includes(index);
        
        const card = document.createElement('div');
        card.className = 'company-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${company.name}</h3>
                <button id="fav-${index}" 
                        class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                        onclick="toggleFavorite(${index})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="company-details">
                <div class="company-info">
                    <i class="fas fa-map-marker-alt"></i> ${company.address}
                </div>
                <div class="company-info">
                    <i class="fas fa-city"></i> ${company.location}
                </div>
                <div class="company-info">
                    <i class="fas fa-phone"></i> 
                    <a href="tel:${company.phone}" class="contact-link">${company.phone}</a>
                </div>
                <div class="company-info">
                    <i class="fas fa-envelope"></i> 
                    <a href="mailto:${company.email}" class="contact-link">${company.email}</a>
                </div>
            </div>
            <div class="company-footer">
                <div class="footer-buttons">
                    ${company.hasWebsite 
                        ? `<a href="${company.website}" class="btn-website" target="_blank">
                             <i class="fas fa-globe"></i> Bekijk website
                           </a>`
                        : '<span class="no-website-badge"><i class="fas fa-times"></i> Geen website</span>'
                    }
                    <button class="btn-more-info" onclick="showCompanyDetails(${index})">
                        <i class="fas fa-info-circle"></i> Meer info
                    </button>
                </div>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Voeg deze functie toe voor het popup window
function showCompanyDetails(companyIndex) {
    const company = testCompanies[companyIndex];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${company.name}</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Contact Informatie</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${company.address}</p>
                    <p><i class="fas fa-city"></i> ${company.location}</p>
                    <p><i class="fas fa-phone"></i> ${company.phone}</p>
                    <p><i class="fas fa-envelope"></i> ${company.email}</p>
                </div>
                <div class="detail-section">
                    <h3>Website Status</h3>
                    <p>${company.hasWebsite 
                        ? `<a href="${company.website}" target="_blank" class="website-link">
                             <i class="fas fa-globe"></i> ${company.website}
                           </a>`
                        : '<span class="no-website-text"><i class="fas fa-times"></i> Geen website beschikbaar</span>'
                    }</p>
                </div>
                <!-- Hier kun je meer secties toevoegen met extra informatie -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Update de displaySavedCompanies functie
function displaySavedCompanies() {
    const savedContainer = document.getElementById('savedResults');
    if (!savedContainer) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const favoritesKey = `favorites_${currentUser.email}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    
    if (favorites.length === 0) {
        savedContainer.innerHTML = '<p class="no-results">Je hebt nog geen bedrijven opgeslagen.</p>';
        return;
    }
    
    savedContainer.innerHTML = '';
    
    favorites.forEach(index => {
        const company = testCompanies[index];
        if (!company) return;
        
        const card = document.createElement('div');
        card.className = 'company-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${company.name}</h3>
                <button id="fav-${index}" 
                        class="favorite-btn favorited" 
                        onclick="toggleFavorite(${index})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="company-details">
                <div class="company-info">
                    <i class="fas fa-map-marker-alt"></i> ${company.address}
                </div>
                <div class="company-info">
                    <i class="fas fa-city"></i> ${company.location}
                </div>
                <div class="company-info">
                    <i class="fas fa-phone"></i> 
                    <a href="tel:${company.phone}" class="contact-link">${company.phone}</a>
                </div>
                <div class="company-info">
                    <i class="fas fa-envelope"></i> 
                    <a href="mailto:${company.email}" class="contact-link">${company.email}</a>
                </div>
            </div>
            <div class="company-footer">
                <div class="footer-buttons">
                    ${company.hasWebsite 
                        ? `<a href="${company.website}" class="btn-website" target="_blank">
                             <i class="fas fa-globe"></i> Bekijk website
                           </a>`
                        : '<span class="no-website-badge"><i class="fas fa-times"></i> Geen website</span>'
                    }
                    <button class="btn-more-info" onclick="showCompanyDetails(${index})">
                        <i class="fas fa-info-circle"></i> Meer info
                    </button>
                </div>
            </div>
        `;
        
        savedContainer.appendChild(card);
    });
}

// Zorg ervoor dat de functie wordt aangeroepen wanneer de pagina laadt
document.addEventListener('DOMContentLoaded', function() {
    checkAuth(); // Dit roept ook displaySavedCompanies aan op de saved pagina
});

// Voeg deze functie toe voor het tracken van gebruikersactiviteit
function trackUserActivity(action) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    
    if (userIndex !== -1) {
        // Zorg ervoor dat profile object bestaat
        if (!users[userIndex].profile) {
            users[userIndex].profile = {
                searchCount: 0,
                savedCount: 0
            };
        }
        
        // Update gebruikersstatistieken
        if (action.includes('Zoekopdracht')) {
            users[userIndex].profile.searchCount++;
        } else if (action.includes('Bedrijf opgeslagen')) {
            users[userIndex].profile.savedCount++;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Bestaande activiteitenlog functionaliteit
    const timestamp = new Date().toISOString();
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    
    activities.push({
        user: currentUser.email,
        userName: currentUser.userName,
        action: action,
        timestamp: timestamp
    });
    
    localStorage.setItem('userActivities', JSON.stringify(activities));
}

// Voeg deze functie toe voor het admin dashboard
function displayAdminDashboard() {
    // Haal alle activiteiten op
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    const activityLog = document.getElementById('activityLog');
    
    // Reset activityLog
    activityLog.innerHTML = '';
    
    // Update statistieken
    const totalUsers = document.getElementById('totalUsers');
    const totalSearches = document.getElementById('totalSearches');
    const totalSaved = document.getElementById('totalSaved');
    
    // Bereken statistieken
    const uniqueUsers = new Set(activities.map(activity => activity.user)).size;
    const searchCount = activities.filter(activity => activity.action.includes('Zoekopdracht')).length;
    const savedCount = activities.filter(activity => activity.action.includes('Bedrijf opgeslagen')).length;
    
    // Update statistiek elementen
    totalUsers.textContent = uniqueUsers || 0;
    totalSearches.textContent = searchCount;
    totalSaved.textContent = savedCount;
    
    // Toon activiteiten in omgekeerde volgorde (nieuwste eerst)
    activities.reverse().forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <span class="activity-user">${activity.user}</span>
            <span class="activity-action">${activity.action}</span>
            <span class="activity-time">${new Date(activity.timestamp).toLocaleString()}</span>
        `;
        activityLog.appendChild(activityItem);
    });
    
    // Als er geen activiteiten zijn, toon een bericht
    if (activities.length === 0) {
        activityLog.innerHTML = '<div class="no-results">Nog geen gebruikersactiviteit.</div>';
    }
}

// Profiel functies
function loadUserProfile() {
    if (!document.getElementById('profileForm')) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProfile = users.find(user => user.email === currentUser.email);
    
    if (userProfile) {
        document.getElementById('profileName').value = userProfile.userName;
        document.getElementById('profileEmail').value = userProfile.email;
        document.getElementById('profileCompany').value = userProfile.company || '';
        document.getElementById('profilePhone').value = userProfile.phone || '';
        
        // Update statistieken
        document.getElementById('userSearchCount').textContent = userProfile.profile.searchCount;
        document.getElementById('userSavedCount').textContent = userProfile.profile.savedCount;
        document.getElementById('userJoinDate').textContent = new Date(userProfile.joinDate).toLocaleDateString();
    }
}

// Update profiel handler
if (document.getElementById('profileForm')) {
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(user => user.email === currentUser.email);
        
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                userName: document.getElementById('profileName').value,
                company: document.getElementById('profileCompany').value,
                phone: document.getElementById('profilePhone').value
            };
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({
                ...currentUser,
                userName: document.getElementById('profileName').value
            }));
            
            alert('Profiel succesvol bijgewerkt!');
            
            // Update gebruikersnaam in de navbar
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = `Welkom, ${document.getElementById('profileName').value}`;
            }
        }
    });
}

// Voeg deze regel toe aan de bestaande checkAuth functie
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserProfile(); // Laad profielgegevens als we op de profielpagina zijn
}); 