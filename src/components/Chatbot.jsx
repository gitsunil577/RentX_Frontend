import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to RentX. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common questions
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Greeting responses
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
      return "Hello! I'm here to help you with vehicle rentals. What would you like to know?";
    }

    // Vehicle-related queries
    if (lowerMessage.includes('vehicle') || lowerMessage.includes('car') || lowerMessage.includes('bike')) {
      return "We offer a wide range of vehicles including cars, bikes, and more! You can browse our collection by clicking 'Browse Vehicles' or visit the Vehicles page. Would you like to know about pricing or availability?";
    }

    // Pricing queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Our vehicle prices vary based on the type and model. Prices are displayed per day. You can also add insurance (10% of daily rate) and driver service (₹500/day). Check out our Vehicles page for specific pricing!";
    }

    // Booking queries
    if (lowerMessage.includes('book') || lowerMessage.includes('rent') || lowerMessage.includes('reserve')) {
      return "To book a vehicle: 1) Browse our vehicles, 2) Click 'Rent Now' on your preferred vehicle, 3) Select your rental dates and optional services, 4) Add to cart and checkout. Need help with any specific step?";
    }

    // Payment queries
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept secure online payments through Razorpay. You can pay using UPI, credit/debit cards, net banking, and digital wallets. Payment is processed securely after you add items to cart and checkout.";
    }

    // Insurance queries
    if (lowerMessage.includes('insurance')) {
      return "Yes! We offer insurance coverage at 10% of the daily rental rate. You can add insurance when booking a vehicle. It provides coverage for damages and ensures peace of mind during your rental period.";
    }

    // Driver queries
    if (lowerMessage.includes('driver')) {
      return "We provide professional driver services for ₹500 per day. You can select this option when booking your vehicle. Our drivers are experienced and licensed.";
    }

    // Location/pickup queries
    if (lowerMessage.includes('location') || lowerMessage.includes('pickup') || lowerMessage.includes('deliver')) {
      return "You can specify your preferred pickup location when making a booking. Enter your address in the 'Pickup Location' field during the rental booking process.";
    }

    // Contact queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "For assistance, you can visit our Contact page or reach out to our support team. We're here to help with any questions about your rental!";
    }

    // Account queries
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('register')) {
      return "You can create an account or login from the top navigation bar. Having an account allows you to book vehicles, track your rentals, and manage your bookings easily.";
    }

    // Cart queries
    if (lowerMessage.includes('cart')) {
      return "Your cart stores the vehicles you want to rent. Click the cart icon in the navigation to view your selections and proceed to checkout. You can modify rental details or remove items from your cart anytime.";
    }

    // Availability queries
    if (lowerMessage.includes('available') || lowerMessage.includes('availability')) {
      return "Vehicle availability is shown on each vehicle card with 'Available' or 'Not Available' status. Available vehicles can be booked immediately. Check our Vehicles page for current availability!";
    }

    // Duration queries
    if (lowerMessage.includes('how long') || lowerMessage.includes('duration') || lowerMessage.includes('days')) {
      return "You can rent vehicles for any duration you need! Simply select your start and end dates when booking. The system automatically calculates the total days and pricing.";
    }

    // Cancellation queries
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return "For information about cancellations and refunds, please contact our support team through the Contact page. They'll assist you with your specific booking.";
    }

    // Thank you
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions. Happy renting! 🚗";
    }

    // Goodbye
    if (lowerMessage.match(/^(bye|goodbye|see you|thanks bye)/)) {
      return "Goodbye! Have a great day and enjoy your ride! 🚗✨";
    }

    // Default response
    return "I'm here to help! You can ask me about:\n• Vehicle types and pricing\n• How to book/rent vehicles\n• Insurance and driver services\n• Payment methods\n• Account and contact info\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMsg = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMsg = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
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
