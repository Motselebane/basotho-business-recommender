document.addEventListener('DOMContentLoaded', async() => {
            const recommendationsList = document.getElementById('recommendationsList');
            const loadingEl = document.getElementById('loading');
            const noRecommendationsEl = document.getElementById('noRecommendations');
            const logoutBtn = document.getElementById('logoutBtn');

            // Load recommendations directly (PHP already checked authentication)
            try {
                await loadRecommendations();
            } catch (error) {
                console.error('Error:', error);
                loadingEl.textContent = 'Unable to load your recommendation history. Please check your connection and try again.';
            }

            // Logout handler
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async() => {
                    try {
                        const response = await fetch('http://localhost:3000/api/logout', {
                            method: 'POST',
                            credentials: 'include'
                        });
                        if (response.ok) {
                            window.location.href = 'business-recommender/auth/login.php';
                        }
                    } catch (error) {
                        console.error('Logout failed:', error);
                    }
                });
            }

            // Check if user is authenticated
            async function checkSession() {
                try {
                    const response = await fetch('http://localhost:3000/api/check-session', {
                        credentials: 'include'
                    });
                    const data = await response.json();
                    return data.authenticated === true;
                } catch (error) {
                    console.error('Session check failed:', error);
                    return false;
                }
            }

            // Load user's recommendations with API-first, then PHP fallback
            async function loadRecommendations() {
                try {
                    const response = await fetch('http://localhost:3000/api/recommendations', {
                        credentials: 'include'
                    });

                    if (!response.ok) {
                        throw new Error(`api_failed_${response.status}`);
                    }

                    const data = await response.json();
                    displayRecommendations(data.recommendations || []);
                } catch (error) {
                    console.warn('API failed, trying PHP fallback:', error);
                    try {
                        const phpResponse = await fetch('fetch_recommendations.php', { credentials: 'include' });
                        if (!phpResponse.ok) {
                            throw new Error(`php_failed_${phpResponse.status}`);
                        }
                        const phpData = await phpResponse.json();
                        displayRecommendations(phpData.recommendations || []);
                    } catch (phpError) {
                        console.error('Both API and PHP fallback failed:', phpError);

                        let userFriendlyMessage = 'Unable to load your recommendations.';
                        if (String(error).includes('401') || String(phpError).includes('401')) {
                            userFriendlyMessage = 'Your session has expired. Please log in again.';
                        } else if (String(error).includes('500') || String(phpError).includes('500')) {
                            userFriendlyMessage = 'Server error. Please try again later.';
                        } else if ((error.name === 'TypeError' && error.message.includes('fetch')) || (phpError.name === 'TypeError' && phpError.message.includes('fetch'))) {
                            userFriendlyMessage = 'Unable to connect to the server. Please check your internet connection.';
                        }
                        loadingEl.textContent = userFriendlyMessage;
                    } finally {
                        loadingEl.classList.add('hidden');
                    }
                }
            }

            // Display recommendations in the UI
            function displayRecommendations(recommendations) {
                if (!recommendations || recommendations.length === 0) {
                    noRecommendationsEl.classList.remove('hidden');
                    return;
                }

                recommendationsList.innerHTML = recommendations.map(rec => {
                    const title = rec.business_title || rec.title || rec.businessTitle || 'Business Recommendation';
                    const createdAt = rec.created_at || rec.createdAt || rec.timestamp || '';
                    const skills = rec.skills || rec.user_skills || rec.userSkills || 'Not specified';
                    const interests = rec.interests || rec.user_interests || rec.userInterests || 'Not specified';
                    const location = rec.location || rec.user_location || rec.userLocation || 'Not specified';
                    const capital = rec.capital || rec.available_capital || rec.availableCapital || 'Not specified';
                    const availability = rec.availability || rec.user_availability || rec.userAvailability || 'Not specified';
                    const descriptionRaw = rec.business_description || rec.description || rec.recommendation || rec.text || '';
                    const description = typeof descriptionRaw === 'string' ? descriptionRaw : '';
                    const descShort = description ? escapeHtml(description.substring(0, 150)) + (description.length > 150 ? '...' : '') : '';

                    return `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <h3>${escapeHtml(title)}</h3>
                    <span class="date">${formatDate(createdAt)}</span>
                </div>
                <div class="recommendation-body">
                    <p class="skills"><strong>Skills:</strong> ${escapeHtml(skills)}</p>
                    <p class="interests"><strong>Interests:</strong> ${escapeHtml(interests)}</p>
                    <p class="location">📍 <strong>Location:</strong> ${escapeHtml(location)}</p>
                    <p class="capital">💰 <strong>Capital:</strong> ${escapeHtml(capital)}</p>
                    <p class="availability"><strong>Availability:</strong> ${escapeHtml(availability)}</p>
                    ${descShort ? `<p class="description"><strong>Description:</strong> ${descShort}</p>` : ''}
                    <div class="recommendation-actions">
                        <a href="recommendation.html?id=${rec.id}" class="btn btn-secondary">View Full Details</a>
                    </div>
                </div>
            </div>
        `;
                }).join('');
    }

    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Escape HTML to prevent XSS
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});