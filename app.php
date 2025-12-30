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
    <title>Basotho Business Recommender</title>
    <link href="style.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            corePlugins: {
                preflight: false
            }
        };
    </script>
    <script defer src="scripts.js?v=<?php echo time(); ?>"></script>
    <style>
        /* Multi-step form styles */
        .step-indicator {
            margin-bottom: 2rem;
        }
        .step-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        .step-number {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background: #e5e7eb;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .step-item.active .step-number {
            background: #4f46e5;
            color: white;
        }
        .step-item.completed .step-number {
            background: #10b981;
            color: white;
        }
        .step-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #6b7280;
            text-align: center;
        }
        .step-item.active .step-label {
            color: #4f46e5;
            font-weight: 600;
        }
        .step-line {
            flex: 1;
            height: 2px;
            background: #e5e7eb;
            margin: 0 1rem;
        }
        .step-item.completed + .step-line {
            background: #10b981;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .skill-tag {
            padding: 0.5rem 1rem;
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .skill-tag:hover {
            background: #e5e7eb;
            border-color: #9ca3af;
        }
        .skill-tag.selected {
            background: #4f46e5;
            color: white;
            border-color: #4f46e5;
        }

        .selected-items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            min-height: 2rem;
        }
        .selected-item {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: #dbeafe;
            color: #1e40af;
            border-radius: 0.375rem;
            font-size: 0.875rem;
        }
        .selected-item .remove-btn {
            cursor: pointer;
            color: #dc2626;
            font-weight: bold;
        }
        .selected-item .remove-btn:hover {
            color: #b91c1c;
        }

        /* Business idea color coding */
        .idea-1 {
            background-color: #e8f5e8;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .idea-2 {
            background-color: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .idea-3 {
            background-color: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
        }

        .asset-checkboxes label {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .asset-checkboxes input[type="checkbox"] {
            margin-right: 0.5rem;
        }

        .step-navigation {
            margin-top: 2rem;
        }
        .btn-primary, .btn-secondary {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .btn-primary {
            background: #4f46e5;
            color: white;
            border: none;
        }
        .btn-primary:hover {
            background: #4338ca;
        }
        .btn-secondary {
            background: white;
            color: #4f46e5;
            border: 1px solid #d1d5db;
        }
        .btn-secondary:hover {
            background: #f9fafb;
        }
    </style>
    <!-- Load Google Maps API -->
    <script
      defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANmakBmGmI3olHyqCu_73Ssp0Q61rj1e0&callback=initMap&loading=async"
    ></script>
    <!-- Puter AI Chatbot -->
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Language initialization is now handled globally in scripts.js
        // Keep function name for compatibility; delegate to global updater
        function updateAppLanguage() { updateLanguage(); }
    </script>


    <script>
    document.addEventListener("DOMContentLoaded", function() {
        // Store user_id safely in localStorage
        const userId = <?php echo $user_id; ?>;
        if (userId) {
            localStorage.setItem("user_id", userId);
            console.log("User ID stored in localStorage:", localStorage.getItem("user_id"));
        } else {
            console.error("User ID not set in session - please log in again");
        }
        
        // Load AI-powered business support organizations
        loadOrganizationsFromAPI();
    });
    </script>
</head>
<body class="bg-gray-100 font-poppins">

    <!-- Top navigation bar -->
    <header class="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-40" style="display:flex; justify-content:space-between; align-items:center;">
        <h1 class="text-lg font-semibold" data-lang="brand">Basotho Business Recommender</h1>
        <div class="flex items-center gap-4" style="display:flex; align-items:center; gap:16px;">
            <span class="text-sm"><span data-lang="welcome">Welcome,</span> <?php echo $username; ?>!</span>
            <a href="contact.html" class="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium" style="background:#ffffff; color:#4f46e5; border:1px solid #e5e7eb; padding:8px 12px; border-radius:8px; cursor:pointer;" data-lang="nav-contact">Contact</a>
            <button type="button" onclick="window.location.href='business-recommender/auth/logout.php'" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors" style="background:#dc2626; color:#fff; border:none; padding:8px 14px; border-radius:8px; cursor:pointer;" data-lang="logout">Logout</button>
            <button id="langToggle" class="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors" data-lang="lang-toggle">Sesotho</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="text-center py-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white" style="margin-top: 80px;">
        <h2 class="text-3xl font-bold mb-2" data-lang="hero-title">Discover Your Business Opportunity</h2>
        <p class="text-base opacity-90" data-lang="hero-sub">
            Enter your skills, interests, and resources. We'll suggest fitting business ideas for you.
        </p>
        <div class="mt-4">
            <span id="websiteAvgRating" class="average-rating-badge"></span>
        </div>
    </section>

    <!-- Multi-Step Input Form Section -->
    <main class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <h3 class="text-xl font-semibold mb-4" data-lang="form-title">Tell us about yourself</h3>

        <!-- Step Indicator -->
        <div class="step-indicator mb-6">
            <div class="flex justify-between items-center">
                <div class="step-item active" data-step="1">
                    <div class="step-number">1</div>
                    <div class="step-label" data-lang="step-label-skills">Skills</div>
                </div>
                <div class="step-line"></div>
                <div class="step-item" data-step="2">
                    <div class="step-number">2</div>
                    <div class="step-label" data-lang="step-label-interests">Interests</div>
                </div>
                <div class="step-line"></div>
                <div class="step-item" data-step="3">
                    <div class="step-number">3</div>
                    <div class="step-label" data-lang="step-label-capital">Capital & Assets</div>
                </div>
                <div class="step-line"></div>
                <div class="step-item" data-step="4">
                    <div class="step-number">4</div>
                    <div class="step-label" data-lang="step-label-location">Location</div>
                </div>
            </div>
        </div>

        <form id="userForm" class="space-y-4">
            <!-- Step 1: Skills -->
            <div class="step-content" data-step="1">
                <h4 class="text-lg font-medium mb-3" data-lang="step-1-title">Step 1: Skills</h4>
                <p class="text-sm text-gray-600 mb-4" data-lang="step-1-desc">Pick from the list or type your skills:</p>

                <!-- Predefined skills -->
                <div class="skill-tags mb-4">
                    <button type="button" class="skill-tag" data-skill="Cooking" data-lang="skill-cooking">Cooking</button>
                    <button type="button" class="skill-tag" data-skill="Carpentry" data-lang="skill-carpentry">Carpentry</button>
                    <button type="button" class="skill-tag" data-skill="Marketing" data-lang="skill-marketing">Marketing</button>
                    <button type="button" class="skill-tag" data-skill="Teaching" data-lang="skill-teaching">Teaching</button>
                    <button type="button" class="skill-tag" data-skill="Driving" data-lang="skill-driving">Driving</button>
                    <button type="button" class="skill-tag" data-skill="Writing" data-lang="skill-writing">Writing</button>
                    <button type="button" class="skill-tag" data-skill="Photography" data-lang="skill-photography">Photography</button>
                    <button type="button" class="skill-tag" data-skill="Programming" data-lang="skill-programming">Programming</button>
                </div>

                <!-- Custom skill input -->
                <div class="flex gap-2 mb-4">
                    <input type="text" id="customSkill" class="input-box flex-grow" data-lang="custom-skill-placeholder" placeholder="Type your own skill..." />
                    <button type="button" id="addCustomSkill" class="btn-secondary px-4 py-2" data-lang="add-skill">+ Add</button>
                </div>

                <!-- Selected skills display -->
                <div id="selectedSkills" class="selected-items"></div>
                <input type="hidden" id="skills" name="skills" />
            </div>

            <!-- Step 2: Interests -->
            <div class="step-content hidden" data-step="2">
                <h4 class="text-lg font-medium mb-3" data-lang="step-2-title">Step 2: Interests</h4>
                <p class="text-sm text-gray-600 mb-4" data-lang="step-2-desc">What topics excite you?</p>

                <!-- Predefined interests -->
                <div class="skill-tags mb-4">
                    <button type="button" class="skill-tag" data-skill="Technology" data-lang="interest-technology">Technology</button>
                    <button type="button" class="skill-tag" data-skill="Farming" data-lang="interest-farming">Farming</button>
                    <button type="button" class="skill-tag" data-skill="Fashion" data-lang="interest-fashion">Fashion</button>
                    <button type="button" class="skill-tag" data-skill="Music" data-lang="interest-music">Music</button>
                    <button type="button" class="skill-tag" data-skill="Sports" data-lang="interest-sports">Sports</button>
                    <button type="button" class="skill-tag" data-skill="Art" data-lang="interest-art">Art</button>
                    <button type="button" class="skill-tag" data-skill="Health" data-lang="interest-health">Health</button>
                    <button type="button" class="skill-tag" data-skill="Education" data-lang="interest-education">Education</button>
                </div>

                <!-- Custom interest input -->
                <div class="flex gap-2 mb-4">
                    <input type="text" id="customInterest" class="input-box flex-grow" data-lang="custom-interest-placeholder" placeholder="Type your own interest..." />
                    <button type="button" id="addCustomInterest" class="btn-secondary px-4 py-2" data-lang="add-interest">+ Add</button>
                </div>

                <!-- Selected interests display -->
                <div id="selectedInterests" class="selected-items"></div>
                <input type="hidden" id="interests" name="interests" />
            </div>

            <!-- Step 3: Capital & Assets -->
            <div class="step-content hidden" data-step="3">
                <h4 class="text-lg font-medium mb-3" data-lang="step-3-title">Step 3: Capital & Assets</h4>
                <p class="text-sm text-gray-600 mb-4" data-lang="step-3-desc">How much do you have available?</p>

                <!-- Money input -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" data-lang="money-label">Money:</label>
                    <input type="text" id="moneyAmount" class="input-box" data-lang="money-placeholder" placeholder="e.g., M5000, $1000" />
                </div>

                <!-- Assets checkboxes -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" data-lang="assets-label">Assets:</label>
                    <div class="asset-checkboxes space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" id="assetLaptop" class="mr-2" />
                            <span data-lang="asset-laptop">Laptop</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="assetTools" class="mr-2" />
                            <span data-lang="asset-tools">Tools</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="assetVehicle" class="mr-2" />
                            <span data-lang="asset-vehicle">Vehicle</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="assetPhone" class="mr-2" />
                            <span data-lang="asset-phone">Smartphone</span>
                        </label>
                    </div>
                </div>

                <!-- Custom asset input -->
                <div class="flex gap-2 mb-4">
                    <input type="text" id="customAsset" class="input-box flex-grow" data-lang="custom-asset-placeholder" placeholder="Type your own asset..." />
                    <button type="button" id="addCustomAsset" class="btn-secondary px-4 py-2" data-lang="add-asset">+ Add asset</button>
                </div>

                <!-- Selected assets display -->
                <div id="selectedAssets" class="selected-items"></div>
                <input type="hidden" id="capital" name="capital" />
            </div>

            <!-- Step 4: Location -->
            <div class="step-content hidden" data-step="4">
                <h4 class="text-lg font-medium mb-3" data-lang="step-4-title">Step 4: Where do you live?</h4>
                <p class="text-sm text-gray-600 mb-4" data-lang="step-4-desc">Your location helps us suggest local business ideas.</p>

                <!-- Location dropdown -->
                <div class="mb-4">
                    <label for="locationDropdown" class="block text-sm font-medium mb-2" data-lang="location">Location</label>
                    <select id="locationDropdown" class="input-box w-full">
                        <option value="" data-lang="select-town">Select town/village</option>
                        <option value="Maseru">Maseru</option>
                        <option value="Leribe">Leribe</option>
                        <option value="Berea">Berea</option>
                        <option value="Mafeteng">Mafeteng</option>
                        <option value="Mohale's Hoek">Mohale's Hoek</option>
                        <option value="Quthing">Quthing</option>
                        <option value="Qacha's Nek">Qacha's Nek</option>
                        <option value="Mokhotlong">Mokhotlong</option>
                        <option value="Thaba-Tseka">Thaba-Tseka</option>
                        <option value="Semonkong">Semonkong</option>
                    </select>
                </div>

                <!-- OR GPS option -->
                <div class="text-center mb-4">
                    <span class="text-sm text-gray-500" data-lang="or-text">OR</span>
                </div>

                <!-- GPS button -->
                <div class="text-center mb-4">
                    <button type="button" id="getLocationBtn" class="btn-secondary" data-lang="detect-gps">Detect with GPS</button>
                </div>

                <!-- Location input (will be populated by dropdown or GPS) -->
                <input type="text" id="location" class="input-box w-full" placeholder="Your location will appear here..." readonly />

                <!-- Map -->
                <div id="map" style="width:100%; height:250px; margin-top:10px; border-radius:10px;"></div>
                <div id="errorMessage" class="error text-red-600 text-sm mt-2 hidden"></div>

                <!-- Availability (moved to final step) -->
                <div class="mt-6">
                    <label class="block text-sm font-medium mb-1" data-lang="availability">Availability</label>
                    <p class="text-xs text-gray-600 mb-2" data-lang="availability-desc">How much time can you dedicate to your business?</p>
                    <select id="availability" class="input-box" required>
                        <option value="" disabled selected data-lang="choose-option">-- Choose one --</option>
                        <option value="weekends-only" data-lang="weekends-only">Weekends Only</option>
                        <option value="evenings" data-lang="evenings">Evenings</option>
                        <option value="part-time" data-lang="part">Part-Time</option>
                        <option value="full-time" data-lang="full">Full-Time</option>
                    </select>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="step-navigation flex justify-between mt-6">
                <button type="button" id="prevBtn" class="btn-secondary hidden" data-lang="previous">Previous</button>
                <div class="flex gap-3 flex-wrap">
                    <button type="button" id="nextBtn" class="btn-primary" data-lang="next-step">Next Step</button>
                    <button type="submit" id="submitBtn" class="btn-primary hidden" data-lang="submit">Discover My Business Idea</button>
                    <button type="button" id="feedbackBtn" onclick="window.location.href='idea-feedback.html'" class="btn-secondary" style="background:#10b981; color:white; border:none;" data-lang="get-feedback">💭 Get Feedback on Idea</button>
                </div>
                <div class="text-xs text-gray-500 mt-2">
                    💡 <span data-lang="feedback-hint">Get AI feedback on your business idea anytime</span>
                </div>
            </div>
        </form>
    </main>
    <!-- Multi-Step Form JavaScript -->
    <script>
        // Multi-step form functionality
        let currentStep = 1;
        const totalSteps = 4;
        let selectedSkills = [];
        let selectedInterests = [];
        let selectedAssets = [];

        // Initialize form
        document.addEventListener('DOMContentLoaded', function() {
            initializeMultiStepForm();
            bindGpsButtonOnce(); // Keep existing GPS functionality
        });

        function initializeMultiStepForm() {
            // Navigation buttons
            document.getElementById('nextBtn').addEventListener('click', nextStep);
            document.getElementById('prevBtn').addEventListener('click', prevStep);

            // Skill selection
            document.querySelectorAll('.skill-tag[data-skill]').forEach(tag => {
                tag.addEventListener('click', function() {
                    const skill = this.dataset.skill;
                    const step = this.closest('.step-content').dataset.step;
                    if (step === '1') {
                        toggleSkill(skill, selectedSkills, 'selectedSkills');
                    } else if (step === '2') {
                        toggleSkill(skill, selectedInterests, 'selectedInterests');
                    }
                    this.classList.toggle('selected');
                });
            });

            // Custom skill/interest addition
            document.getElementById('addCustomSkill').addEventListener('click', function() {
                const input = document.getElementById('customSkill');
                const skill = input.value.trim();
                if (skill) {
                    addCustomItem(skill, selectedSkills, 'selectedSkills');
                    input.value = '';
                }
            });

            document.getElementById('addCustomInterest').addEventListener('click', function() {
                const input = document.getElementById('customInterest');
                const interest = input.value.trim();
                if (interest) {
                    addCustomItem(interest, selectedInterests, 'selectedInterests');
                    input.value = '';
                }
            });

            // Enter key support for custom inputs
            document.getElementById('customSkill').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('addCustomSkill').click();
                }
            });

            document.getElementById('customInterest').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('addCustomInterest').click();
                }
            });

            // Asset checkboxes
            document.querySelectorAll('.asset-checkboxes input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const asset = this.parentElement.textContent.trim();
                    if (this.checked) {
                        if (!selectedAssets.includes(asset)) {
                            selectedAssets.push(asset);
                        }
                    } else {
                        selectedAssets = selectedAssets.filter(a => a !== asset);
                    }
                    updateSelectedAssets();
                });
            });

            // Custom asset addition
            document.getElementById('addCustomAsset').addEventListener('click', function() {
                const input = document.getElementById('customAsset');
                const asset = input.value.trim();
                if (asset) {
                    selectedAssets.push(asset);
                    updateSelectedAssets();
                    input.value = '';
                }
            });

            document.getElementById('customAsset').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('addCustomAsset').click();
                }
            });

            // Location dropdown
            document.getElementById('locationDropdown').addEventListener('change', function() {
                document.getElementById('location').value = this.value;
            });

            // Update hidden inputs
            updateHiddenInputs();
        }

        function toggleSkill(skill, array, displayId) {
            const index = array.indexOf(skill);
            if (index > -1) {
                array.splice(index, 1);
            } else {
                array.push(skill);
            }
            updateSelectedDisplay(displayId, array);
            updateHiddenInputs();
        }

        function addCustomItem(item, array, displayId) {
            if (!array.includes(item)) {
                array.push(item);
                updateSelectedDisplay(displayId, array);
                updateHiddenInputs();
            }
        }

        function updateSelectedDisplay(displayId, array) {
            const container = document.getElementById(displayId);
            container.innerHTML = '';
            array.forEach(item => {
                const itemEl = document.createElement('span');
                itemEl.className = 'selected-item';
                itemEl.innerHTML = `${item} <span class="remove-btn" onclick="removeItem('${item}', '${displayId === 'selectedSkills' ? 'skills' : 'interests'}')">&times;</span>`;
                container.appendChild(itemEl);
            });
        }

        function updateSelectedAssets() {
            const container = document.getElementById('selectedAssets');
            container.innerHTML = '';
            selectedAssets.forEach(asset => {
                const itemEl = document.createElement('span');
                itemEl.className = 'selected-item';
                itemEl.innerHTML = `${asset} <span class="remove-btn" onclick="removeAsset('${asset}')">&times;</span>`;
                container.appendChild(itemEl);
            });
            updateHiddenInputs();
        }

        function removeItem(item, type) {
            if (type === 'skills') {
                selectedSkills = selectedSkills.filter(s => s !== item);
                updateSelectedDisplay('selectedSkills', selectedSkills);
            } else if (type === 'interests') {
                selectedInterests = selectedInterests.filter(i => i !== item);
                updateSelectedDisplay('selectedInterests', selectedInterests);
            }
            updateHiddenInputs();
        }

        function removeAsset(asset) {
            selectedAssets = selectedAssets.filter(a => a !== asset);
            updateSelectedAssets();
        }

        function updateHiddenInputs() {
            document.getElementById('skills').value = selectedSkills.join(', ');
            document.getElementById('interests').value = selectedInterests.join(', ');

            // Combine money and assets for capital
            const money = document.getElementById('moneyAmount').value.trim();
            const capitalParts = [];
            if (money) capitalParts.push(`Money: ${money}`);
            selectedAssets.forEach(asset => {
                capitalParts.push(`${asset}: ✓`);
            });
            document.getElementById('capital').value = capitalParts.join(', ');
        }

        function nextStep() {
            if (currentStep < totalSteps) {
                // Validation
                if (!validateCurrentStep()) return;

                // Update step indicator
                document.querySelector(`.step-item[data-step="${currentStep}"]`).classList.add('completed');
                document.querySelector(`.step-item[data-step="${currentStep + 1}"]`).classList.add('active');

                // Hide current step, show next
                document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('hidden');
                document.querySelector(`.step-content[data-step="${currentStep + 1}"]`).classList.remove('hidden');

                currentStep++;

                // Update navigation
                updateNavigation();
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                // Update step indicator
                document.querySelector(`.step-item[data-step="${currentStep}"]`).classList.remove('active');
                document.querySelector(`.step-item[data-step="${currentStep - 1}"]`).classList.remove('completed');
                document.querySelector(`.step-item[data-step="${currentStep - 1}"]`).classList.add('active');

                // Hide current step, show previous
                document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('hidden');
                document.querySelector(`.step-content[data-step="${currentStep - 1}"]`).classList.remove('hidden');

                currentStep--;

                // Update navigation
                updateNavigation();
            }
        }

        function updateNavigation() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            const feedbackBtn = document.getElementById('feedbackBtn');

            if (currentStep === 1) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }

            if (currentStep === totalSteps) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
            // Feedback button is always visible
            feedbackBtn.classList.remove('hidden');
        }

        function validateCurrentStep() {
            switch(currentStep) {
                case 1:
                    return selectedSkills.length > 0;
                case 2:
                    return selectedInterests.length > 0;
                case 3:
                    return document.getElementById('moneyAmount').value.trim() || selectedAssets.length > 0;
                case 4:
                    return document.getElementById('location').value.trim() && document.getElementById('availability').value;
                default:
                    return true;
            }
        }

        // Keep existing tellIdeaBtn functionality
        (function(){
            const btn = document.getElementById('tellIdeaBtn');
            if (!btn) return;
            btn.addEventListener('click', function(){
                const qs = new URLSearchParams({
                    skills: document.getElementById('skills')?.value || '',
                    interests: document.getElementById('interests')?.value || '',
                    capital: document.getElementById('capital')?.value || '',
                    location: document.getElementById('location')?.value || '',
                    availability: document.getElementById('availability')?.value || '',
                    lang: window.currentLang || localStorage.getItem('selectedLanguage') || 'en'
                }).toString();
                window.location.href = 'idea-feedback.html?' + qs;
            });
        })();
    </script>

    <!-- Results Section -->
    <section id="results" class="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg hidden">
        <h3 class="text-xl font-semibold mb-4" data-lang="result-title">Your Top 3 Business Ideas</h3>
        <div id="loading" class="flex items-center gap-2 text-indigo-600 mb-4 hidden">
            <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-600"></div>
            <span id="loadingText" data-lang="generating">Generating recommendation…</span>
        </div>
        <div id="businessIdea" class="text-gray-700"></div>
        <!-- App Rating Section (hidden until a recommendation with ID is present) -->
        <div id="appRatingSection" class="rating-card hidden">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:.5rem; flex-wrap:wrap;">
                <div><strong data-lang="rate-recommendation">Rate this recommendation</strong></div>
                <div id="appAvgRating" class="average-rating-badge" aria-live="polite"></div>
            </div>
            <div class="stars" id="appStarContainer" role="radiogroup" aria-label="Rating"></div>
            <div class="rating-hint" data-lang="rating-hint">Click or tap a star to rate. Use left/right arrows for keyboard.</div>
            <div class="rating-actions">
                <button id="appSubmitRating" class="btn-primary" type="button" data-lang="submit-rating">Submit Rating</button>
                <div class="rating-note" data-lang="rating-note">Your feedback helps improve future recommendations.</div>
            </div>
        </div>
    </section>

    <!-- Business Support Section -->
    <section id="businessSupport" class="max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold" data-lang="support-title">Business Support & Funding</h2>
            <div id="dataSourceIndicator" class="mt-2">
                <span id="dataSourceText" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <div class="w-2 h-2 bg-gray-400 rounded-full mr-2" id="dataSourceDot"></div>
                    Initializing AI data source...
                </span>
            </div>
        </div>
        <div id="organizationsLoading" class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            <span class="ml-3 text-gray-600">Loading business organizations...</span>
        </div>
        <div id="organizationsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden">
            <!-- Dynamic organizations will be loaded here by AI -->
        </div>
    </section>

    <!-- History Section -->
    <section id="historySection" class="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg hidden">
        <h3 class="text-xl font-semibold mb-4" data-lang="history-title">Your Business History</h3>
        <div id="historyContainer"></div>
    </section>

    <!-- View History Button -->
    <div class="text-center mt-6">
        <button id="viewHistoryBtn" class="btn-secondary" style="padding:10px 18px; font-size:1rem; border-radius:8px;" data-lang="view-history">View My History</button>
    </div>

    <!-- Chatbot Section -->
    <div class="fixed bottom-1/2 right-4 z-50" style="transform: translateY(50%);">
        <button id="chatbotToggle" class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-colors" aria-label="Open AI Chat Assistant">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
        </button>
        <div id="chatbotContainer" class="hidden absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col">
            <div class="bg-indigo-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 class="font-semibold" data-lang="chatbot-title">AI Assistant</h3>
                <button id="chatbotClose" class="text-white hover:text-gray-200" aria-label="Close chat">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatMessages" class="flex-1 p-3 overflow-y-auto bg-gray-50">
                <div class="text-center text-gray-500 text-sm mt-4" data-lang="chatbot-greeting">
                    Hello! I'm your AI assistant. How can I help you with business ideas today?
                </div>
            </div>
            <div class="p-3 border-t border-gray-200">
                <div class="flex gap-2">
                    <input type="text" id="chatInput" placeholder="Ask me anything about business..." class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button id="chatSend" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors" data-lang="chat-send">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-center py-6 text-sm text-gray-500 mt-10" data-lang="footer-text">
        2025 Basotho Business Project
    </footer>
    <script>
        // Fetch and display the average website rating on dashboard
        document.addEventListener('DOMContentLoaded', async () => {
            const badge = document.getElementById('websiteAvgRating');
            if (!badge) return;
            try {
                const res = await fetch('business-recommender/website_rating.php', { cache: 'no-store' });
                const data = await res.json();
                if (data.success && data.rating) {
                    const lang = window.currentLang || localStorage.getItem('selectedLanguage') || 'en';
                    const translatedText = translations[lang] && translations[lang]['average-website-rating'] 
                        ? translations[lang]['average-website-rating'] 
                        : 'Average Website Rating';
                    badge.textContent = `🌟 ${translatedText}: ${data.rating} / 5`;
                }
            } catch (e) {
                // Keep silent if unavailable
            }
        });
    </script>
</body>
</html>
