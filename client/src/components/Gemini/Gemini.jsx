import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function PetAdoptionAI() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const enhancedPrompt = `You are a pet adoption specialist AI assistant. Please provide helpful, compassionate advice about: ${prompt}. 
            Focus on pet adoption processes, pet care, matching pets with owners, and related topics. 
            Format your response in a clear, easy-to-read way with proper sections.`;

            const result = await model.generateContent(enhancedPrompt);
            let cleanResponse = result.response.text();

            // Remove markdown headers (##) from the response
            cleanResponse = cleanResponse.replace(/##\s+/g, '');
            cleanResponse = cleanResponse.replace(/\n\s*\*\s+/g, '\n• ');

            setResponse(cleanResponse);
        } catch (error) {
            console.error(error);
            setResponse("Error: " + error.message);
        }
        setLoading(false);
    };

    const formatResponse = (text) => {
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/(^|[^*])\*(?!\s)([^*]+)(?!\s)\*/g, '$1<em>$2</em>');
        formattedText = formattedText.replace(/\n•/g, '\n<span class="bullet">•</span>');
        return { __html: formattedText };
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 py-16 mt-16">
            <div className="w-full max-w-4xl bg-base-200 shadow-xl rounded-lg p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Pet Adoption AI Assistant
                    </h1>
                    <p className="text-base-content text-lg opacity-80">
                        Get expert guidance on pet adoption, care, and finding your perfect companion
                    </p>
                </div>

                {/* Input Section */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-base-content mb-3">
                        Ask about pet adoption, care, or training
                    </label>
                    <textarea
                        className="w-full p-4 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all duration-200 bg-base-100 text-base-content"
                        rows="4"
                        placeholder="Example: What should I consider before adopting a dog? How to prepare my home for a new pet? What are the best pets for apartments?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus text-primary-content py-3 px-4 rounded-lg font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Getting advice...
                        </span>
                    ) : "Get Expert Advice"}
                </button>

                {/* Response Section */}
                {response && (
                    <div className="mt-8 p-6 bg-base-300 border border-base-300 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-base-content mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Pet Adoption Advice
                        </h2>
                        <div
                            className="text-base-content leading-relaxed whitespace-pre-wrap response-content"
                            dangerouslySetInnerHTML={formatResponse(response)}
                        />
                    </div>
                )}

                {/* Tips Section */}
                <div className="mt-8 bg-base-300 p-5 rounded-lg border border-base-300">
                    <h3 className="text-lg font-medium text-base-content mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.654 5.5a2.25 2.25 0 10-2.25-2.25 2.25 2.25 0 002.25 2.25zM13.5 8.25a2.25 2.25 0 10-2.25-2.25 2.25 2.25 0 002.25 2.25zM16.5 11.25a2.25 2.25 0 10-2.25-2.25 2.25 2.25 0 002.25 2.25z" />
                            <path fillRule="evenodd" d="M4.5 15.75A2.25 2.25 0 016.75 13.5h6.5a2.25 2.25 0 012.25 2.25v.5a.75.75 0 01-.75.75h-10a.75.75 0 01-.75-.75v-.5z" clipRule="evenodd" />
                        </svg>
                        Suggested Questions:
                    </h3>
                    <ul className="list-disc list-inside text-base-content opacity-80 pl-2 space-y-2">
                        <li>How to prepare my home for a new pet?</li>
                        <li>What are the best dog breeds for families with children?</li>
                        <li>How much does it cost to adopt a cat?</li>
                        <li>What should I look for when visiting an animal shelter?</li>
                        <li>How to help a rescue pet adjust to a new home?</li>
                    </ul>
                </div>
            </div>

            <style>{`
                .response-content {
                    line-height: 1.7;
                }
                .response-content strong {
                    color: hsl(var(--p));
                    font-weight: 600;
                }
                .response-content .bullet {
                    display: inline-block;
                    width: 1.2em;
                    color: hsl(var(--s));
                }
            `}</style>
        </div>
    );
}

export default PetAdoptionAI;