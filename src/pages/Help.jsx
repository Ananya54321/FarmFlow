import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { fetchGeminiResponse } from '../utils/api';

const Help = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const prompt = `Act as a farmer helper who is using his resources and planting crops. The user asks: "${query}". Provide a helpful response with relevant information and advice. Format your response in markdown, using headers, lists, and emphasis where appropriate. At the end, suggest some YouTube search terms related to this query. Display your answer in ${language} language.`;
    
    try {
      const result = await fetchGeminiResponse(prompt);
      setResponse(result);
      
      // Extract YouTube search terms
      const youtubeTerms = result.match(/YouTube search terms?:(.+)/i);
      if (youtubeTerms && youtubeTerms[1]) {
        setYoutubeLinks(youtubeTerms[1].split(',').map(term => term.trim()));
      }
    } catch (err) {
      setError('Failed to fetch response. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if (response) {
      await translateToLanguage(newLanguage);
    }
  };

  const translateToLanguage = async (selectedLanguage) => {
    if (!response) return;

    setLoading(true);
    setError(null);
    const prompt = `Please translate the following text into ${selectedLanguage}, maintaining the markdown formatting: ${response}`;
    try {
      const translatedResponse = await fetchGeminiResponse(prompt);
      setResponse(translatedResponse);
    } catch (err) {
      setError('Failed to translate the text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const readAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = language === 'english' ? 'en-US' : 'hi-IN'; // Adjust for other languages
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  // Function to convert markdown to HTML
  const markdownToHtml = (markdown) => {
    const html = markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/- (.*)/gim, '<li class="ml-6">$1</li>')
      .replace(/^(?![<h])/gim, '<p class="mb-4">');
    return html;
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Help</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="query" className="block text-gray-700 font-bold mb-2">Enter your query:</label>
            <input
              type="text"
              id="query"
              name="query"
              value={query}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Select Language</label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bengali">Bengali</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>
              <option value="gujarati">Gujarati</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </form>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {response && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Our Suggestion:</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(response) }}
            />
            <div className="mt-4">
              <button onClick={readAloud} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                Read Aloud
              </button>
            </div>
          </div>
        )}
        {youtubeLinks.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Suggested YouTube Search Terms:</h2>
            <ul className="list-disc pl-6">
              {youtubeLinks.map((term, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {term}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Help;