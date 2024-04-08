import React, {useState, useEffect} from 'react';
import {startConversation, sendMessage, getConversation} from '../utils/ApiFunctions';

const Message = () => {
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleStartConversation = async () => {
        const user = 'user'; // replace with actual user
        const role = 'role'; // replace with actual role
        const data = await startConversation(user, role);
        setConversationId(data.id);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const sender = 'sender'; // replace with actual sender
        const content = newMessage;
        await sendMessage(conversationId, sender, content);
        setNewMessage('');
    };

    useEffect(() => {
        const fetchConversation = async () => {
            if (conversationId) {
                const data = await getConversation(conversationId);
                setMessages(data.messages);
            }
        };

        fetchConversation();
    }, [conversationId]);

    return (
        <div className="flex flex-col h-full bg-white rounded-md shadow-md">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Chat</h2>
                <button onClick={handleStartConversation}>Start Conversation</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div className="flex items-end mb-4" key={index}>
                        <div className="flex-none">
                            <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/40"
                                 alt="User avatar"/>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm text-gray-600">{message.sender}</div>
                            <div className="mt-1 text-sm text-gray-800">{message.content}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-200">
                <form className="flex" onSubmit={handleSendMessage}>
                    <input
                        className="flex-1 rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type="text" placeholder="Type a message" value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <button className="rounded-r-md bg-indigo-500 text-white px-4" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;

