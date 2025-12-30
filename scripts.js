/**
 * Handles the front-end for the Basotho Business Recommender app.
 * Manages user interactions, form submissions, and service communication.
 */

// Translation strings for multilingual support (English and Sesotho)
const translations = {
    en: {
        "hero-title": "Discover Your Business Opportunity",
        "hero-sub": "Enter your skills, interests, and resources. We'll suggest fitting business ideas for you.",
        "form-title": "Tell us about yourself",
        "skills": "Your Skills",
        "skills-desc": "List your skills separated by commas (e.g., cooking, carpentry, marketing).",
        "interests": "Your Interests",
        "interests-desc": "What topics or activities excite you? (e.g., technology, farming, fashion).",
        "capital": "Available Capital/Assets",
        "capital-desc": "How much money or assets do you have available? (e.g., M5000, laptop, tools).",
        "location": "Location",
        "location-desc": "Where are you based? This helps us suggest location-specific ideas.",
        "location-privacy": "Your location will be used for recommendations and saved with your recommendation history.",
        "gps-btn": "Use GPS",
        "availability": "Availability",
        "availability-desc": "How much time can you dedicate to your business?",
        "weekends-only": "Weekends Only",
        "evenings": "Evenings",
        "part": "Part-Time",
        "full": "Full-Time",
        "submit": "Discover My Business Idea",
        "result-title": "Your Top 3 Business Ideas",
        "generating": "Generating your top 3 business ideas...",
        "loading": "Generating recommendation...",
        "problem-solved": "Problem Solved",
        "session-expired": "Your session has expired. Please log in again to get personalized recommendations.",
        "missing-fields": "Please fill in all required fields before submitting.",
        "network-error": "Unable to connect to the server. Please check your internet connection and try again.",
        "server-error": "Server error. Our team has been notified. Please try again later.",
        "rate-limit": "Too many requests. Please wait a moment and try again.",
        "invalid-input": "Invalid input data. Please check your information and try again.",
        "service-unavailable": "Service temporarily unavailable. Please try again in a few minutes.",
        "no-recommendation": "No recommendation could be generated. Please try with different information.",
        "auth-required": "Your session has expired. Please log in again.",
        "access-denied": "Access denied. Please log in again.",
        "not-found": "Recommendation not found. It may have been deleted.",
        "db-error": "Database connection issue. Our team has been notified.",
        "my-recommendations": "My Recommendations",
        "new-recommendation": "New Recommendation",
        "logout": "Logout",
        "loading-recommendations": "Loading your recommendations...",
        "no-recommendations": "You don't have any recommendations yet.",
        "get-first-recommendation": "Get Your First Recommendation",
        "skills-label": "Skills:",
        "interests-label": "Interests:",
        "location-label": "Location:",
        "capital-label": "Capital:",
        "availability-label": "Availability:",
        "description-label": "Description:",
        "view-full-details": "View Full Details",
        "recommendation-details": "Recommendation Details",
        "back-to-history": "Back to History",
        "loading-details": "Loading recommendation details...",
        "business-description": "Business Description",
        "problem-solved": "Problem Solved",
        "why-this-fits": "Why This Fits You",
        "estimated-capital": "Estimated Capital:",
        "suggested-schedule": "Suggested Schedule:",
        "your-skills": "Your Skills:",
        "your-interests": "Your Interests:",
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "login-btn": "Login",
        "no-account": "Don't have an account?",
        "register-here": "Register here",
        "already-account": "Already have an account?",
        "login-here": "Login here",
        "register": "Register",
        "confirm-password": "Confirm Password:",
        "register-btn": "Register",
        "support-title": "Business Support & Funding",
        "bedco-desc": "Basotho Enterprise Development Corporation - Supporting business growth and development in Lesotho.",
        "lndc-desc": "Lesotho National Development Corporation - Promoting industrial and commercial development.",
        "sme-desc": "Small, Medium and Micro Enterprises - Supporting small business development and entrepreneurship.",
        "bedco-address": "Kingsway Road, Maseru, Lesotho",
        "lndc-address": "Pioneer Road, Maseru, Lesotho",
        "sme-address": "Ministry of Trade, Maseru, Lesotho",
        "bedco-name": "BEDCO",
        "lndc-name": "LNDC",
        "smme-name": "SMME Unit",
        "history-title": "Your Business History",
        "chatbot-title": "AI Assistant",
        "chat-send": "Send",
        "chatInput-placeholder": "Ask me anything about business...",
        "visit-website": "Visit Website",
        "brand": "Basotho Business Recommender",
        "brand-app": "Basotho Business Recommender",
        "brand-site": "Basotho Business Ideas",
        "nav-app": "Home",
        "nav-history": "History",
        "nav-contact": "Contact",
        "nav-login": "Login",
        "nav-register": "Register",
        "view-history": "View My History",
        "welcome": "Welcome,",
        "contact-title": "Contact Support",
        "contact-intro": "If you're experiencing issues with the app, reach out and we'll help you as soon as possible.",
        "contact-email": "Email",
        "contact-phone": "Phone",
        "contact-whatsapp": "WhatsApp",
        "contact-helpful-title": "Helpful details to include",
        "contact-helpful-1": "What you were trying to do",
        "contact-helpful-2": "Any error message shown",
        "contact-helpful-3": "Your browser and device",
        "contact-helpful-4": "Time the issue occurred",
        "back-to-app": "← Back to Home",
        "local-support-title": "Local Business Support Contacts",
        "local-support-desc": "You can also reach out to the following organizations for broader business support:",
        "tell-idea-btn": "Tell me about my business idea",
        "idea-page-title": "Get Feedback On Your Idea",
        "idea-text-label": "Describe your business idea",
        "idea-placeholder": "Type your business idea here...",
        "get-feedback": "Get Feedback",
        "feedback-title": "AI Feedback",
        "idea-using-profile": "Using your profile and location to tailor the advice.",
        "idea-missing-profile": "Some profile details are missing. Feedback will be more general.",
        "rate-recommendation": "Rate this recommendation",
        "rating-hint": "Click or tap a star to rate. Use left/right arrows for keyboard.",
        "submit-rating": "Submit Rating",
        "rating-note": "Your feedback helps improve future recommendations.",
        "my-recommendations": "My Recommendations",
        "new-recommendation": "New Recommendation",
        "logout": "Logout",
        "loading-recommendations": "Loading your recommendations...",
        "no-recommendations": "You don't have any recommendations yet.",
        "get-first-recommendation": "Get Your First Recommendation",
        "login": "Login",
        "login-sub": "Access your account to discover tailored business ideas",
        "username": "Username:",
        "password": "Password:",
        "login-btn": "Login",
        "register-here": "Register here",
        "no-account": "Don't have an account?",
        "skills-placeholder": "e.g., Cooking, Carpentry, Marketing",
        "interests-placeholder": "e.g., Technology, Farming, Fashion",
        "capital-placeholder": "e.g., M5000, Laptop, Tools",
        "location-placeholder": "e.g., Maseru, Berea District",
        "generating-feedback": "Generating feedback...",
        "alert-type-idea": "Please type your business idea first.",
        "unable-get-feedback": "Unable to get feedback. Please try again later.",
        "message-whatsapp": "Message us on WhatsApp",
        "ideaText-placeholder": "Type your business idea here...",
        "register": "Register",
        "register-sub": "Create your account to start getting personalized recommendations",
        "register-btn": "Register",
        "confirm-password": "Confirm Password:",
        "already-account": "Already have an account?",
        "login-here": "Login here",
        "average-website-rating": "Average Website Rating",
        "select-for-save": "Save to Database",
        "store-selected-ideas": "Store Selected Ideas",
        "rate-this-idea": "Rate this idea:",
        "select-ideas-instruction": "Select ideas using checkboxes and rate them, then click to save to your account",
        "forgot-password-title": "Forgot your password?",
        "forgot-password-desc": "Enter your account email. We'll send you a link to reset your password.",
        "email-label": "Email",
        "send-reset-link": "Send reset link",
        "back-to-login": "← Back to Login",
        "reset-password-title": "Reset Your Password",
        "new-password-label": "New Password",
        "confirm-password-label": "Confirm Password",
        "reset-password-btn": "Reset Password",
        "back-to-forgot": "Back",
        "password-reset-success": "Your password has been reset successfully! You can now log in with your new password.",
        "invalid-reset-link": "Invalid or expired reset link.",
        "passwords-do-not-match": "Passwords do not match.",
        "email-sent-success": "Password reset email has been sent successfully! Please check your inbox (and spam folder).",
        "view-previous-feedback": "View Previous Feedback",
        "rate-feedback": "Rate this feedback",
        "step-1-title": "Step 1: Skills",
        "step-2-title": "Step 2: Interests",
        "step-3-title": "Step 3: Capital & Assets",
        "step-4-title": "Step 4: Where do you live?",
        "step-1-desc": "Pick from the list or type your skills:",
        "step-2-desc": "What topics excite you?",
        "step-3-desc": "How much do you have available?",
        "step-4-desc": "Your location helps us suggest local business ideas.",
        "next-step": "Next Step",
        "previous": "Previous",
        "customSkill-placeholder": "Type your own skill...",
        "customInterest-placeholder": "Type your own interest...",
        "moneyAmount-placeholder": "e.g., M5000, $1000",
        "customAsset-placeholder": "Type your own asset...",
        "add-skill": "+ Add",
        "add-interest": "+ Add",
        "add-asset": "+ Add asset",
        "select-town": "Select town/village",
        "or-text": "OR",
        "detect-gps": "Detect with GPS",
        "step-label-skills": "Skills",
        "step-label-interests": "Interests",
        "step-label-capital": "Capital & Assets",
        "step-label-location": "Location",
        "skill-cooking": "Cooking",
        "skill-carpentry": "Carpentry",
        "skill-marketing": "Marketing",
        "skill-teaching": "Teaching",
        "skill-driving": "Driving",
        "skill-writing": "Writing",
        "skill-photography": "Photography",
        "skill-programming": "Programming",
        "interest-technology": "Technology",
        "interest-farming": "Farming",
        "interest-fashion": "Fashion",
        "interest-music": "Music",
        "interest-sports": "Sports",
        "interest-art": "Art",
        "interest-health": "Health",
        "interest-education": "Education",
        "asset-laptop": "Laptop",
        "asset-tools": "Tools",
        "asset-vehicle": "Vehicle",
        "asset-phone": "Smartphone",
        "money-label": "Money:",
        "lpost-desc": "Lesotho Post Bank - Government-owned bank providing financial services and business support.",
        "lpost-address": "Kingsway Road, Maseru, Lesotho",
        "nmds-desc": "National Manpower Development Secretariat - Providing training and mentoring for business development.",
        "nmds-address": "Development House, Maseru, Lesotho",
        "mti-desc": "Ministry of Trade and Industry - Supporting trade, industry and business development in Lesotho.",
        "mti-address": "Kingsway Road, Maseru, Lesotho",
        "lesotho-post-bank-desc": "Lesotho Post Bank - Government-owned bank providing financial services and business support.",
        "lesotho-post-bank-address": "Kingsway Road, Maseru, Lesotho",
        "national-manpower-development-secretariat-desc": "National Manpower Development Secretariat - Providing training and mentoring for business development.",
        "national-manpower-development-secretariat-address": "Development House, Maseru, Lesotho",
        "ministry-of-trade-and-industry-desc": "Ministry of Trade and Industry - Supporting trade, industry and business development in Lesotho.",
        "ministry-of-trade-and-industry-address": "Kingsway Road, Maseru, Lesotho",
        "assets-label": "Assets:",
        "choose-option": "-- Choose one --",
        "chatbot-greeting": "Hello! I'm your AI assistant. How can I help you with business ideas today?",
        "footer-text": "2025 Basotho Business Project",
        "lang-toggle": "Sesotho",
        "feedback-hint": "Get AI feedback on your business idea anytime",
    },
    st: {
        "hero-title": "Fumana Monyetla oa Hao oa Khoebo",
        "hero-sub": "Kenya bokhoni, lithahasello le lisebelisoa tsa hau. Re tla fana ka maikutlo a khoebo e u loketseng.",
        "form-title": "Mpolelle ka uena",
        "skills": "Bokhoni ba Hao",
        "skills-desc": "Bolela bokhoni ba hau ka ho arola ka likoma (mohlala, ho pheha, ho betla, ho bapatsa).",
        "interests": "Lithahasello Tsa Hao",
        "interests-desc": "Ke eng e u thabisang? (mohlala, thekenoloji, temo, feshene).",
        "capital": "Chelete kapa Lisebelisoa Tse Fumanehang",
        "capital-desc": "U na le chelete kapa thepa e kae? (mohlala, M5000, laptop, lisebelisoa).",
        "location": "Sebaka",
        "location-desc": "U lula kae? Sena se re thusa ho fana ka maikutlo a amanang le sebaka.",
        "location-privacy": "Sebaka sa hau se tla sebelisoa bakeng sa maikutlo mme se bolokoe historing ea maikutlo a hau.",
        "gps-btn": "Sebelisa GPS",
        "availability": "Ho fumaneha",
        "availability-desc": "U ka nehela nako e kae khoebong ea hau?",
        "weekends-only": "Mafelo-beke Feela",
        "evenings": "Mantsiboea",
        "part": "Karoloana ea nako",
        "full": "Nako e Tletseng",
        "submit": "Fumana Mohopolo oa Khoebo oa Ka",
        "result-title": "Mehopolo ea Hau e Meraro e Meholo ea Khoebo",
        "generating": "E hlahisa mehopolo ea hau e meraro e metle ea khoebo...",
        "loading": "Ts'ebetsong ho hlahisa khothaletso ea khoebo...",
        "problem-solved": "Bothata bo Lokisoang",
        "session-expired": "Nako ea hau ea ho kena e felile. Ka kopo kena hape ho fumana maikutlo a ikhethang.",
        "missing-fields": "Ka kopo tlatsa masimo ohle a hlokahalang pele u romela.",
        "network-error": "Ha e khone ho hokela ho seva. Ka kopo hlahloba khokahano ea hau ea inthanete ebe u leka hape.",
        "server-error": "Phoso ea seva. Sehlopha sa rona se tsebisitsoe. Ka kopo leka hape hamorao.",
        "rate-limit": "Likopo tse ngata haholo. Ka kopo ema hanyane ebe u leka hape.",
        "invalid-input": "Lintlha tse fosahetseng. Ka kopo hlahloba tlhahisoleseling ea hau ebe u leka hape.",
        "service-unavailable": "Tšebeletso ha e fumanehe ka nakoana. Ka kopo leka hape ka metsotso e seng mekae.",
        "no-recommendation": "Ha ho khothaletso e ka hlahisoang. Ka kopo leka ka tlhahisoleseling e fapaneng.",
        "auth-required": "Nako ea hau ea ho kena e felile. Ka kopo kena hape.",
        "access-denied": "Ho kena ho hanoa. Ka kopo kena hape.",
        "not-found": "Khothaletso ha e fumanehe. E kanna ea hlakoloa.",
        "db-error": "Bothata ba khokahano ea database. Sehlopha sa rona se tsebisitsoe.",
        "my-recommendations": "Maikutlo a Ka",
        "new-recommendation": "Khothaletso e Ncha",
        "logout": "Tsoa",
        "loading-recommendations": "Ho kenya maikutlo a hau...",
        "no-recommendations": "Ha u na le maikutlo leha e le afe hajoale.",
        "get-first-recommendation": "Fumana Khothaletso ea Hao ea Pele",
        "skills-label": "Bokhoni:",
        "interests-label": "Lithahasello:",
        "location-label": "Sebaka:",
        "capital-label": "Chelete:",
        "availability-label": "Ho fumaneha:",
        "description-label": "Tlhaloso:",
        "view-full-details": "Sheba Lintlha tse Tletseng",
        "recommendation-details": "Lintlha tsa Khothaletso",
        "back-to-history": "Khutlela Historing",
        "loading-details": "Ho kenya lintlha tsa khothaletso...",
        "business-description": "Tlhaloso ea Khoebo",
        "problem-solved": "Bothata bo Lokisoang",
        "why-this-fits": "Hobaneng Sena se U Lekana",
        "estimated-capital": "Khakanyo ea Chelete:",
        "suggested-schedule": "Lenaneo le Sisintsoeng:",
        "your-skills": "Bokhoni ba Hao:",
        "your-interests": "Lithahasello Tsa Hao:",
        "login": "Kena",
        "username": "Lebitso la Mosebelisi",
        "password": "Nomoro ea lekunutu",
        "login-btn": "Kena",
        "no-account": "Ha u na akhaonto?",
        "register-here": "Ngolisa mona",
        "already-account": "U se u na le akhaonto?",
        "login-here": "Kena mona",
        "register": "Ngolisa",
        "confirm-password": "Netefatsa nomoro ea lekunutu:",
        "register-btn": "Ngolisa",
        "support-title": "Tšehetso ea Khoebo le Tšehetso ea Lichelete",
        "bedco-desc": "Basotho Enterprise Development Corporation - E tšehetsa kholo ea khoebo le nts'etsopele Lesotho.",
        "lndc-desc": "Lesotho National Development Corporation - E khothaletsa nts'etsopele ea indasteri le khoebo.",
        "sme-desc": "Small, Medium and Micro Enterprises - E tšehetsa nts'etsopele ea khoebo e nyenyane le bo-rakhoebo.",
        "bedco-address": "Kingsway Road, Maseru, Lesotho",
        "lndc-address": "Pioneer Road, Maseru, Lesotho",
        "sme-address": "Lefapha la Khoebo, Maseru, Lesotho",
        "bedco-name": "BEDCO",
        "lndc-name": "LNDC",
        "smme-name": "SMME Unit",
        "history-title": "Histori ea Hao ea Khoebo",
        "chatbot-title": "Mothusi oa AI",
        "chat-send": "Romela",
        "chatInput-placeholder": "Botsa ntho leha e le efe ka khoebo...",
        "visit-website": "Etela Webosaete",
        "brand": "Basotho Business Recommender",
        "brand-app": "Basotho Business Recommender",
        "brand-site": "Basotho Business Ideas",
        "nav-app": "Lehae",
        "nav-history": "Histori",
        "nav-contact": "Bua le Rona",
        "nav-login": "Kena",
        "nav-register": "Ngolisa",
        "view-history": "Sheba Histori ea Ka",
        "welcome": "Rea u amohela,",
        "contact-title": "Iteanye le Tšehetso",
        "contact-intro": "Haeba u tobaneng le mathata ka app, re tsebise 'me re tla u thusa kapele kamoo ho ka khonehang.",
        "contact-email": "Imeile",
        "contact-phone": "Mohala",
        "contact-whatsapp": "WhatsApp",
        "contact-helpful-title": "Lintlha tse molemo ho li kenyelletsa",
        "contact-helpful-1": "Seo u neng u leka ho se etsa",
        "contact-helpful-2": "Molaetsa oa phoso o bontšitsoeng",
        "contact-helpful-3": "Sebatli le sesebelisoa seo u se sebelisang",
        "contact-helpful-4": "Nako eo bothata bo etsahetseng",
        "back-to-app": "← Khutlela Lehaeng",
        "local-support-title": "Litsebeletso tsa Tšehetso ea Khoebo",
        "local-support-desc": "U ka boela ua ikopanya le mekhatlo e latelang bakeng sa tšehetso e pharalletseng ea khoebo:",
        "tell-idea-btn": "Mpolelle ka mohopolo oa ka oa khoebo",
        "idea-page-title": "Fumana Maikutlo ka Mohopolo oa Hao",
        "idea-text-label": "Hlalosa mohopolo oa hau oa khoebo",
        "idea-placeholder": "Ngola mohopolo oa hau oa khoebo mona...",
        "get-feedback": "Fumana Maikutlo",
        "feedback-title": "Maikutlo a AI",
        "idea-using-profile": "Re sebelisa boitsebiso ba hau le sebaka ho lokisa maikutlo.",
        "idea-missing-profile": "Lintlha tse ling ha li a tlatsoa. Maikutlo a tla ba akaretsang.",
        "rate-recommendation": "Lekola keletso ena",
        "rating-hint": "Tobetsa naleli ho lekola. Sebelisa li-arrow tsa left/right ho sebelisa khiiboto.",
        "submit-rating": "Romela Lekolo",
        "rating-note": "Maikutlo a hau a thusa ho ntlafatsa likeletso tse tlang.",
        "my-recommendations": "Likeletso Tsa Ka",
        "new-recommendation": "Keletso e Ncha",
        "logout": "Tsoa",
        "loading-recommendations": "E hlophisa likeletso tsa hau...",
        "no-recommendations": "Ha u na likeletso hajoale.",
        "get-first-recommendation": "Fumana Keletso ea Hau ea Pele",
        "login": "Kena",
        "login-sub": "Kena akhaonteng ea hau ho fumana maikutlo a khoebo e u loketseng",
        "username": "Lebitso la mosebelisi:",
        "password": "Nomoro ea lekunutu:",
        "login-btn": "Kena",
        "register-here": "Ngolisa mona",
        "no-account": "Ha u na akhaonte?",
        "skills-placeholder": "mohlala, ho pheha, ho betla, ho bapatsa",
        "interests-placeholder": "mohlala, thekenoloji, temo, feshene",
        "capital-placeholder": "mohlala, M5000, Laptop, Lisebelisoa",
        "location-placeholder": "mohlala, Maseru, Setereke sa Berea",
        "generating-feedback": "E etsa maikutlo...",
        "alert-type-idea": "Ka kopo ngola mohopolo oa hau oa khoebo pele.",
        "unable-get-feedback": "Ha re khone ho fumana maikutlo. Ka kopo leka hape hamorao.",
        "message-whatsapp": "Re romele molaetsa ka WhatsApp",
        "ideaText-placeholder": "Ngola mohopolo oa hau oa khoebo mona...",
        "register": "Ngolisa",
        "register-sub": "Theha akhaonte ea hau ho qala ho fumana likeletso tse ikhethileng",
        "register-btn": "Ngolisa",
        "confirm-password": "Netefatsa Nomoro ea lekunutu:",
        "already-account": "U se na le akhaonte?",
        "login-here": "Kena mona",
        "average-website-rating": "Tekolo e Tloaelehileng ea Webosaete",
        "select-for-save": "Boloka ho Database",
        "store-selected-ideas": "Boloka Likhopolo tse Khethiloeng",
        "rate-this-idea": "Lekola mohopolo ona:",
        "select-ideas-instruction": "Khetha mehopolo ka ho sebedisa li-checkbox ebe u li lekoa, ebe u tobetsa ho e boloka akhaonteng ea hau",
        "forgot-password-title": "U lebetse phasewete ea hao?",
        "forgot-password-desc": "Kenya aterese ea hau ea imeile. Re tla u romella sehokelo sa ho beha Nomoro ea lekunutu e ncha.",
        "email-label": "Imeile",
        "send-reset-link": "Romela sehokelo sa ho beha bocha",
        "back-to-login": "← Khutlela ho Kena",
        "reset-password-title": "Beha Nomoro ea lekunutu ea Hao Bocha",
        "new-password-label": "Phasewete e Ncha",
        "confirm-password-label": "Netefatsa Phasewete",
        "reset-password-btn": "Beha Nomoro ea lekunutu Bocha",
        "back-to-forgot": "Khutla",
        "password-reset-success": "Nomoro ea lekunutu ea hau e behiloe bocha ka katleho! Hona joale u ka kena ka phasewete ea hau e ncha.",
        "invalid-reset-link": "Sehokelo sa ho beha bocha ha se sebetse kapa se felile.",
        "passwords-do-not-match": "Nomoro tsa lekunutu ha li tšoane.",
        "email-sent-success": "Imeile ea ho beha phasewete bocha e rometsoe ka katleho! Ka kopo sheba inbox ea hau (le foldara ea spam).",
        "view-previous-feedback": "Sheba Maikutlo a Pele",
        "rate-feedback": "Lekola maikutlo ana",
        "step-1-title": "Mohato 1: Bokhoni",
        "step-2-title": "Mohato 2: Lithahasello",
        "step-3-title": "Mohato 3: Chelete le Lisebelisoa",
        "step-4-title": "Mohato 4: U lula kae?",
        "step-1-desc": "Khetha lethathamong kapa ngola bokhoni ba hao:",
        "step-2-desc": "Ke eng e u thabisang?",
        "step-3-desc": "U na le bokae?",
        "step-4-desc": "Sebaka sa hao se re thusa ho fana ka maikutlo a lehae.",
        "next-step": "Mohato o Latelang",
        "previous": "Morao",
        "customSkill-placeholder": "Ngola bokhoni ba hao...",
        "customInterest-placeholder": "Ngola thahasello ea hao...",
        "moneyAmount-placeholder": "mohlala, M5000, $1000",
        "customAsset-placeholder": "Ngola letlotlo la hao...",
        "add-skill": "+ Kenya",
        "add-interest": "+ Kenya",
        "add-asset": "+ Kenya letlotlo",
        "select-town": "Khetha toropo/motsana",
        "or-text": "KAPA",
        "detect-gps": "Fumana ka GPS",
        "lpost-desc": "Lesotho Post Bank - Banka e laoloang ke mmuso e fanang ka litšebeletso tsa lichelete le tšehetso ea khoebo.",
        "lpost-address": "Kingsway Road, Maseru, Lesotho",
        "nmds-desc": "National Manpower Development Secretariat - E fana ka koetliso le tataiso bakeng sa nts'etsopele ea khoebo.",
        "nmds-address": "Development House, Maseru, Lesotho",
        "mti-desc": "Lefapha la Khoebo le Indasteri - E tšehetsa khoebo, indasteri le nts'etsopele ea khoebo Lesotho.",
        "mti-address": "Kingsway Road, Maseru, Lesotho",
        "lesotho-post-bank-desc": "Lesotho Post Bank - Banka e laoloang ke mmuso e fanang ka litšebeletso tsa lichelete le tšehetso ea khoebo.",
        "lesotho-post-bank-address": "Kingsway Road, Maseru, Lesotho",
        "national-manpower-development-secretariat-desc": "National Manpower Development Secretariat - E fana ka koetliso le tataiso bakeng sa nts'etsopele ea khoebo.",
        "national-manpower-development-secretariat-address": "Development House, Maseru, Lesotho",
        "ministry-of-trade-and-industry-desc": "Lefapha la Khoebo le Indasteri - E tšehetsa khoebo, indasteri le nts'etsopele ea khoebo Lesotho.",
        "ministry-of-trade-and-industry-address": "Kingsway Road, Maseru, Lesotho",
        "assets-label": "Lisebelisoa:",
        "choose-option": "-- Khetha e le 'ngoe --",
        "chatbot-greeting": "Lumela! Ke mothusi oa hau oa AI. Nka u thusa joang ka mehopolo ea khoebo kajeno?",
        "footer-text": "2025 Morero oa Khoebo oa Basotho",
        "lang-toggle": "English",
        "feedback-hint": "Fumana maikutlo a AI ka mohopolo oa hau oa khoebo leha e le neng",
    }
};

// Language selection stored in localStorage and applied on load
window.currentLang = window.currentLang || localStorage.getItem("selectedLanguage") || "st";

function initializeLanguage() {
    updateLanguage();
}

const __langToggleEl = document.getElementById("langToggle");
if (__langToggleEl) {
    __langToggleEl.addEventListener("click", () => {
        window.currentLang = window.currentLang === "en" ? "st" : "en";
        localStorage.setItem("selectedLanguage", window.currentLang);
        updateLanguage();
    });
}


// Global state for tracking user selections and preferences
let selectedIdeasForDatabase = new Set(); // Tracks which business ideas user wants to save
let ideaRatings = {}; // Tracks individual ratings for each idea

// Handles user selection of business ideas for database storage
function selectIdeaForDatabase(ideaNumber, isChecked) {
    if (isChecked) {
        selectedIdeasForDatabase.add(ideaNumber);
    } else {
        selectedIdeasForDatabase.delete(ideaNumber);
    }

    console.log('Selected ideas for database:', Array.from(selectedIdeasForDatabase));

    // Update the "Store Selected Ideas" button state
    updateStoreButtonState();
}

// Handles individual rating for each idea
function rateIdea(ideaNumber, rating) {
    ideaRatings[ideaNumber] = rating;
    console.log('Rated idea', ideaNumber, 'with', rating, 'stars');
}

// Updates the "Store Selected Ideas" button state
function updateStoreButtonState() {
    const storeButton = document.getElementById('storeSelectedIdeasBtn');
    if (storeButton) {
        const hasSelections = selectedIdeasForDatabase.size > 0;
        storeButton.disabled = !hasSelections;
        storeButton.style.opacity = hasSelections ? '1' : '0.5';

        // Update button text to show count
        const lang = window.currentLang || 'st';
        const count = selectedIdeasForDatabase.size;
        const buttonText = lang === 'st' ?
            `Boloka Likhopolo tse Khethiloeng (${count})` :
            `Store Selected Ideas (${count})`;
        storeButton.textContent = buttonText;
    }
}

// Saves all selected business ideas to database with their ratings
async function saveSelectedIdeasToDatabase() {
    if (selectedIdeasForDatabase.size === 0) {
        console.warn('No ideas selected for saving');
        return;
    }

    try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            console.warn("No user ID found, cannot save recommendations");
            return;
        }

        const ideaEl = document.getElementById("businessIdea");
        if (!ideaEl || !ideaEl.innerHTML) {
            console.warn("No recommendation data found");
            return;
        }

        const recommendationText = ideaEl.innerHTML.replace(/<[^>]*>/g, '').trim();
        if (!recommendationText) {
            console.warn("Empty recommendation data");
            return;
        }

        // Parse the response to extract individual ideas
        const ideaPattern = /====\s*(IDEA|MOHOPOLO)\s*#(\d+):\s*([^=]+)====/gi;
        const matches = [...recommendationText.matchAll(ideaPattern)];

        let savedCount = 0;
        let errors = 0;

        for (const match of matches) {
            const ideaNum = parseInt(match[2]);
            if (selectedIdeasForDatabase.has(ideaNum)) {
                const startPos = match.index + match[0].length;
                const endPos = matches.indexOf(match) < matches.length - 1 ?
                    matches[matches.indexOf(match) + 1].index : recommendationText.length;
                const ideaContent = recommendationText.substring(startPos, endPos).trim();
                const ideaTitle = match[3].trim();

                try {
                    // Send individual idea to database with rating
                    const response = await fetch('/Business%20Ideas/business-recommender/save_recommendation.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: userId,
                            recommendation: `==== IDEA #${ideaNum}: ${ideaTitle} ====\n${ideaContent}`,
                            idea_number: ideaNum,
                            rating: ideaRatings[ideaNum] || 0,
                            skills: (document.getElementById('skills') && document.getElementById('skills').value) || '',
                            interests: (document.getElementById('interests') && document.getElementById('interests').value) || '',
                            capital: (document.getElementById('capital') && document.getElementById('capital').value) || '',
                            location: (document.getElementById('location') && document.getElementById('location').value) || '',
                            availability: (document.getElementById('availability') && document.getElementById('availability').value) || '',
                            language: window.currentLang || 'st'
                        })
                    });

                    const result = await response.json();
                    if (result.success) {
                        savedCount++;
                        console.log(`✅ Saved idea #${ideaNum} to database successfully`);
                    } else {
                        errors++;
                        console.error(`⚠️ Failed to save idea #${ideaNum}:`, result.error);
                    }
                } catch (error) {
                    errors++;
                    console.error(`⚠️ Error saving idea #${ideaNum}:`, error);
                }
            }
        }

        // Show success notification
        if (savedCount > 0) {
            showSuccessPopup(`Successfully saved ${savedCount} business idea${savedCount > 1 ? 's' : ''}!`);

            // Clear selections
            selectedIdeasForDatabase.clear();
            ideaRatings = {};
            updateStoreButtonState();

            // Uncheck all checkboxes
            document.querySelectorAll('input[name="selectedIdea"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        }

        if (errors > 0) {
            console.warn(`Completed with ${errors} errors out of ${selectedIdeasForDatabase.size} attempts`);
        }

    } catch (error) {
        console.error('⚠️ Error saving selected ideas:', error);
    }
}

// Legacy function for backward compatibility
async function saveSelectedRecommendationToDatabase(recommendationData) {
    // This function is now replaced by saveSelectedIdeasToDatabase
    console.warn('This function is deprecated. Use saveSelectedIdeasToDatabase instead.');
}

// Set up language system and UI interactions when page loads
document.addEventListener("DOMContentLoaded", function() {
    initializeLanguage();

});

// Chatbot functionality
document.addEventListener("DOMContentLoaded", function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('hidden');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.add('hidden');
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'text-center text-gray-500 text-sm my-2';
        const lang = window.currentLang || localStorage.getItem('selectedLanguage') || 'st';
        const thinkingText = lang === 'st' ? 'AI e nahana...' : 'Thinking...';
        typingDiv.innerHTML = `<div class="inline-flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-600 mr-2"></div>${thinkingText}</div>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Send to the chat service
        puter.ai.chat(message, { model: "gpt-5-nano" })
            .then(response => {
                // Remove typing indicator
                chatMessages.removeChild(typingDiv);
                // Add response
                addMessage(response, 'ai');
            })
            .catch(error => {
                // Remove typing indicator
                chatMessages.removeChild(typingDiv);
                // Add error message
                const lang = window.currentLang || localStorage.getItem('selectedLanguage') || 'st';
                const errorText = lang === 'st' ? 'Ke masoabi, ha ke khone ho sebetsa kopo ea hau hona joale. Ka kopo leka hape.' : "Sorry, I couldn't process your request right now. Please try again.";
                addMessage(errorText, 'ai');
                console.error('Chatbot error:', error);
            });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-3 ${sender === 'user' ? 'text-right' : 'text-left'}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `inline-block max-w-xs px-3 py-2 rounded-lg text-sm ${
            sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
        }`;

        bubbleDiv.textContent = text;
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send on button click
    chatSend.addEventListener('click', sendMessage);

    // Send on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});


// Main form handler for business recommendation requests
const __userFormEl = document.getElementById("userForm");
if (__userFormEl) {
    document.getElementById("userForm").addEventListener("submit", async(e) => {
        e.preventDefault();

        const skills = document.getElementById("skills").value.trim();
        const interests = document.getElementById("interests").value.trim();
        const capital = document.getElementById("capital").value.trim();
        const location = document.getElementById("location").value.trim();
        const availability = document.getElementById("availability").value;

        const resultsEl = document.getElementById("results");
        const ideaEl = document.getElementById("businessIdea");

        // Clear previous results and show loading state
        resultsEl.classList.remove("hidden");
        ideaEl.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">${translations[window.currentLang]["generating"]}</p>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <div class="loading-dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    `;

        // Scroll to results
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        try {
            // Add a small delay to show loading state (UX improvement)
            await new Promise(resolve => setTimeout(resolve, 500));

            const userId = localStorage.getItem("user_id"); // Get user_id from localStorage

            console.log("Sending user_id:", userId); // Debug log

            if (!userId) {
                throw new Error(translations[window.currentLang]["session-expired"]);
            }

            // Validate required fields
            if (!skills || !interests || !capital || !location || !availability) {
                throw new Error(translations[window.currentLang]["missing-fields"]);
            }

            // API call function with fallback between different server ports
            async function postRecommend(baseUrl) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

                    const response = await fetch(`${baseUrl}/api/recommend`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        credentials: 'include',
                        signal: controller.signal,
                        body: JSON.stringify({
                            user_id: userId,
                            skills,
                            interests,
                            capital,
                            location,
                            availability,
                            lang: window.currentLang
                        })
                    });

                    clearTimeout(timeoutId);
                    return response;
                } catch (error) {
                    if (error.name === 'AbortError') {
                        throw new Error('Request timeout - server not responding');
                    }
                    throw error;
                }
            }

            let resp;
            let lastError = null;

            // Try different server configurations
            const serverConfigs = [
                "http://localhost:3000",
                "http://localhost:5000",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5000",
                "/api/recommend" // Fallback to relative path
            ];

            for (const baseUrl of serverConfigs) {
                try {
                    console.log(`🔄 Trying API endpoint: ${baseUrl}`);
                    resp = await postRecommend(baseUrl);

                    if (resp.ok) {
                        console.log(`✅ Successfully connected to: ${baseUrl}`);
                        break; // Success, exit loop
                    } else {
                        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
                    }
                } catch (error) {
                    lastError = error;
                    console.warn(`⚠️ Failed to connect to ${baseUrl}:`, error.message);
                    continue; // Try next server
                }
            }

            // If all servers failed, show helpful error
            if (!resp || !resp.ok) {
                throw new Error(`Unable to connect to recommendation service. Please check if the server is running.\n\nTried: ${serverConfigs.join(', ')}\n\nLast error: ${lastError?.message || 'Unknown error'}`);
            }

            // Handle API response errors with enhanced AI service error handling
            if (!resp.ok) {
                let errorMessage = "Unable to generate recommendation. Please try again.";
                let isAITemporaryError = false;

                try {
                    const errorData = await resp.json();

                    // Enhanced check for AI service overload (503 errors)
                    if (resp.status === 503) {
                        isAITemporaryError = true;
                        if (errorData.error && errorData.error.message &&
                            (errorData.error.message.includes('overloaded') ||
                                errorData.error.message.includes('busy') ||
                                errorData.error.message.includes('unavailable'))) {
                            throw new Error(`🤖 AI Service Temporarily Busy\n\nThe AI recommendation service is currently experiencing high demand and is temporarily unavailable.\n\nWhat to do:\n\n⏰ **Wait 1-2 minutes** before trying again\n🔄 **Try again** - the service should be available shortly\n📝 **Use the feedback feature** - Get AI feedback on your business idea while waiting\n💡 **Try during off-peak hours** for better response times\n\nYour business profile information will be preserved and ready to use once the service is available.`);
                        } else {
                            throw new Error(`🔧 Service Maintenance\n\nThe AI recommendation service is temporarily under maintenance or experiencing technical difficulties.\n\nPlease:\n• Wait a few minutes and try again\n• Check back in 10-15 minutes\n• Use the "Get Feedback on Idea" feature in the meantime\n\nWe're working to restore full service as quickly as possible.`);
                        }
                    }

                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (parseError) {
                    // Handle different HTTP status codes with enhanced messaging
                    switch (resp.status) {
                        case 400:
                            errorMessage = translations[window.currentLang]["invalid-input"];
                            break;
                        case 401:
                            errorMessage = translations[window.currentLang]["auth-required"];
                            break;
                        case 429:
                            errorMessage = `⏱️ Rate Limit Reached\n\nToo many requests have been made recently. Please wait a moment (1-2 minutes) before trying again.\n\nThis helps ensure the service remains available for all users.`;
                            break;
                        case 500:
                            errorMessage = translations[window.currentLang]["server-error"];
                            break;
                        case 503:
                            isAITemporaryError = true;
                            errorMessage = `🔧 Service Temporarily Unavailable\n\nThe recommendation service is temporarily offline for maintenance or upgrades.\n\nPlease try again in a few minutes, or use the "Get Feedback on Idea" feature while waiting.`;
                            break;
                        default:
                            errorMessage = `⚠️ Request Failed (Error ${resp.status})\n\nThe request could not be completed. Please check your internet connection and try again.\n\nIf this problem persists, the service may be experiencing difficulties.`;
                    }
                }

                // Add helpful suggestions for temporary AI errors
                if (isAITemporaryError) {
                    errorMessage += `\n\n💡 **Alternative Options:**\n• Use "Get Feedback on Idea" for immediate AI insights\n• Try again in a few minutes\n• Check during off-peak hours for faster responses`;
                }

                throw new Error(errorMessage);
            }

            // Check for server connection errors (this catches the connection refused errors)
            if (!resp || resp.status === 0) {
                throw new Error(`❌ Server Connection Failed\n\nThe recommendation service is not running. Please:\n\n1. Start the backend server:\n   - Run: npm start (or python app.py)\n   - Check if server starts on port 3000 or 5000\n\n2. Or try refreshing the page\n\n3. Check server logs for any errors\n\nIf the problem persists, contact support.`);
            }

            const data = await resp.json();
            console.log("Response data:", data); // Debug response

            if (!data.recommendation) {
                throw new Error(translations[window.currentLang]["no-recommendation"]);
            }

            const recommendationText = formatRecommendation(data.recommendation);
            ideaEl.innerHTML = recommendationText;

            // Note: Selected recommendations are now saved with the new checkbox system
            // (see selectIdeaForDatabase function and saveSelectedIdeasToDatabase function)

            // Hide the old rating system since we now have individual ratings per idea
            const __appRatingEl = document.getElementById('appRatingSection');
            if (__appRatingEl) __appRatingEl.classList.add('hidden');

            // Update the store button state after recommendations are rendered
            setTimeout(() => {
                updateStoreButtonState();
            }, 100);

        } catch (err) {
            console.error("Error:", err);

            // Handle network errors
            let userFriendlyMessage = err.message;
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                userFriendlyMessage = translations[window.currentLang]["network-error"];
            }

            if (ideaEl) ideaEl.innerHTML = `
            <div style="color:#dc2626; background:#fef2f2; border:1px solid #fecaca; padding:16px; border-radius:8px; margin-top:16px;">
                <strong data-lang="no-recommendation">Unable to Generate Recommendation</strong><br>
                ${escapeHtml(userFriendlyMessage)}
                <br><br>
                <div style="background:#f0f9ff; padding:12px; border-radius:6px; margin-top:8px;">
                    <strong style="color:#0369a1;">💡 While you wait:</strong><br>
                    • Try the "💭 Get Feedback on Idea" feature for immediate AI insights<br>
                    • Check your internet connection<br>
                    • Try again in a few minutes<br>
                    • Use off-peak hours (early morning/evening) for faster responses
                </div>
                <br>
                <small>If this problem persists, please <a href="contact.html" target="_blank" rel="noopener" style="color:#4f46e5; text-decoration:underline;">contact support</a>.</small>
            </div>
        `;
        }
    });
}

// Turns the response into nice-looking HTML cards for the user
function formatRecommendation(text) {
    if (!text) return "No recommendation received.";

    // Remove asterisks
    text = text.replace(/\*/g, "");

    // Try to split into 3 ideas using the ==== IDEA/MOHOPOLO markers
    const ideaPattern = /====\s*(IDEA|MOHOPOLO)\s*#(\d+):\s*([^=]+)====/gi;
    const matches = [...text.matchAll(ideaPattern)];

    if (matches.length >= 2) {
        // We have multiple ideas - parse and display as cards
        const ideas = [];

        for (let i = 0; i < matches.length; i++) {
            const startPos = matches[i].index + matches[i][0].length;
            const endPos = i < matches.length - 1 ? matches[i + 1].index : text.length;
            const ideaContent = text.substring(startPos, endPos).trim();
            const ideaNum = matches[i][2];
            const ideaTitle = matches[i][3].trim();

            ideas.push({
                number: ideaNum,
                title: ideaTitle,
                content: ideaContent
            });
        }

        // Generate HTML for ranked idea cards
        let html = '<div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px; width: 100%;">';

        ideas.forEach((idea, index) => {
            const rankColors = ['#10b981', '#3b82f6', '#8b5cf6']; // green, blue, purple - make them more distinct
            const rankLabels = ['Best Fit', 'Second Choice', 'Third Option'];
            const rankLabelsSt = ['E Loketseng ka ho Fetisisa', 'Khetho ea Bobeli', 'Khetho ea Boraro'];

            const lang = window.currentLang || 'en';
            const rankLabel = lang === 'st' ? rankLabelsSt[index] : rankLabels[index];
            const badgeColor = rankColors[index];
            // Add more distinct colors for the three ideas
            const distinctColors = ['#10b981', '#3b82f6', '#8b5cf6']; // green, blue, purple
            const cardColors = ['#f0fdf4', '#eff6ff', '#faf5ff']; // light green, light blue, light purple
            const borderColors = ['#10b981', '#3b82f6', '#8b5cf6'];

            // Format the content with styled headers
            let formattedContent = idea.content.replace(
                /(Problem Solved|Business Title|Description|Why it fits|Estimated capital needed|Suggested schedule|Problem being solved|Bothata bo rarolloa|Sehlooho sa Khoebo|Tlhaloso|Hobaneng e lekana mosebelisi|Khakanyo ea chelete e hlokahalang|Lenaneo le sisintsoeng):/gi,
                match => `<strong style="color:#4f46e5; display:block; margin-top:12px; margin-bottom:4px;">${match}</strong>`
            );
            // Use distinct colors for each idea
            const cardBgColor = cardColors[index] || '#f8fafc';
            const cardBorderColor = borderColors[index] || badgeColor;

            // Apply CSS classes for color coding
            const ideaClass = `idea-${idea.number}`;

            html += `
                <div class="${ideaClass}" style="background: linear-gradient(135deg, ${cardBgColor} 0%, #ffffff 100%); border: 3px solid ${cardBorderColor}; border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; width: 100%; box-sizing: border-box;"
                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                            <span style="background: ${badgeColor}; color: white; font-weight: 600; padding: 6px 14px; border-radius: 20px; font-size: 0.875rem;">
                                #${idea.number}
                            </span>
                            <span style="background: ${badgeColor}20; color: ${badgeColor}; font-weight: 600; padding: 6px 14px; border-radius: 20px; font-size: 0.875rem;">
                                ${rankLabel}
                            </span>
                        </div>
                        <label style="display: flex; align-items: center; gap: 6px; font-size: 0.875rem; color: #374151; cursor: pointer;">
                            <input type="checkbox" name="selectedIdea" value="${idea.number}" style="width: 16px; height: 16px; accent-color: ${badgeColor};" onchange="selectIdeaForDatabase(${idea.number}, this.checked)" id="checkbox-${idea.number}">
                        </label>
                    </div>
                    <h3 style="color: #1e293b; font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; line-height: 1.3; word-wrap: break-word;">
                        ${escapeHtml(idea.title)}
                    </h3>
                    <div style="color: #475569; line-height: 1.7; font-size: 0.95rem; word-wrap: break-word; overflow-wrap: break-word; margin-bottom: 16px;">
                        ${formattedContent}
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: #6b7280; font-size: 0.875rem; font-weight: 500;" data-lang="rate-this-idea">Rate this idea:</span>
                            <div id="rating-${idea.number}" style="display: flex; gap: 4px;">
                                ${Array.from({length: 5}, (_, i) => ` <
                span class = "star-rating"
            data - idea = "${idea.number}"
            data - rating = "${i + 1}"
            style = "cursor: pointer; color: #d1d5db; font-size: 1.25rem; transition: color 0.2s;"
            onmouseover = "highlightStars(${idea.number}, ${i + 1})"
            onmouseout = "resetStarHighlight(${idea.number})"
            onclick = "setIdeaRating(${idea.number}, ${i + 1})" > ★ < /span>
            `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add the "Store Selected Ideas" button
        html += `
            <div style="margin-top: 30px; text-align: center; padding: 20px; background: #f8fafc; border-radius: 12px; border: 2px solid #e2e8f0;">
                <button id="storeSelectedIdeasBtn" onclick="saveSelectedIdeasToDatabase()" disabled
                        style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 14px 28px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.3s ease; opacity: 0.5;"
                        onmouseover="if(!this.disabled) this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(16, 185, 129, 0.4)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.3)';">
                    Store Selected Ideas (0)
                </button>
                <p style="margin-top: 12px; color: #64748b; font-size: 0.875rem;" data-lang="select-ideas-instruction">
                    Select ideas using checkboxes and rate them, then click to save to your account
                </p>
            </div>
        `;

        html += '</div>';
        return html;
    } else {
        // Fallback for single idea (old format) - with individual rating
        text = text.replace(
            /(Business Title|Description|Why it fits|Estimated capital needed|Suggested schedule|Problem Solved|Sehlooho sa Khoebo|Tlhaloso|Hobaneng e lekana mosebelisi|Khakanyo ea chelete e hlokahalang|Lenaneo le sisintsoeng|Bothata bo rarolloa)/gi,
            match => `<span style="color:#4f46e5; font-weight:bold;">${match}</span>`
        );

        // For single idea, add checkbox and rating
        return `
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); border: 3px solid #10b981; border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; width: 100%; box-sizing: border-box;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <label style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: #374151; cursor: pointer;">
                        <input type="checkbox" name="selectedIdea" value="1" style="width: 16px; height: 16px; accent-color: #10b981;" onchange="selectIdeaForDatabase(1, this.checked)" id="checkbox-1">
                        <span data-lang="select-for-save">Save to Database</span>
                    </label>
                </div>
                <div style="white-space: pre-wrap; line-height:1.6;">${text}</div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #6b7280; font-size: 0.875rem; font-weight: 500;">Rate this idea:</span>
                        <div id="rating-1" style="display: flex; gap: 4px;">
                            ${Array.from({length: 5}, (_, i) => ` <
            span class = "star-rating"
        data - idea = "1"
        data - rating = "${i + 1}"
        style = "cursor: pointer; color: #d1d5db; font-size: 1.25rem; transition: color 0.2s;"
        onmouseover = "highlightStars(1, ${i + 1})"
        onmouseout = "resetStarHighlight(1)"
        onclick = "setIdeaRating(1, ${i + 1})" > ★ < /span>
        `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Basic HTML escaping helper
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Star rating helper functions
function highlightStars(ideaNumber, rating) {
    const stars = document.querySelectorAll(`[data-idea="${ideaNumber}"]`);
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#f59e0b' : '#d1d5db';
    });
}

function resetStarHighlight(ideaNumber) {
    const stars = document.querySelectorAll(`[data-idea="${ideaNumber}"]`);
    const currentRating = ideaRatings[ideaNumber] || 0;
    stars.forEach((star, index) => {
        star.style.color = index < currentRating ? '#f59e0b' : '#d1d5db';
    });
}

function setIdeaRating(ideaNumber, rating) {
    rateIdea(ideaNumber, rating);
    resetStarHighlight(ideaNumber);
    console.log('Set rating for idea', ideaNumber, 'to', rating, 'stars');
}

// Google Maps integration for location services
let map, marker;

// Initialize Google Maps with given coordinates (called by Google Maps API callback)
window.initMap = function(lat = -29.31, lng = 27.48) {
    if (window.__mapInitialized) return;
    const mapEl = document.getElementById("map");
    if (!mapEl || !(window.google && google.maps)) return;

    try {
        const center = { lat, lng };
        map = new google.maps.Map(mapEl, {
            center,
            zoom: 13,
        });

        // Safely try to use AdvancedMarkerElement, fall back to regular Marker
        let useAdvancedMarkers = false;
        try {
            // Test if AdvancedMarkerElement is available
            useAdvancedMarkers = window.google.maps.marker &&
                window.google.maps.marker.AdvancedMarkerElement &&
                typeof window.google.maps.marker.AdvancedMarkerElement === 'function';
        } catch (markerError) {
            console.warn('AdvancedMarkerElement not available, using regular Marker');
            useAdvancedMarkers = false;
        }

        if (useAdvancedMarkers) {
            try {
                marker = new google.maps.marker.AdvancedMarkerElement({
                    position: center,
                    map,
                    gmpDraggable: true,
                });
                google.maps.event.addListener(marker, "dragend", function() {
                    const pos = marker.position;
                    const locInput = document.getElementById("location");
                    if (locInput) locInput.value = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
                });
            } catch (advancedMarkerError) {
                console.warn('AdvancedMarkerElement failed, using regular Marker:', advancedMarkerError);
                useAdvancedMarkers = false;
            }
        }

        // Use regular marker as fallback or if AdvancedMarkerElement failed
        if (!useAdvancedMarkers) {
            // Create a more prominent red marker for user location
            marker = new google.maps.Marker({
                position: center,
                map: map,
                draggable: true,
                title: "Your Location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#FF0000',
                    fillOpacity: 0.8,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2
                },
                animation: google.maps.Animation.DROP
            });

            // Add click listener to marker for coordinate setting
            google.maps.event.addListener(marker, "dragend", function() {
                const pos = marker.getPosition();
                updateLocationInput(pos.lat(), pos.lng());
            });

            // Remove drop animation after marker is placed
            google.maps.event.addListener(marker, "animation_changed", function() {
                if (marker.getAnimation() === null) {
                    marker.setAnimation(null);
                }
            });
        }

        window.__mapInitialized = true;
        console.log('Google Maps initialized successfully with', useAdvancedMarkers ? 'AdvancedMarkerElement' : 'regular Marker');

        // Automatically try to get user's location after map loads
        setTimeout(() => {
            if (navigator.geolocation && map) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        console.log('🗺️ Auto-detected location:', lat, lng);

                        // Center map on user's location
                        map.setCenter({ lat, lng });
                        map.setZoom(15);

                        // Update marker if it exists
                        if (marker) {
                            marker.setPosition({ lat, lng });
                            updateLocationInput(lat, lng);
                        }
                    },
                    (error) => {
                        console.log('📍 Auto-location detection failed:', error.message);
                        // Silent fail - don't show error to user for auto-detection
                    }, { enableHighAccuracy: false, timeout: 10000 }
                );
            }
        }, 2000);
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
        // Hide map element and disable GPS if Google Maps fails
        if (mapEl) {
            mapEl.style.display = 'none';
        }
        const gpsBtn = document.getElementById("getLocationBtn");
        if (gpsBtn) {
            gpsBtn.style.display = 'none';
        }
    }
}

// Enhanced GPS location functionality with better accuracy and red marker
function bindGpsButtonOnce() {
    if (window.__gpsBound) return;
    const getLocationBtn = document.getElementById("getLocationBtn");
    if (!getLocationBtn) return;
    const errorEl = document.getElementById("errorMessage");

    const setError = (msg) => {
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.classList.remove("hidden");
        }
    };

    const clearError = () => {
        if (errorEl) {
            errorEl.textContent = "";
            errorEl.classList.add("hidden");
        }
    };

    // Show loading state
    const showLoading = () => {
        getLocationBtn.textContent = "Getting Location...";
        getLocationBtn.disabled = true;
    };

    const hideLoading = () => {
        getLocationBtn.textContent = window.currentLang === 'st' ? " Sebelisa GPS" : "Use GPS";
        getLocationBtn.disabled = false;
    };

    getLocationBtn.addEventListener("click", () => {
        clearError();
        showLoading();

        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser.");
            hideLoading();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const acc = position.coords.accuracy; // meters

                console.log(`📍 GPS Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)} (Accuracy: ${acc}m)`);

                // Update map with new location and temporary red marker
                if (map) {
                    const newCenter = { lat, lng };
                    map.setCenter(newCenter);
                    map.setZoom(15); // Zoom in for better precision

                    // Create temporary red marker for GPS detection
                    const gpsMarker = new google.maps.Marker({
                        position: newCenter,
                        map: map,
                        draggable: false, // Not draggable during GPS detection
                        title: "GPS Location Detected",
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 12,
                            fillColor: '#FF0000',
                            fillOpacity: 1,
                            strokeColor: '#FFFFFF',
                            strokeWeight: 3
                        },
                        animation: google.maps.Animation.BOUNCE
                    });

                    // Add accuracy circle to show GPS precision
                    const accuracyCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.3,
                        strokeWeight: 1,
                        fillColor: '#FF0000',
                        fillOpacity: 0.1,
                        map: map,
                        center: newCenter,
                        radius: acc
                    });

                    // Show the red marker and accuracy circle for 3 seconds
                    setTimeout(() => {
                        if (gpsMarker) {
                            gpsMarker.setMap(null); // Remove red marker
                        }
                        if (accuracyCircle) {
                            accuracyCircle.setMap(null); // Remove accuracy circle
                        }

                        // Update the main marker to normal styling
                        if (marker) {
                            marker.setPosition(newCenter);
                            marker.setMap(map);
                            marker.setDraggable(true);
                            marker.setTitle("Your Location");
                            marker.setIcon({
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 8,
                                fillColor: '#4285F4',
                                fillOpacity: 0.8,
                                strokeColor: '#FFFFFF',
                                strokeWeight: 2
                            });
                        } else {
                            // Create new normal marker if none exists
                            marker = new google.maps.Marker({
                                position: newCenter,
                                map: map,
                                draggable: true,
                                title: "Your Location",
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: '#4285F4',
                                    fillOpacity: 0.8,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight: 2
                                }
                            });

                            // Add drag listener for manual coordinate setting
                            google.maps.event.addListener(marker, 'dragend', function() {
                                const pos = marker.getPosition();
                                updateLocationInput(pos.lat(), pos.lng());
                            });
                        }
                    }, 3000);
                }

                // Update location input field
                updateLocationInput(lat, lng);

                // Show accuracy feedback
                if (acc <= 50) {
                    setError(`✅ High accuracy location found (±${acc}m)`);
                    setTimeout(clearError, 3000);
                } else if (acc <= 100) {
                    setError(`📍 Good accuracy location found (±${acc}m)`);
                    setTimeout(clearError, 3000);
                } else {
                    setError(`⚠️ Approximate location found (±${acc}m). For better accuracy, try again near a window or enable GPS.`);
                }

                hideLoading();
            },
            (error) => {
                console.error("Geolocation error:", error);

                let errorMessage = "";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "❌ Location permission denied. Please allow location access and try again.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "❌ Location unavailable. Please check your GPS or network connection.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "❌ Location request timed out. Please try again.";
                        break;
                    default:
                        errorMessage = "❌ Unable to retrieve location. Please try again.";
                }

                setError(errorMessage);
                hideLoading();
            }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 60000 // Cache position for 1 minute
            }
        );
    });

    window.__gpsBound = true;
}

// Helper function to update location input
function updateLocationInput(lat, lng) {
    const locInput = document.getElementById("location");
    if (locInput) {
        locInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        console.log(`📝 Updated location input: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
}

// Try binding immediately (defer), then also on DOMContentLoaded
bindGpsButtonOnce();
document.addEventListener("DOMContentLoaded", function() {
    bindGpsButtonOnce();

    // Try to get user's location immediately when page loads (optional)
    setTimeout(() => {
        const getLocationBtn = document.getElementById("getLocationBtn");
        if (getLocationBtn && navigator.geolocation) {
            // Add a small indicator that GPS is available
            getLocationBtn.style.position = 'relative';
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: absolute;
                top: 2px;
                right: 2px;
                width: 8px;
                height: 8px;
                background: #10b981;
                border-radius: 50%;
                border: 2px solid white;
            `;
            getLocationBtn.appendChild(indicator);
        }
    }, 1000);
});


// Navigation handler for history page access
const __vh = document.getElementById("viewHistoryBtn");
if (__vh) {
    __vh.addEventListener("click", () => {
        window.location.href = 'history.php';
    });
}

// ---------------------------------------------
// Rating system for user feedback on recommendations
// ---------------------------------------------

/**
 * Safely extracts recommendation ID from API response for rating functionality
 * Handles different possible response formats from the backend
 */
function extractRecommendationId(data) {
    if (!data) return null;

    // Check various possible ID field names in response
    if (typeof data.id === 'number') return data.id;
    if (typeof data.recommendation_id === 'number') return data.recommendation_id;
    if (typeof data.recommendationId === 'number') return data.recommendationId;

    // Check nested recommendation object
    if (data.recommendation && typeof data.recommendation.id === 'number') return data.recommendation.id;
    if (data.recommendation && typeof data.recommendation.recommendation_id === 'number') return data.recommendation.recommendation_id;

    return null;
}

/**
 * Initializes the star rating widget for app page recommendations
 * Only activates on pages with rating UI elements
 */
function tryInitAppRating(recId) {
    const section = document.getElementById('appRatingSection');
    const starContainer = document.getElementById('appStarContainer');
    const submitBtn = document.getElementById('appSubmitRating');
    const avgEl = document.getElementById('appAvgRating');
    if (!section || !starContainer || !submitBtn) return; // only on app page

    let currentRating = 0;
    let hasId = !!recId;
    let feedbackTimeout = null;

    // Create or get feedback message element
    let feedbackEl = section.querySelector('.rating-feedback');
    if (!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = 'rating-feedback';
        feedbackEl.style.cssText = 'margin-top: 0.5rem; font-size: 0.875rem; min-height: 1.25rem;';
        submitBtn.parentElement.appendChild(feedbackEl);
    }

    function showRatingFeedback(message, type = 'info') {
        if (feedbackTimeout) clearTimeout(feedbackTimeout);

        // For success, show popup; for others, show inline
        if (type === 'success') {
            showSuccessPopup(message);
            feedbackEl.textContent = ''; // Clear inline message
        } else {
            const colors = {
                error: '#ef4444',
                info: '#6366f1'
            };
            feedbackEl.textContent = message;
            feedbackEl.style.color = colors[type] || colors.info;
            feedbackEl.style.fontWeight = '400';
            feedbackTimeout = setTimeout(() => {
                feedbackEl.textContent = '';
            }, 4000);
        }
    }

    function showSuccessPopup(message) {
        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'rating-success-popup';
        popup.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add animation keyframes if not already present
        if (!document.getElementById('popupAnimationStyles')) {
            const style = document.createElement('style');
            style.id = 'popupAnimationStyles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(popup);

        // Fade out and remove after 3 seconds
        setTimeout(() => {
            popup.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.parentElement.removeChild(popup);
                }
            }, 300);
        }, 3000);
    }

    function renderStars() {
        starContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const span = document.createElement('span');
            span.className = 'star' + (i <= currentRating ? ' active' : '');
            span.textContent = '★';
            span.setAttribute('role', 'radio');
            span.setAttribute('aria-checked', i === currentRating ? 'true' : 'false');
            span.setAttribute('aria-setsize', '5');
            span.setAttribute('aria-posinset', String(i));
            span.setAttribute('tabindex', i === 1 ? '0' : '-1');
            span.dataset.value = String(i);
            starContainer.appendChild(span);
        }
        bindHoverPreview();
    }

    function bindHoverPreview() {
        const stars = Array.from(starContainer.querySelectorAll('.star'));
        stars.forEach((star, idx) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => s.classList.toggle('preview', i <= idx));
            });
        });
        starContainer.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('preview'));
        });
    }

    function bindStarEvents() {
        starContainer.addEventListener('click', (e) => {
            const t = e.target;
            if (t && t.dataset && t.dataset.value) {
                currentRating = parseInt(t.dataset.value, 10);
                renderStars();
                updateTabIndex();
            }
        });
        starContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                currentRating = Math.min(5, (currentRating || 0) + 1);
                renderStars();
                updateTabIndex();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                currentRating = Math.max(1, (currentRating || 1) - 1);
                renderStars();
                updateTabIndex();
            }
        });
    }

    function updateTabIndex() {
        const stars = starContainer.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.setAttribute('tabindex', index + 1 === currentRating ? '0' : '-1');
        });
    }

    async function submitRating() {
        if (!hasId) {
            console.warn('Rating submission disabled: recommendation ID not available.');
            return;
        }
        if (currentRating < 1 || currentRating > 5) {
            console.warn('Please select a rating between 1 and 5');
            showRatingFeedback('Please select a rating between 1 and 5', 'error');
            return;
        }

        // Check if a recommendation is selected and save it to database before rating
        if (selectedIdeaForDatabase) {
            const ideaEl = document.getElementById("businessIdea");
            if (ideaEl && ideaEl.innerHTML) {
                const recommendationText = ideaEl.innerHTML.replace(/<[^>]*>/g, '').trim();
                if (recommendationText) {
                    try {
                        await saveSelectedRecommendationToDatabase(recommendationText);
                        console.log('Selected recommendation saved before rating submission');
                    } catch (saveError) {
                        console.error('Failed to save selected recommendation before rating:', saveError);
                        // Continue with rating submission even if save fails
                    }
                }
            }
        } else {
            // If no recommendation is checked, don't save anything
            console.log('No recommendation selected for database storage');
        }

        // Disable button during submission
        submitBtn.disabled = true;
        showRatingFeedback('Submitting...', 'info');

        try {
            const res = await fetch('business-recommender/rating_update.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: Number(recId), rating: currentRating })
            });
            const payload = await res.json().catch(() => ({ success: false }));
            if (!res.ok || !payload.success) {
                console.error('Failed to save rating', payload);
                showRatingFeedback('Failed to save rating. Please try again.', 'error');
                submitBtn.disabled = false;
                return;
            }
            showRatingFeedback('✓ Rating submitted successfully!', 'success');
            refreshAverage();
            // Re-enable button after short delay
            setTimeout(() => { submitBtn.disabled = false; }, 2000);
        } catch (e) {
            console.error('Rating submit error:', e);
            showRatingFeedback('Network error. Please try again.', 'error');
            submitBtn.disabled = false;
        }
    }

    async function refreshAverage() {
        if (!avgEl) return;
        try {
            const res = await fetch('business-recommender/website_rating.php', { cache: 'no-store' });
            const data = await res.json();
            if (data.success && data.rating) {
                const lang = window.currentLang || localStorage.getItem('selectedLanguage') || 'st';
                const translatedText = translations[lang] && translations[lang]['average-website-rating'] ?
                    translations[lang]['average-website-rating'] :
                    'Average Website Rating';
                avgEl.textContent = `🌟 ${translatedText}: ${data.rating} / 5`;
            }
        } catch (_) {
            // ignore silently
        }
    }

    async function tryResolveLatestIdIfNeeded() {
        if (hasId) return;
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) return;
            const res = await fetch('business-recommender/latest_recommendation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: Number(userId) })
            });
            const payload = await res.json().catch(() => ({}));
            if (res.ok && payload && typeof payload.id === 'number' && payload.id > 0) {
                recId = payload.id;
                hasId = true;
                // enable button now that we have an id
                submitBtn.disabled = false;
                submitBtn.title = '';
            }
        } catch (_) {
            // ignore silently
        }
    }

    // Initialize
    section.classList.remove('hidden');
    renderStars();
    bindStarEvents();
    updateTabIndex();
    if (!hasId) {
        submitBtn.disabled = true;
        submitBtn.title = 'Rating can be submitted after this recommendation is saved with an ID.';
        // Attempt to resolve latest id for this user in the background
        tryResolveLatestIdIfNeeded();
    }
    submitBtn.addEventListener('click', submitRating);
    refreshAverage();
}

// Check if user is logged in and show/hide business support section, and load additional organizations
document.addEventListener("DOMContentLoaded", function() {
    const businessSupportSection = document.getElementById("businessSupport");
    if (businessSupportSection) {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            businessSupportSection.style.display = "none";
        } else {
            // Load additional business support organizations immediately
            loadAdditionalBusinessSupport();
        }
    }
});

// Function to show business support section and load organizations (called after login)
function showBusinessSupportSection() {
    const businessSupportSection = document.getElementById("businessSupport");
    if (businessSupportSection) {
        businessSupportSection.style.display = "block";
        // Load additional organizations immediately when section becomes visible
        loadAdditionalBusinessSupport();
    }
}

// Cache for business support organizations to avoid reloading
let businessSupportLoaded = false;

// AI-powered function to load business support organizations
async function loadOrganizationsFromAPI() {
    // Return early if already loaded to prevent duplicate loading
    if (businessSupportLoaded) {
        return;
    }

    const loadingEl = document.getElementById('organizationsLoading');
    const gridEl = document.getElementById('organizationsGrid');

    if (!gridEl) {
        console.error('Organizations grid not found');
        return;
    }

    try {
        // Show loading state
        if (loadingEl) loadingEl.classList.remove('hidden');
        if (gridEl) gridEl.classList.add('hidden');

        // Try multiple API endpoints for maximum reliability
        const apiEndpoints = [
            'business-recommender/api/organizations.php',
            '/api/organizations.php',
            'fetch_organizations.php'
        ];

        let organizations = [];
        let dataSource = 'realtime';
        let lastError = null;

        // Update data source indicator
        const dataSourceText = document.getElementById('dataSourceText');
        const dataSourceDot = document.getElementById('dataSourceDot');
        if (dataSourceText && dataSourceDot) {
            dataSourceText.innerHTML = `
                <div class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                Fetching real-time data from government websites...
            `;
            dataSourceText.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
        }

        for (const endpoint of apiEndpoints) {
            try {
                console.log(`🔍 Trying to fetch organizations from: ${endpoint}`);

                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: 'no-cache'
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.success && data.data && Array.isArray(data.data)) {
                    organizations = data.data;

                    // Determine data source
                    if (data.source && data.source.includes('real-time')) {
                        dataSource = 'realtime';
                    } else {
                        dataSource = 'cached';
                    }

                    console.log(`✅ Successfully loaded ${organizations.length} organizations from ${endpoint} (${dataSource} data)`);
                    break;
                } else {
                    throw new Error(data.error || 'Invalid response format');
                }
            } catch (error) {
                console.warn(`⚠️ Failed to load from ${endpoint}:`, error.message);
                lastError = error;
                dataSource = 'cached';
                continue;
            }
        }

        // If no API worked, use fallback organizations
        if (organizations.length === 0) {
            console.log('📋 Using fallback organizations due to API failures (offline mode)');
            organizations = getFallbackOrganizations(); // Only 3 core organizations
            dataSource = 'cached';
        }

        // Update data source indicator based on actual source
        if (dataSourceText && dataSourceDot) {
            if (dataSource === 'realtime') {
                dataSourceText.innerHTML = `
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Live data from government websites
                `;
                dataSourceText.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
            } else {
                dataSourceText.innerHTML = `
                    <div class="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    Cached data (offline mode)
                `;
                dataSourceText.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800';
            }
        }

        // Clear grid and render organizations
        gridEl.innerHTML = '';

        organizations.forEach((org, index) => {
            // Add a small delay for smooth animation
            setTimeout(() => {
                const card = createOrganizationCard(org, dataSource);
                gridEl.appendChild(card);
            }, index * 100);
        });

        businessSupportLoaded = true;

        // Hide loading, show grid
        if (loadingEl) loadingEl.classList.add('hidden');
        if (gridEl) gridEl.classList.remove('hidden');

        // Update language for all cards
        updateLanguage();

        const successMsg = dataSource === 'realtime' ?
            '🎉 Live business support organizations loaded successfully!' :
            '📋 Cached organizations loaded successfully (offline mode)';
        console.log(successMsg);

    } catch (error) {
        console.error('❌ Failed to load organizations:', error);

        // Show error state but still provide basic organizations
        if (loadingEl) {
            loadingEl.innerHTML = `
                <div class="text-center">
                    <div class="text-red-600 mb-2">⚠️ Failed to load latest organizations</div>
                    <div class="text-sm text-gray-500">Showing cached information</div>
                </div>
            `;
        }

        // Update data source indicator for error state
        if (dataSourceText && dataSourceDot) {
            dataSourceText.innerHTML = `
                <div class="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Error loading data
            `;
            dataSourceText.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
        }

        // Still show minimal fallback organizations (offline mode)
        const fallbackOrganizations = getFallbackOrganizations(); // Only 3 core organizations
        const gridEl = document.getElementById('organizationsGrid');
        if (gridEl) {
            gridEl.innerHTML = '';
            fallbackOrganizations.forEach(org => {
                const card = createOrganizationCard(org, 'cached');
                gridEl.appendChild(card);
            });
            if (gridEl) gridEl.classList.remove('hidden');
        }
    }
}

// Fallback organizations for when API is unavailable
function getFallbackOrganizations() {
    return [{
            name: "BEDCO",
            description: "Basotho Enterprise Development Corporation - Supporting business growth and development in Lesotho.",
            email: "info@bedco.org.ls",
            phone: "+266 2231 2601",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.bedco.org.ls",
            iconColor: "blue",
            type: "funder",
            translationKey: "bedco"
        },
        {
            name: "LNDC",
            description: "Lesotho National Development Corporation - Promoting industrial and commercial development.",
            email: "info@lndc.org.ls",
            phone: "+266 2231 2421",
            address: "Pioneer Road, Maseru, Lesotho",
            website: "https://www.lndc.org.ls",
            iconColor: "green",
            type: "mentor",
            translationKey: "lndc"
        },
        {
            name: "SMME Unit",
            description: "Small, Medium and Micro Enterprises - Supporting small business development and entrepreneurship.",
            email: "smme@trade.gov.ls",
            phone: "+266 2231 2421",
            address: "Ministry of Trade, Maseru, Lesotho",
            website: "https://www.trade.gov.ls",
            iconColor: "yellow",
            type: "support",
            translationKey: "smme"
        },
        {
            name: "Lesotho Post Bank",
            description: "Government-owned bank providing financial services and business support.",
            email: "info@lpb.co.ls",
            phone: "+266 2231 4000",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.lpb.co.ls",
            iconColor: "purple",
            type: "funder",
            translationKey: "lesotho-post-bank"
        },
        {
            name: "National Manpower Development Secretariat",
            description: "Providing training and mentoring for business development.",
            email: "info@nmds.org.ls",
            phone: "+266 2231 2421",
            address: "Development House, Maseru, Lesotho",
            website: "https://www.nmds.org.ls",
            iconColor: "orange",
            type: "mentor",
            translationKey: "national-manpower-development-secretariat"
        },
        {
            name: "Ministry of Trade and Industry",
            description: "Supporting trade, industry and business development in Lesotho.",
            email: "info@trade.gov.ls",
            phone: "+266 2231 2421",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.trade.gov.ls",
            iconColor: "red",
            type: "support",
            translationKey: "ministry-of-trade-and-industry"
        },
        {
            name: "Lesotho Revenue Authority",
            description: "Supporting tax compliance and business registration services.",
            email: "info@lesothoRevenue.org.ls",
            phone: "+266 2231 3300",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.lra.org.ls",
            iconColor: "indigo",
            type: "support",
            translationKey: "lesotho-revenue-authority"
        },
        {
            name: "Private Sector Foundation Lesotho",
            description: "Supporting private sector development and advocacy in Lesotho.",
            email: "info@psf.org.ls",
            phone: "+266 2231 2700",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.psf.org.ls",
            iconColor: "teal",
            type: "support",
            translationKey: "private-sector-foundation-lesotho"
        },
        {
            name: "Lesotho Development Bank",
            description: "Providing development financing and financial services for business growth.",
            email: "info@ldb.co.ls",
            phone: "+266 2231 5555",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.ldb.co.ls",
            iconColor: "pink",
            type: "funder",
            translationKey: "lesotho-development-bank"
        },
        {
            name: "Federation of Lesotho Employers",
            description: "Representing employer interests and supporting business development initiatives.",
            email: "info@fle.co.ls",
            phone: "+266 2231 3450",
            address: "Industrial Area, Maseru, Lesotho",
            website: "https://www.fle.co.ls",
            iconColor: "cyan",
            type: "support",
            translationKey: "federation-of-lesotho-employers"
        },
        {
            name: "Lesotho Chamber of Commerce",
            description: "Promoting business interests and facilitating trade relationships in Lesotho.",
            email: "info@chamber.co.ls",
            phone: "+266 2231 4600",
            address: "Industrial Area, Maseru, Lesotho",
            website: "https://www.chamber.co.ls",
            iconColor: "emerald",
            type: "support",
            translationKey: "lesotho-chamber-of-commerce"
        },
        {
            name: "Maseru Chamber of Commerce",
            description: "Supporting local business development and trade in Maseru.",
            email: "info@maseru-chamber.co.ls",
            phone: "+266 2231 4700",
            address: "Maseru Commercial Area, Maseru, Lesotho",
            website: "https://www.maseru-chamber.co.ls",
            iconColor: "sky",
            type: "support",
            translationKey: "maseru-chamber-of-commerce"
        },
        {
            name: "Lesotho Women in Business",
            description: "Empowering women entrepreneurs and supporting female-led businesses.",
            email: "info@womeninbusiness.co.ls",
            phone: "+266 2231 4800",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.womeninbusiness.co.ls",
            iconColor: "rose",
            type: "mentor",
            translationKey: "lesotho-women-in-business"
        },
        {
            name: "National Youth Development Council",
            description: "Supporting youth entrepreneurship and development initiatives.",
            email: "info@youthcouncil.co.ls",
            phone: "+266 2231 4900",
            address: "Youth Centre, Maseru, Lesotho",
            website: "https://www.youthcouncil.co.ls",
            iconColor: "lime",
            type: "mentor",
            translationKey: "national-youth-development-council"
        }
    ];
}

// Legacy function for backward compatibility
function loadAdditionalBusinessSupport() {
    loadOrganizationsFromAPI();
}

// Function to create an organization card
function createOrganizationCard(org, dataSource = 'unknown') {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1';

    // Add data source badge
    const sourceBadge = dataSource === 'realtime' ?
        '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><div class="w-2 h-2 bg-green-400 rounded-full mr-1"></div>Live</span>' :
        '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><div class="w-2 h-2 bg-orange-400 rounded-full mr-1"></div>Cached</span>';

    const iconColors = {
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
        red: 'bg-red-100 text-red-600'
    };

    const iconClass = iconColors[org.iconColor] || 'bg-blue-100 text-blue-600';

    const iconSVG = getIconSVG(org.type);

    card.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <div class="${iconClass} p-2 rounded-full mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            ${iconSVG}
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold">${org.name}</h3>
                </div>
                ${sourceBadge}
            </div>
            <p class="text-gray-600 mb-4" data-lang="${org.translationKey}-desc">${org.description}</p>
            <div class="space-y-2 text-sm">
                <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg> ${org.email}
                </p>
                <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg> ${org.phone}
                </p>
                <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span data-lang="${org.translationKey}-address">${org.address}</span>
                </p>
            </div>
            <a href="${org.website}" target="_blank" class="mt-4 inline-flex items-center text-blue-600 hover:underline" data-lang="visit-website">
                Visit Website
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
            </a>
        </div>
    `;

    return card;
}

// Function to get icon SVG based on type
function getIconSVG(type) {
    switch (type) {
        case 'funder':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>';
        case 'mentor':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>';
        case 'support':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>';
        default:
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>';
    }
}

function updateLanguage() {
    const lang = window.currentLang || "st";

    // Primary: translate any element that has a data-lang attribute
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        const translated = translations[lang] && translations[lang][key];
        if (!translated) return;

        // If the element has children, only replace the first text node to preserve nested elements
        if (el.children && el.children.length > 0) {
            const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
            if (textNode) {
                textNode.nodeValue = translated;
            } else {
                el.insertBefore(document.createTextNode(translated), el.firstChild);
            }
        } else {
            el.textContent = translated;
        }

        // Update common attributes safely if present
        try {
            // placeholder: prefer dedicated placeholder key (data-lang + '-placeholder') then id-based key
            if (el.hasAttribute && el.hasAttribute('placeholder')) {
                const phKey = key + '-placeholder';
                if (translations[lang] && translations[lang][phKey]) {
                    el.placeholder = translations[lang][phKey];
                } else if (el.id && translations[lang] && translations[lang][el.id + '-placeholder']) {
                    el.placeholder = translations[lang][el.id + '-placeholder'];
                } else {
                    el.placeholder = translated;
                }
            }

            if (el.hasAttribute && el.hasAttribute('title')) {
                el.title = translated;
            }
            if (el.hasAttribute && el.hasAttribute('aria-label')) {
                el.setAttribute('aria-label', translated);
            }
            if (el.hasAttribute && el.hasAttribute('alt')) {
                el.setAttribute('alt', translated);
            }

            const tag = (el.tagName || '').toUpperCase();
            if (tag === 'INPUT') {
                const t = (el.type || '').toLowerCase();
                if (t === 'button' || t === 'submit' || t === 'reset') {
                    el.value = translated;
                }
            }
            if (tag === 'OPTION') {
                el.textContent = translated;
            }
        } catch (e) {
            console.error('updateLanguage attribute update error for', key, e);
        }
    });

    // Secondary: placeholders for elements without data-lang but with id-based keys
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
        const idBased = el.id ? el.id + "-placeholder" : null;
        if (idBased && translations[lang] && translations[lang][idBased]) {
            el.placeholder = translations[lang][idBased];
            return;
        }

        const dataKey = el.getAttribute && el.getAttribute('data-lang');
        if (dataKey) {
            const phKey = dataKey.endsWith('-placeholder') ? dataKey : dataKey + '-placeholder';
            if (translations[lang] && translations[lang][phKey]) {
                el.placeholder = translations[lang][phKey];
                return;
            }
        }
    });

    // Update selected displays to reflect language change
    if (typeof updateSelectedDisplay === 'function') {
        updateSelectedDisplay('selectedSkills', selectedSkills);
        updateSelectedDisplay('selectedInterests', selectedInterests);
    }
    if (typeof updateSelectedAssets === 'function') {
        updateSelectedAssets();
    }

    // Ensure the language toggle button shows the language the user can switch TO
    try {
        const toggleBtn = document.getElementById('langToggle');
        if (toggleBtn) {
            const key = 'lang-toggle';
            const label = translations[lang] && translations[lang][key];
            if (label) {
                // Set visible text and accessibility attributes
                if (toggleBtn.children && toggleBtn.children.length > 0) {
                    // replace first text node only
                    const tn = Array.from(toggleBtn.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                    if (tn) tn.nodeValue = label;
                    else toggleBtn.insertBefore(document.createTextNode(label), toggleBtn.firstChild);
                } else {
                    toggleBtn.textContent = label;
                }
                toggleBtn.setAttribute('aria-label', label);
                toggleBtn.title = label;
            }
        }
    } catch (e) {
        console.error('Failed to update langToggle label', e);
    }

    // Update language toggle button text to show the other language
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        const currentLang = window.currentLang || "st";
        const otherLang = currentLang === "en" ? "st" : "en";
        const otherLangText = translations[otherLang] && translations[otherLang]['lang-toggle'];
        if (otherLangText) {
            langToggleBtn.textContent = otherLangText;
        }
    }

    // Trigger repaint to ensure changes are visible immediately
    document.body.offsetHeight;
}