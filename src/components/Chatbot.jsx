import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to RentX. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [supportEmail, setSupportEmail] = useState('rentx.sms.alerts@gmail.com');
  const [showSupportContact, setShowSupportContact] = useState(false);
  const messagesEndRef = useRef(null);
  const API_URL = 'http://localhost:8001/api/v1/chatbot';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch AI response from backend
  const getBotResponse = async (userMessage) => {
    try {
      // Build conversation history from messages
      const conversationHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          message: msg.text
        }));

      const response = await axios.post(`${API_URL}/message`, {
        message: userMessage,
        conversationHistory
      });

      if (response.data.success) {
        const { response: botResponse, isAI, needsEscalation, supportEmail: email } = response.data.data;

        // Update support email if provided
        if (email) {
          setSupportEmail(email);
        }

        // Show support contact if escalation is needed
        if (needsEscalation) {
          setShowSupportContact(true);
        }

        return {
          text: botResponse,
          isAI,
          needsEscalation
        };
      }
    } catch (error) {
      console.error('Chatbot API error:', error);
      // Fallback response on error
      return {
        text: "I apologize, but I'm having trouble connecting right now. For immediate assistance, please contact our support team at rentx.sms.alerts@gmail.com or call +91 98765 43210.",
        isAI: false,
        needsEscalation: true
      };
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = inputMessage.trim();

    // Add user message
    const userMsg = {
      type: 'user',
      text: userMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Get AI response
    const botResponseData = await getBotResponse(userMessage);

    const botMsg = {
      type: 'bot',
      text: botResponseData.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: botResponseData.isAI,
      needsEscalation: botResponseData.needsEscalation
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Browse Vehicles", action: "Tell me about vehicles" },
    { text: "How to Book?", action: "How do I book a vehicle?" },
    { text: "Pricing Info", action: "What are the prices?" },
    { text: "Contact Support", action: "How can I contact support?" },
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
            <FaRobot className="w-6 h-6" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-50"></div>

            <div className="relative bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaRobot className="w-8 h-8 text-white" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">RentX Assistant</h3>
                    <p className="text-blue-100 text-xs">Online • Ready to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                          : 'bg-slate-700'
                      }`}
                    >
                      {msg.type === 'user' ? (
                        <FaUser className="w-4 h-4 text-white" />
                      ) : (
                        <FaRobot className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div
                      className={`flex flex-col max-w-[75%] ${
                        msg.type === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-slate-700 text-slate-100'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        {msg.type === 'bot' && msg.isAI && (
                          <span className="inline-block mt-1 text-xs text-blue-400 opacity-60">
                            ✨ AI-powered
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <FaRobot className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="bg-slate-700 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Support Contact Card */}
              {showSupportContact && (
                <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1">
                        <FaEnvelope className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-blue-300 mb-1">Need More Help?</h4>
                        <p className="text-xs text-slate-300 mb-2">Contact our support team for personalized assistance:</p>
                        <div className="space-y-1">
                          <a
                            href={`mailto:${supportEmail}`}
                            className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <FaEnvelope className="w-3 h-3" />
                            <span className="truncate">{supportEmail}</span>
                          </a>
                          <a
                            href="tel:+919876543210"
                            className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <FaPhone className="w-3 h-3" />
                            <span>+91 98765 43210</span>
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowSupportContact(false)}
                        className="flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700">
                  <p className="text-xs text-slate-400 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-slate-900 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ''}
                    className={`px-4 py-3 rounded-lg transition-all ${
                      inputMessage.trim() === ''
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-105'
                    }`}
                  >
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
