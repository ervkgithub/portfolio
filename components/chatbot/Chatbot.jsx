import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { findAnswer } from '../../data/chatbotData';

function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hello! 👋 I'm here to help answer questions about Vijay experience, skills, and projects. Feel free to ask me anything!",
			sender: 'bot',
			timestamp: new Date(),
		},
	]);
	const [inputValue, setInputValue] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleSendMessage = () => {
		if (!inputValue.trim() || isTyping) return;

		const userMessage = {
			id: Date.now(),
			text: inputValue.trim(),
			sender: 'user',
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsTyping(true);

		// Simulate bot thinking time
		setTimeout(() => {
			const botResponse = {
				id: Date.now() + 1,
				text: findAnswer(userMessage.text),
				sender: 'bot',
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, botResponse]);
			setIsTyping(false);
		}, 800);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const quickQuestions = [
		'About Vijay',
		'Total experience',
		'Vijay skills',
		'Contact',
		'Projects',
		'Notice period',
	];

	const handleQuickQuestion = (question) => {
		setInputValue(question);
		setTimeout(() => {
			handleSendMessage();
		}, 100);
	};

	return (
		<>
			{/* Chatbot Toggle Button */}
			{!isOpen && (
				<motion.button
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsOpen(true)}
					className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-indigo-500 hover:bg-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
					aria-label="Open chatbot"
				>
					<FiMessageCircle className="text-xl sm:text-2xl" />
					<span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse text-[10px] sm:text-xs">
						1
					</span>
				</motion.button>
			)}

			{/* Chatbot Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.9 }}
						className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px] bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-2xl flex flex-col border border-ternary-light dark:border-ternary-dark"
					>
						{/* Header */}
						<div className="bg-indigo-500 text-white p-4 rounded-t-lg flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
								<h3 className="font-general-medium text-lg">Portfolio Assistant Vijay</h3>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="hover:bg-indigo-600 rounded p-1 transition-colors"
								aria-label="Close chatbot"
							>
								<FiX className="text-xl" />
							</button>
						</div>

						{/* Messages Container */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ternary-light dark:bg-ternary-dark">
							{messages.map((message) => (
								<motion.div
									key={message.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
								>
									<div
										className={`max-w-[80%] rounded-lg p-3 ${
											message.sender === 'user'
												? 'bg-indigo-500 text-white'
												: 'bg-white dark:bg-primary-dark text-primary-dark dark:text-ternary-light'
										}`}
									>
										<p className="text-sm whitespace-pre-wrap">{message.text}</p>
										<span className="text-xs opacity-70 mt-1 block">
											{message.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									</div>
								</motion.div>
							))}

							{isTyping && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex justify-start"
								>
									<div className="bg-white dark:bg-primary-dark rounded-lg p-3">
										<div className="flex gap-1">
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
											<div
												className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
												style={{ animationDelay: '0.2s' }}
											></div>
											<div
												className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
												style={{ animationDelay: '0.4s' }}
											></div>
										</div>
									</div>
								</motion.div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Quick Questions */}
						{quickQuestions.length > 0 && messages.length <= 1 && (
							<div className="px-4 py-2 border-t border-ternary-light dark:border-ternary-dark">
								<p className="text-xs text-ternary-dark dark:text-ternary-light mb-2">
									Quick questions:
								</p>
								<div className="flex flex-wrap gap-2">
									{quickQuestions.map((question, index) => (
										<button
											key={index}
											onClick={() => handleQuickQuestion(question)}
											className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
										>
											{question}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Input Area */}
						<div className="p-4 border-t border-ternary-light dark:border-ternary-dark bg-secondary-light dark:bg-secondary-dark">
							<div className="flex gap-2">
								<input
									ref={inputRef}
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Ask me anything..."
									className="flex-1 px-4 py-2 border border-ternary-light dark:border-ternary-dark rounded-lg bg-white dark:bg-ternary-dark text-primary-dark dark:text-ternary-light focus:outline-none focus:ring-2 focus:ring-indigo-500"
									disabled={isTyping}
								/>
								<button
									onClick={handleSendMessage}
									disabled={!inputValue.trim() || isTyping}
									className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									aria-label="Send message"
								>
									<FiSend className="text-xl" />
								</button>
							</div>
							<p className="text-xs text-ternary-dark dark:text-ternary-light mt-2 text-center">
								Ask about experience, skills, projects, or availability
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default Chatbot;

