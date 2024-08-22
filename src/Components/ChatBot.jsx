import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('/api/chatbot', { message: input });
            setMessages([...newMessages, { text: response.data.reply, sender: 'bot' }]);
        } catch (error) {
            setMessages([...newMessages, { text: 'Error al obtener respuesta del bot.', sender: 'bot' }]);
        }
    };

    return (
        <div>
            {/* Botón para alternar la visibilidad del chatbot */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isOpen ? 'Ocultar Chat' : 'Mostrar Chat'}
            </button>

            {/* Contenedor del chatbot */}
            {isOpen && (
                <div className="fixed bottom-16 right-10 w-80 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
                    <div className="h-64 overflow-y-auto mb-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 my-2 rounded-lg ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end'
                                        : 'bg-gray-200 text-gray-800 self-start'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Escribe un mensaje..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
