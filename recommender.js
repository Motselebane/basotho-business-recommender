/**
 * Handles business recommendations and feedback for Basotho entrepreneurs.
 */
const axios = require("axios");

const GOOGLE_API_KEY = "AIzaSyBirwb3GHkUJFonKPv3Y2gXbgoacSmPkxg";

/**
 * Creates business suggestions based on what the user tells us about themselves.
 * @param {string} skills - What the user is good at
 * @param {string} interests - What the user likes doing
 * @param {string} capital - How much money and stuff they have
 * @param {string} location - Where the user lives
 * @param {string} availability - How much time they can spend on business
 * @param {string} lang - Whether they want English or Sesotho ('en' or 'st')
 * @returns {string} Business ideas tailored to the user
 */
async function recommendBusiness(skills, interests, capital, location, availability, lang = "en") {
    try {
        // Build prompt based on user's language preference
        let prompt = "";

        if (lang === "st") {
            // Sesotho prompt
            prompt = `
U moeletsi ea thusang khoebong bakeng sa borakhoebo ba Basotho, ea tsebang ka litlhoko le menyetla ea 'maraka Lesotho.
Ka boemo ba mosebelisi bo ka tlase, khothalletsa MEHOPOLO E MERARO (3) ea khoebo e sebetsang, e lumellanang le bokhoni/lisebelisoa tsa mosebelisi le sebaka. Fana ka karabo ka Sesotho.

LITATAISO TSA BOHLOKOA (u tlameha ho latela sena):
- Fana ka mehopolo e MERARO e beakanyeditsoeng ka tsela e nepahetseng (#1 e loketseng ka ho fetisisa, #2 e latelang, #3 ea boraro).
- Mohopolo o mong le o mong o tlameha ho KA QALOANG KA BOTLALO ka chelete e boletsoeng ke mosebelisi (${capital}).
- Nahana ka lintho tsohle tsa bohlokoa tsa ho qala le litšenyehelo: laesense/tumello, lisebelisoa/le lisebelisoa, thepa ea pele, rente/kapa sebaka, motlakase le metsi, lipalangwang, papatso, lingoliso tsa motheo, le chelete ea ts'ebetso ea likhoeli tse 1–2.
- Fana ka TEKANYETSO e qaqileng (itemized) ka litheko tsa lehae 'me u netefatse hore KAKARETSO e ka hare ho capital e boletsoeng.
- Haeba mohopolo o ka feta chelete e boletsoeng, FOKOTSA/ADAPTA boholo kapa sekala hore o LOKELLE budget e boletsoeng.
- Ela hloko maemo a lehae le menyetla ea sebakeng sa ${location} hape sebelisa sena ho fumane tse amang Lesotho, FinScope Micro, Small and Medium Enterprises Survey, or other studies from the Lesotho Ministry of Trade, Central Bank of Lesotho, and World Bank country diagnostics.

E-ba le bokhutšoanyane. Fana ka mehopolo e MERARO, 'me mohopolo o mong le o mong o arole ka likarolo tse latelang (U SE KE UA fetola lihlooho):

==== MOHOPOLO #1: [Sehlooho sa Khoebo] ====
Bothata bo rarolloa:
Sehlooho sa Khoebo:
Tlhaloso:
Hobaneng e lekana mosebelisi:
Khakanyo ea chelete e hlokahalang:
Lenaneo le sisintsoeng:

==== MOHOPOLO #2: [Sehlooho sa Khoebo] ====
Bothata bo rarolloa:
Sehlooho sa Khoebo:
Tlhaloso:
Hobaneng e lekana mosebelisi:
Khakanyo ea chelete e hlokahalang:
Lenaneo le sisintsoeng:

==== MOHOPOLO #3: [Sehlooho sa Khoebo] ====
Bothata bo rarolloa:
Sehlooho sa Khoebo:
Tlhaloso:
Hobaneng e lekana mosebelisi:
Khakanyo ea chelete e hlokahalang:
Lenaneo le sisintsoeng:

Boemo:
- Tsebo: ${skills}
- Lithahasello: ${interests}
- Capital/Thepa: ${capital}
- Sebaka: ${location}
- Ho fumaneha: ${availability}
`;
        } else {
            // English prompt
            prompt = `
You are a helpful business advisor for Basotho entrepreneurs, expert in local market needs and opportunities in Lesotho.

Given the user profile below, recommend THREE (3) practical business ideas ranked by best fit for the user's skills/resources and location. Make the response in English. Consider local realities around ${location}. Use findings from the FinScope Micro, Small and Medium Enterprises Survey, studies by the Lesotho Ministry of Trade, Central Bank of Lesotho, World Bank country diagnostics, and when direct Lesotho data is limited, reference business trends and proven sectors from similar environments (such as rural South Africa, Botswana, or Swaziland), and adapt them to fit Lesotho conditions using cross-referenced local checks.

CRITICAL REQUIREMENTS (you must comply):

Provide THREE ranked ideas (#1 best fit, #2 second best, #3 third option).

Each idea must be able to be FULLY STARTED with the user's stated capital (${capital}).

Consider ALL required startup items and costs: licenses/permits, equipment/tools, initial stock, rent/space, utilities, transportation, marketing, basic registrations, and 1–2 months of working capital.

Provide an ITEMIZED budget with realistic local prices and ensure the TOTAL stays within the user's capital.

If an idea would exceed the capital, ADAPT/SCOPE it down so it fits the budget.

Be concise, use simple English. Provide THREE ideas, each with the following sections (do not change the section headers):

====
IDEA #1: [Business Title]
Problem Solved:
Business Title:
Description:
Why it fits:
Estimated capital needed:
Suggested schedule:

====
IDEA #2: [Business Title]
Problem Solved:
Business Title:
Description:
Why it fits:
Estimated capital needed:
Suggested schedule:

====
IDEA #3: [Business Title]
Problem Solved:
Business Title:
Description:
Why it fits:
Estimated capital needed:
Suggested schedule:

Profile:

Skills: ${skills}

Interests: ${interests}

Capital/Assets: ${capital}

Location: ${location}

Availability: ${availability}
`;
        }

        // Try different Gemini models in order of preference for better availability
        const modelUrls = [
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`
        ];

        const body = {
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        };

        let lastError = null;

        // Try each model until one works
        for (const url of modelUrls) {
            try {
                console.log(`🔄 Trying model: ${url.split('models/')[1].split(':')[0]}`);

                const response = await axios.post(url, body, {
                    headers: { "Content-Type": "application/json" },
                    timeout: 30000 // 30 second timeout per attempt
                });

                if (response.status === 200) {
                    console.log(`✅ Success with model: ${url.split('models/')[1].split(':')[0]}`);
                    break; // Success, exit the loop
                }
            } catch (err) {
                lastError = err;
                console.warn(`⚠️ Model failed: ${err.response?.status || err.code} - ${err.message}`);
                continue; // Try next model
            }
        }

        // If no model worked, throw the last error
        if (lastError) {
            throw lastError;
        }

        // Extract response text safely
        const text =
            response.data && response.data.candidates && response.data.candidates[0] &&
            response.data.candidates[0].content && response.data.candidates[0].content.parts &&
            response.data.candidates[0].content.parts[0] && response.data.candidates[0].content.parts[0].text ?
            response.data.candidates[0].content.parts[0].text :
            "No recommendation generated.";

        return text.trim();

    } catch (err) {
        console.error("Service request failed:", err.response && err.response.data ? err.response.data : err.message);

        // Provide fallback recommendations when AI service is unavailable
        if ((err.response && err.response.status === 503) || err.message.includes('overloaded') || err.message.includes('UNAVAILABLE')) {
            return generateFallbackRecommendations(skills, interests, capital, location, availability, lang);
        }

        return "Failed to generate recommendation. Please try again.";
    }
}

// Fallback recommendations when AI service is unavailable
function generateFallbackRecommendations(skills, interests, capital, location, availability, lang = "en") {
    const recommendations = {
        en: `
==== IDEA #1: Home-Based Food Business ====
Problem Solved: Local demand for fresh, homemade meals and snacks
Business Title: Home Kitchen Services
Description: Start a small-scale food preparation business from home, offering meals, snacks, or baked goods to local customers. Focus on popular local dishes and healthy options.
Why it fits: Cooking skills are directly utilized, low startup costs, flexible hours, serves local market
Estimated capital needed: M2,000 - M4,000 (ingredients, basic equipment, packaging)
Suggested schedule: 4-6 hours daily, mornings for prep, afternoons/evenings for orders

==== IDEA #2: Tech Support Services ====
Problem Solved: Growing need for digital literacy and device support in Lesotho
Business Title: Mobile Device & Computer Services
Description: Offer smartphone setup, computer repair, basic tech training, and digital services to businesses and individuals.
Why it fits: Combines technology interests with practical service, scalable business, high local demand
Estimated capital needed: M3,000 - M6,000 (tools, spare parts, transport)
Suggested schedule: 5-6 hours daily, flexible timing based on appointments

==== IDEA #3: Community Delivery Service ====
Problem Solved: Limited access to goods and services in residential areas
Business Title: Local Delivery & Errand Services
Description: Provide reliable delivery services for groceries, medications, documents, and small items within ${location} and surrounding areas.
Why it fits: Flexible availability, growing e-commerce, low startup investment, serves real community need
Estimated capital needed: M1,500 - M4,000 (transport, communication, initial fuel)
Suggested schedule: 3-5 hours daily, peak times for errands and deliveries
        `,
        st: `
==== MOHOPOLO #1: Khoebo ea Bohoeki ====
Bothata bo rarolloa: Kopo ea litho tsa sejoale-tseoele le li-snacks tsa lehae
Sehlooho sa Khoebo: Litšebeletso tsa Bohoeki ba Lehae
Tlhaloso: Qala khoebo ea ho lokisa joala ho tloha ntlong ea hau, o fanang ka lijo, li-snacks, kapa lijo tse pob-tseng malang a batho ba lehae. Nehela maikutlo a lijong tsa lehae le tsa botshehetsi.
Hobaneng e lekana mosebelisi: Bokhoni ba ho pheha bo sebediswa ka tlhokomeliso, litšenyehelo tse tlase tsa ho qala, menobo e feletseng, e sebetsa 'marakeng oa lehae
Khakanyo ea chelete e hlokahalang: M2,000 - M4,000 (litlamo, lisebelisoa tse tlase, mopakete)
Lenaneo le sisintsoeng: 4-6 hora letsatsi, motsotsane bakeng sa ho lokisa, mantiboea/mantsiboea bakeng sa liodara

==== MOHOPOLO #2: Litšebeletso tsa Thekenoloji ====
Bothata bo rarolloa: Kopo ea ho utloisisisa thekenoloji le tšehetso ea lisebelisoa Lesotho
Sehlooho sa Khoebo: Litšebeletso tsa Device ea Mobile & Computer
Tlhaloso: Fana ka ho lokisa smartphones, ho lokisa computers, koetliso ea thekenoloji ea motheo, le litšebeletso tsa thekenoloji ho mesebetsi le batho ba lehae.
Hobaneng e lekana mosebelisi: E kopanya lithahasello tsa thekenoloji le litšebeletso tse sebetsang, khoebo e kholoang, kopo e kholo ea lehae
Khakanyo ea chelete e hlokahalang: M3,000 - M6,000 (lisebelisoa, lithepa tse nkhang, phetheho)
Lenaneo le sisintsoeng: 5-6 hora letsatsi, nako e feletseng e emetsoeng ka liodara

==== MOHOPOLO #3: Ts'ebeletso ea Polokelo ea Sechaba ====
Bothata bo rarolloa: Ho fella ha lisebelisoa le litšebeletso lifelong tsa residential
Sehlooho sa Khoebo: Ts'ebeletso ea Polokelo ea Lehae & Errand
Tlhaloso: Fana ka ts'ebeletso e tshepiloeeng ea polokelo ea li-groceries, meriana, litokomane, le lintho tse nyane ka hare ho ${location} le mafelong a potakileng.
Hobaneng e lekana mosebelisi: Ho fumaneha ha nako ho feletseng, kholo ea e-commerce, tefo e tlase ea ho qala, e sebetsa tlhokomelo ea nnete ea sechaba
Khakanyo ea chelete e hlokahalang: M1,500 - M4,000 (phetheho, khokahano, fuel ea pele)
Lenaneo le sisintsoeng: 3-5 hora letsatsi, nako e kholo bakeng sa errand le polokelo
        `
    };

    return recommendations[lang] || recommendations.en;
}

/**
 * Gives helpful feedback and analysis for a business idea someone came up with.
 * Looks at risks, market potential, profitability, and other important factors.
 * @param {string} skills - What the user is good at
 * @param {string} interests - What the user likes doing
 * @param {string} capital - How much money and stuff they have
 * @param {string} location - Where the user lives
 * @param {string} availability - How much time they can spend on business
 * @param {string} idea - The business idea to check out
 * @param {string} lang - Whether they want English or Sesotho ('en' or 'st')
 * @returns {string} Helpful feedback on the business idea
 */
async function provideIdeaFeedback(skills, interests, capital, location, availability, idea, lang = "en") {
    try {
        // Build evaluation prompt based on language
        let prompt = "";
        if (lang === "st") {
            prompt = `
Ebaka mohopolo ona oa khoebo bakeng sa ho sebetsa le monyetla: "${idea}"

Pele, etsa qeto ea hore na ona ke monyetla o motle oa khoebo ka kakaretso (ee kapa che). Fana ka lebaka le khutšoanyane bakeng sa tlhahlobo ea hau.

Haeba e le monyetla o motle oa khoebo, hlalosa ka botlalo u sebelisa likarolo tse hlophisitsoeng tse latelang:
- **Kotsi**: Supa likotsi tsa bohlokoa, ho kenyelletsa tsa lichelete, ts'ebetso, 'maraka, le ta taolo, 'me u fane ka maano a ho fokotsa.
- **Monyetla oa Maraka**: Sekaseka boholo ba 'maraka o shebiloeng, mekhoa ea kholo, tlholisano, le lintlha tse ikhethang tsa ho rekisa.
- **Ho etsa phaello**: Hakanya mefuta ea chelete e ka bang teng, litšenyehelo, tlhahlobo ea ho itšeha, le phaello e nahannoeng.
- **Ho khoneha**: Sekaseka lisebelisoa tse hlokahalang (mohlala, capital, tsebo, thekenoloji), ho hola, le kemiso ea nako ea ho kenya ts'ebetsong.
- **Ho tšoarella**: Bua ka ho sebetsa nako e telele, tšusumetso ea tikoloho, le lintlha tsa boitšoaro.

Haeba e se monyetla o motle oa khoebo, hlalosa hobaneng ka serapa se khutšoanyane, u totobatsa liphoso tse kholo kapa litšitiso tsa katleho.

Boloka karabo e leka-lekane, e thehiloeng bopaking, le e ka etsoang. Fokotsa ho mantsoe a 500.

MOELELO OA BOHLOKOA bakeng sa tlhahlobo ena:
- Boemo ba Mosebelisi: Tsebo: ${skills}, Lithahasello: ${interests}, Capital: ${capital}, Sebaka: ${location}, Ho fumaneha: ${availability}
- Nahana ka maemo a lehae a Lesotho/Basotho le lithibelo.
`;
        } else {
            prompt = `
Evaluate the following business idea for viability and potential: "${idea}"

First, determine if this is a good business opportunity overall (yes or no). Provide a brief justification for your assessment.

If it is a good business opportunity, explain in detail using the following structured sections:
- **Risk**: Identify key risks, including financial, operational, market, and regulatory risks, and suggest mitigation strategies.
- **Market Potential**: Analyze the target market size, growth trends, competition, and unique selling points.
- **Profitability**: Estimate potential revenue streams, costs, break-even analysis, and projected profitability.
- **Feasibility**: Assess required resources (e.g., capital, skills, technology), scalability, and implementation timeline.
- **Sustainability**: Discuss long-term viability, environmental impact, and ethical considerations.

If it is not a good business opportunity, explain why in a concise paragraph, highlighting major flaws or barriers to success.

Keep the response balanced, evidence-based, and actionable. Limit to 500 words.

CRITICAL CONTEXT for this evaluation:
- User Profile: Skills: ${skills}, Interests: ${interests}, Capital: ${capital}, Location: ${location}, Availability: ${availability}
- Consider local Lesotho/Basotho market conditions and constraints.
`;
        }

        // Prepare API request for feedback evaluation
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
        const body = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

        // Make API call with extended timeout for detailed analysis
        const response = await axios.post(url, body, { headers: { "Content-Type": "application/json" }, timeout: 60000 });
        const text = response.data && response.data.candidates && response.data.candidates[0] &&
            response.data.candidates[0].content && response.data.candidates[0].content.parts &&
            response.data.candidates[0].content.parts[0] && response.data.candidates[0].content.parts[0].text ?
            response.data.candidates[0].content.parts[0].text :
            "No feedback generated.";
        return String(text).trim();
    } catch (err) {
        console.error("Feedback request failed:", err.response && err.response.data ? err.response.data : err.message);

        // Handle timeouts with fallback retry using simplified prompt
        if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
            console.log("Timeout occurred, retrying with simplified prompt...");
            try {
                // Fallback to simpler analysis when detailed evaluation times out
                const simplePrompt = `Give brief feedback on this business idea: "${idea}". Focus on: success potential, risks, and budget fit with ${capital} capital. Keep response under 200 words.`;
                const retryBody = { contents: [{ role: "user", parts: [{ text: simplePrompt }] }] };
                const retryResponse = await axios.post(url, retryBody, {
                    headers: { "Content-Type": "application/json" },
                    timeout: 30000 // Shorter timeout for retry
                });
                const retryText = retryResponse.data && retryResponse.data.candidates && retryResponse.data.candidates[0] &&
                    retryResponse.data.candidates[0].content && retryResponse.data.candidates[0].content.parts &&
                    retryResponse.data.candidates[0].content.parts[0] && retryResponse.data.candidates[0].content.parts[0].text ?
                    retryResponse.data.candidates[0].content.parts[0].text :
                    "No feedback generated.";
                return String(retryText).trim();
            } catch (retryErr) {
                console.error("Retry also failed:", retryErr.message);
                return "Service is currently busy. Please try again in a few moments.";
            }
        }
        return "Failed to generate feedback. Please try again.";
    }
}

module.exports = { recommendBusiness, provideIdeaFeedback };