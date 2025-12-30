<?php
session_start();

// Redirect to login if user is not logged in
if (!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
    header("Location: /Business%20Ideas/index.php");
    exit();
}

$user_id = intval($_SESSION['user_id']);
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Recommendations - Basotho Business Ideas</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .recommendation-card {
                background: white;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                border-left: 4px solid #4f46e5;
            }
            
            .recommendation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .recommendation-header h3 {
                margin: 0;
                color: #4f46e5;
                font-size: 1.2em;
            }
            
            .date {
                color: #6b7280;
                font-size: 0.9em;
            }
            
            .recommendation-body p {
                margin: 8px 0;
                line-height: 1.5;
            }
            
            .recommendation-actions {
                margin-top: 15px;
                text-align: right;
            }
            
            .btn {
                display: inline-block;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 500;
                transition: background-color 0.2s;
            }
            
            .btn-secondary {
                background-color: #6b7280;
                color: white;
            }
            
            .btn-secondary:hover {
                background-color: #4b5563;
            }
            
            .no-recommendations {
                text-align: center;
                padding: 40px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .loading {
                text-align: center;
                padding: 40px;
                color: #6b7280;
            }
            
            .hidden {
                display: none;
            }
        </style>
        <script>
            // Store user_id safely in localStorage for API calls
            document.addEventListener("DOMContentLoaded", function() {
                const userId = "<?php echo $user_id; ?>";
                if (userId) {
                    localStorage.setItem("user_id", userId);
                    console.log("User ID stored in localStorage:", localStorage.getItem("user_id"));
                }
            });
        </script>
    </head>

    <body>
        <header>
            <div class="container">
                <div style="text-align: center; margin-bottom: 1rem;">
                    <button id="langToggle" style="background: #e5e7eb; color: #374151; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.875rem;">Sesotho</button>
                </div>
                <h1 data-lang="my-recommendations">My Recommendations</h1>
                <div class="header-actions">
                    <a href="contact.html" class="btn btn-secondary" data-lang="nav-contact">Contact</a>
                    <a href="app.php" class="btn btn-primary" data-lang="new-recommendation">New Recommendation</a>
                    <button id="logoutBtn" class="btn btn-secondary" data-lang="logout">Logout</button>
                </div>
            </div>
        </header>

        <main class="container">
            <div id="loading" class="loading" data-lang="loading-recommendations">Loading your recommendations...</div>
            <div id="noRecommendations" class="no-recommendations hidden">
                <p data-lang="no-recommendations">You don't have any recommendations yet.</p>
                <a href="app.php" class="btn btn-primary" data-lang="get-first-recommendation">Get Your First Recommendation</a>
            </div>
            <div id="recommendationsList" class="recommendations-grid">
                <!-- Recommendations will be loaded here -->
            </div>
        </main>

        <!-- Business Support Section -->
        <section id="businessSupport" class="max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold text-center mb-8" data-lang="support-title">Business Support & Funding</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- BEDCO Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="org-icon blue mr-4">
                                <svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold">BEDCO</h3>
                        </div>
                        <p class="text-gray-600 mb-4 text-sm" data-lang="bedco-desc">Basotho Enterprise Development Corporation - Supporting business growth and development in Lesotho.</p>
                        <div class="space-y-3 text-sm">
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                info@bedco.org.ls
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                +266 2231 2601
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span data-lang="bedco-address">Kingsway Road, Maseru, Lesotho</span>
                            </p>
                        </div>
                        <a href="https://www.bedco.org.ls" target="_blank" class="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm" data-lang="visit-website">
                            Visit Website
                            <svg class="external-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- LNDC Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="org-icon green mr-4">
                                <svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold">LNDC</h3>
                        </div>
                        <p class="text-gray-600 mb-4 text-sm" data-lang="lndc-desc">Lesotho National Development Corporation - Promoting industrial and commercial development.</p>
                        <div class="space-y-3 text-sm">
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                info@lndc.org.ls
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                +266 2231 2421
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span data-lang="lndc-address">Pioneer Road, Maseru, Lesotho</span>
                            </p>
                        </div>
                        <a href="https://www.lndc.org.ls" target="_blank" class="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm" data-lang="visit-website">
                            Visit Website
                            <svg class="external-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- SMME Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="org-icon yellow mr-4">
                                <svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold">SMME Unit</h3>
                        </div>
                        <p class="text-gray-600 mb-4 text-sm" data-lang="sme-desc">Small, Medium and Micro Enterprises - Supporting small business development and entrepreneurship.</p>
                        <div class="space-y-3 text-sm">
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                smme@trade.gov.ls
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                +266 2231 2421
                            </p>
                            <p class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span data-lang="sme-address">Ministry of Trade, Maseru, Lesotho</span>
                            </p>
                        </div>
                        <a href="https://www.trade.gov.ls" target="_blank" class="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm" data-lang="visit-website">
                            Visit Website
                            <svg class="external-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container">
                <p>© 2025 Basotho Business Ideas. All rights reserved.</p>
            </div>
        </footer>

        <script src="scripts.js"></script>
        <script src="history.js"></script>
        <script>
            // Language toggle initialization using global functions from scripts.js
            document.addEventListener("DOMContentLoaded", function() {
                // Initialize language on page load
                initializeLanguage();
            });
        </script>
        <script>
            // Direct PHP fetch of recommendations as fallback
            document.addEventListener("DOMContentLoaded", async function() {
                const loadingEl = document.getElementById('loading');
                const noRecommendationsEl = document.getElementById('noRecommendations');
                const recommendationsList = document.getElementById('recommendationsList');

                try {
                    // Try API first
                    const response = await fetch('http://localhost:3000/api/recommendations', {
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const data = await response.json();
                        displayRecommendations(data.recommendations || []);
                    } else {
                        throw new Error('API failed');
                    }
                } catch (error) {
                    console.log('API failed, trying direct PHP fetch:', error);

                    // Fallback: Direct PHP database query
                    try {
                        const phpResponse = await fetch('fetch_recommendations.php');

                        if (phpResponse.ok) {
                            const phpData = await phpResponse.json();
                            displayRecommendations(phpData.recommendations || []);
                        } else {
                            throw new Error('PHP fallback failed');
                        }
                    } catch (phpError) {
                        console.error('Both API and PHP fallback failed:', phpError);
                        noRecommendationsEl.innerHTML = '<p>Unable to load recommendations. Please try again later.</p>';
                        noRecommendationsEl.classList.remove('hidden');
                    }
                } finally {
                    loadingEl.classList.add('hidden');
                }
            });

            function displayRecommendations(recommendations) {
                const recommendationsList = document.getElementById('recommendationsList');
                const noRecommendationsEl = document.getElementById('noRecommendations');

                if (!recommendations || recommendations.length === 0) {
                    noRecommendationsEl.classList.remove('hidden');
                    return;
                }

                recommendationsList.innerHTML = recommendations.map(rec => `
                    <div class="recommendation-card">
                        <div class="recommendation-header">
                            <h3>${escapeHtml(rec.business_title || 'Business Recommendation')}</h3>
                            <span class="date">${formatDate(rec.created_at)}</span>
                        </div>
                        <div class="recommendation-body">
                            <p class="skills"><strong data-lang="skills-label">Skills:</strong> ${escapeHtml(rec.skills || 'Not specified')}</p>
                            <p class="interests"><strong data-lang="interests-label">Interests:</strong> ${escapeHtml(rec.interests || 'Not specified')}</p>
                            <p class="location">📍 <strong data-lang="location-label">Location:</strong> ${escapeHtml(rec.location || 'Not specified')}</p>
                            <p class="capital">💰 <strong data-lang="capital-label">Capital:</strong> ${escapeHtml(rec.capital || 'Not specified')}</p>
                            <p class="availability"><strong data-lang="availability-label">Availability:</strong> ${escapeHtml(rec.availability || 'Not specified')}</p>
                            ${rec.business_description ? `<p class="description"><strong data-lang="description-label">Description:</strong> ${escapeHtml(rec.business_description.substring(0, 150))}${rec.business_description.length > 150 ? '...' : ''}</p>` : ''}
                            <div class="recommendation-actions">
                                <a href="recommendation.html?id=${rec.id}" class="btn btn-secondary" target="_blank" data-lang="view-full-details">View Full Details</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            function formatDate(dateString) {
                if (!dateString) return '';
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
            }

            function escapeHtml(unsafe) {
                if (typeof unsafe !== 'string') return '';
                return unsafe
                    .replace(/&/g, "&")
                    .replace(/</g, "<")
                    .replace(/>/g, ">")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }
        </script>
    </body>

    </html>