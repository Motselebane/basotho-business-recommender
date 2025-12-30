<?php
session_start();

// Redirect to login if user is not logged in
if (!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
    header("Location: /Business%20Ideas/index.php");
    exit();
}

$user_id = intval($_SESSION['user_id']);
$username = htmlspecialchars($_SESSION['username'], ENT_QUOTES);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Feedback History</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { corePlugins: { preflight: false } }
    </script>
    <link href="style.css" rel="stylesheet" />
    <script defer src="scripts.js"></script>
    <style>
        .feedback-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 24px;
            margin-bottom: 24px;
            transition: all 0.3s ease;
        }
        .feedback-card:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            transform: translateY(-2px);
        }
        .feedback-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .feedback-date {
            color: #64748b;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .feedback-section {
            margin-bottom: 16px;
        }
        .feedback-label {
            font-weight: 600;
            color: #4f46e5;
            margin-bottom: 8px;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .feedback-content {
            color: #334155;
            line-height: 1.6;
            white-space: pre-wrap;
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #4f46e5;
        }
        .idea-text {
            background: #eff6ff;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            color: #1e40af;
            line-height: 1.6;
        }
        .meta-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
        }
        .meta-item {
            font-size: 0.875rem;
        }
        .meta-label {
            font-weight: 600;
            color: #64748b;
            margin-right: 4px;
        }
        .star-rating {
            display: inline-flex;
            gap: 4px;
            margin-left: 8px;
        }
        .star {
            color: #fbbf24;
            font-size: 1.25rem;
        }
        .empty-state {
            text-align: center;
            padding: 48px 24px;
            color: #64748b;
        }
        .empty-state-icon {
            font-size: 4rem;
            margin-bottom: 16px;
        }
        .rating-button {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s;
        }
        .rating-button:hover {
            background: #4338ca;
        }
        .rating-input {
            display: inline-flex;
            gap: 8px;
            align-items: center;
            margin-top: 8px;
        }
        .rating-stars {
            display: inline-flex;
            gap: 4px;
        }
        .rating-star {
            cursor: pointer;
            font-size: 1.5rem;
            color: #d1d5db;
            transition: color 0.2s;
        }
        .rating-star:hover,
        .rating-star.active {
            color: #fbbf24;
        }
    </style>
</head>
<body class="bg-gray-100 font-poppins">
    <!-- Top navigation bar -->
    <header class="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 class="text-lg font-semibold" data-lang="feedback-history-title">My Feedback History</h1>
        <div class="flex items-center gap-4">
            <span class="text-sm"><span data-lang="welcome">Welcome,</span> <?php echo $username; ?>!</span>
            <a href="app.php" class="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" data-lang="nav-app">Home</a>
            <a href="idea-feedback.html" class="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" data-lang="get-feedback">Get Feedback</a>
            <button id="langToggle" class="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium">Sesotho</button>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto mt-8 p-6">
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2" data-lang="your-feedback-history">Your Feedback History</h2>
            <p class="text-gray-600" data-lang="feedback-history-desc">View all your previous business idea feedback and ratings.</p>
        </div>

        <div id="loadingSpinner" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-gray-600" data-lang="loading">Loading your feedback...</p>
        </div>

        <div id="feedbackContainer" class="hidden"></div>

        <div id="emptyState" class="empty-state hidden">
            <div class="empty-state-icon">📝</div>
            <h3 class="text-xl font-semibold mb-2" data-lang="no-feedback-yet">No Feedback Yet</h3>
            <p class="mb-4" data-lang="no-feedback-desc">You haven't received any business idea feedback yet.</p>
            <a href="idea-feedback.html" class="btn-primary inline-block" data-lang="get-first-feedback">Get Your First Feedback</a>
        </div>
    </main>

    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
        2025 Basotho Business Project
    </footer>

    <script>
        const userId = <?php echo $user_id; ?>;

        document.addEventListener('DOMContentLoaded', async () => {
            await loadFeedback();
        });

        async function loadFeedback() {
            const loadingSpinner = document.getElementById('loadingSpinner');
            const feedbackContainer = document.getElementById('feedbackContainer');
            const emptyState = document.getElementById('emptyState');

            try {
                const response = await fetch(`business-recommender/get_user_feedback.php?user_id=${userId}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // First, get the response as text
                const responseText = await response.text();
                
                // Log the raw response for debugging (remove in production)
                console.log('Raw response:', responseText.substring(0, 200) + '...');
                
                let data;
                try {
                    // Try to parse the JSON
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    // Try to find where the JSON might be malformed
                    const errorPosition = parseError.message.match(/position (\d+)/);
                    if (errorPosition) {
                        const position = parseInt(errorPosition[1]);
                        const start = Math.max(0, position - 50);
                        const end = Math.min(responseText.length, position + 50);
                        console.error('Error context:', responseText.substring(start, end));
                    }
                    throw new Error('Invalid response from server. The data could not be processed.');
                }

                loadingSpinner.classList.add('hidden');

                if (!data.success) {
                    throw new Error(data.error || 'Failed to load feedback');
                }

                if (data.feedbacks && data.feedbacks.length > 0) {
                    feedbackContainer.classList.remove('hidden');
                    renderFeedback(data.feedbacks);
                } else {
                    emptyState.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading feedback:', error);
                loadingSpinner.classList.add('hidden');
                feedbackContainer.classList.remove('hidden');
                feedbackContainer.innerHTML = `
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-red-700">
                                    Failed to load feedback. ${error.message || 'Please try again later.'}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        function renderFeedback(feedbacks) {
            const container = document.getElementById('feedbackContainer');
            container.innerHTML = '';

            feedbacks.forEach(feedback => {
                const card = createFeedbackCard(feedback);
                container.appendChild(card);
            });
        }

        function createFeedbackCard(feedback) {
            const card = document.createElement('div');
            card.className = 'feedback-card';

            // Safely format date
            let formattedDate = 'Date not available';
            try {
                const date = new Date(feedback.created_at);
                if (!isNaN(date.getTime())) {
                    formattedDate = date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            } catch (e) {
                console.warn('Error formatting date:', e);
            }

            // Safely escape HTML and handle undefined/null values
            const escapeHtml = (unsafe) => {
                if (unsafe === null || unsafe === undefined) return '';
                return String(unsafe)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            };

            // Format feedback text with proper line breaks
            const formatFeedbackText = (text) => {
                if (!text) return '';
                return escapeHtml(text)
                    .replace(/\n/g, '<br>')  // Convert newlines to <br>
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text between **
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');  // Italic text between *
            };

            // Rating display with proper escaping
            let ratingHTML = '';
            if (feedback.rating && !isNaN(parseInt(feedback.rating))) {
                const rating = Math.min(5, Math.max(1, parseInt(feedback.rating)));
                const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                ratingHTML = `<div class="star-rating" title="${rating} out of 5 stars">${stars}</div>`;
            } else {
                ratingHTML = `
                    <button 
                        class="rating-button" 
                        onclick="showRatingInput(${escapeHtml(String(feedback.id || ''))})" 
                        data-lang="add-rating"
                    >
                        Add Rating
                    </button>`;
            }

            // Generate meta info HTML if any meta data exists
            const metaInfo = [];
            if (feedback.skills) metaInfo.push(`<div class="meta-item"><span class="meta-label" data-lang="skills">Skills:</span>${escapeHtml(feedback.skills)}</div>`);
            if (feedback.interests) metaInfo.push(`<div class="meta-item"><span class="meta-label" data-lang="interests">Interests:</span>${escapeHtml(feedback.interests)}</div>`);
            if (feedback.capital) metaInfo.push(`<div class="meta-item"><span class="meta-label" data-lang="capital">Capital:</span>${escapeHtml(feedback.capital)}</div>`);
            if (feedback.location) metaInfo.push(`<div class="meta-item"><span class="meta-label" data-lang="location">Location:</span>${escapeHtml(feedback.location)}</div>`);

            card.innerHTML = `
                <div class="feedback-header">
                    <div>
                        <div class="feedback-date">${formattedDate}</div>
                        <div id="ratingDisplay${feedback.id}">${ratingHTML}</div>
                        <div id="ratingInput${feedback.id}" class="rating-input" style="display:none;">
                            <div class="rating-stars">
                                ${[1,2,3,4,5].map(star => 
                                    `<span 
                                        class="rating-star" 
                                        data-star="${star}" 
                                        onclick="selectRating(${feedback.id}, ${star})"
                                        onmouseover="highlightStars(${feedback.id}, ${star})"
                                        onmouseout="resetStars(${feedback.id})"
                                    >☆</span>`
                                ).join('')}
                            </div>
                            <button class="rating-button" onclick="submitRating(${feedback.id})" data-lang="submit">Submit</button>
                            <button class="rating-button" style="background:#6b7280;" onclick="hideRatingInput(${feedback.id})" data-lang="cancel">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="feedback-section">
                    <div class="feedback-label" data-lang="your-idea">Your Business Idea</div>
                    <div class="idea-text">${formatFeedbackText(feedback.idea || '')}</div>
                </div>

                <div class="feedback-section">
                    <div class="feedback-label" data-lang="ai-feedback">AI Feedback</div>
                    <div class="feedback-content">${formatFeedbackText(feedback.feedback || '')}</div>
                </div>

                ${metaInfo.length > 0 ? `
                <div class="meta-info">
                    ${metaInfo.join('')}
                </div>
                ` : ''}
            `;

            return card;
        }

        let selectedRating = 0;
        let hoverRating = 0;

        // Highlight stars on hover
        function highlightStars(feedbackId, star) {
            const stars = document.querySelectorAll(`#ratingInput${feedbackId} .rating-star`);
            stars.forEach((starEl, index) => {
                starEl.textContent = index < star ? '★' : '☆';
                starEl.style.color = index < star ? '#fbbf24' : '#d1d5db';
            });
            hoverRating = star;
        }

        // Reset stars to selected rating when mouse leaves
        function resetStars(feedbackId) {
            const stars = document.querySelectorAll(`#ratingInput${feedbackId} .rating-star`);
            const currentRating = selectedRating || 0;
            stars.forEach((starEl, index) => {
                starEl.textContent = index < currentRating ? '★' : '☆';
                starEl.style.color = index < currentRating ? '#fbbf24' : '#d1d5db';
            });
        }

        function showRatingInput(feedbackId) {
            document.getElementById(`ratingDisplay${feedbackId}`).style.display = 'none';
            document.getElementById(`ratingInput${feedbackId}`).style.display = 'flex';
            selectedRating = 0;
        }

        function hideRatingInput(feedbackId) {
            document.getElementById(`ratingDisplay${feedbackId}`).style.display = 'block';
            document.getElementById(`ratingInput${feedbackId}`).style.display = 'none';
            selectedRating = 0;
        }

        function selectRating(feedbackId, star) {
            selectedRating = star;
            const stars = document.querySelectorAll(`#ratingInput${feedbackId} .rating-star`);
            stars.forEach((starEl, index) => {
                if (index < star) {
                    starEl.classList.add('active');
                    starEl.textContent = '★';
                } else {
                    starEl.classList.remove('active');
                    starEl.textContent = '☆';
                }
            });
        }

        async function submitRating(feedbackId) {
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }

            const submitBtn = document.querySelector(`#ratingInput${feedbackId} .rating-button[data-lang="submit"]`);
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Saving...';

                const response = await fetch('business-recommender/update_feedback_rating.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        feedback_id: feedbackId,
                        rating: selectedRating,
                        user_id: userId
                    })
                });

                // First, get the response as text
                const responseText = await response.text();
                let data;

                try {
                    // Try to parse the response as JSON
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('Error parsing JSON response:', parseError);
                    console.error('Raw response:', responseText);
                    throw new Error('Invalid response from server. Please try again.');
                }

                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                if (!data.success) {
                    throw new Error(data.error || 'Failed to save rating');
                }

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'text-green-600 text-sm mt-2';
                successMsg.textContent = data.message || 'Rating saved successfully';
                
                const ratingContainer = document.getElementById(`ratingInput${feedbackId}`);
                ratingContainer.parentNode.insertBefore(successMsg, ratingContainer.nextSibling);

                // Reload feedback to show updated rating
                await loadFeedback();

            } catch (error) {
                console.error('Error submitting rating:', error);
                
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'text-red-600 text-sm mt-2';
                errorMsg.textContent = error.message || 'Failed to save rating. Please try again.';
                
                const ratingContainer = document.getElementById(`ratingInput${feedbackId}`);
                const existingError = ratingContainer.parentNode.querySelector('.text-red-600');
                
                if (existingError) {
                    existingError.textContent = errorMsg.textContent;
                } else {
                    ratingContainer.parentNode.insertBefore(errorMsg, ratingContainer.nextSibling);
                }
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function formatFeedback(text) {
            if (!text) return '';
            // Remove asterisks and highlight key sections
            return text
                .replace(/\*/g, '')
                .replace(/(Summary|How to make it successful|Risks|Mitigations|Step-by-step plan|Budget alignment|Kakaretso|Mokhoa oa ho atleha|Likotsi|Mekhoa ea ho fokotsa likotsi|Mehato ka mehato|Tekanyetso le Budget)/gi,
                    m => `<span style="color:#4f46e5; font-weight:600;">${m}</span>`);
        }
    </script>
</body>
</html>
