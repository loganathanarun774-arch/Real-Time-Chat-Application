import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft, Plus } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import SettingsSidebar from '../components/SettingsSidebar';

const MOCK_USERS = [
    { id: 1, name: 'Alice Freeman', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', status: 'online', lastMessage: 'Hey, are we still on for meeting?' },
    { id: 2, name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150', status: 'offline', lastMessage: 'Thanks, received the files.' },
    { id: 3, name: 'Charlie Brown', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', status: 'online', lastMessage: 'Great work on the update!' },
    { id: 4, name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150', status: 'away', lastMessage: 'Can you check the PR?' },
];

const MOCK_MESSAGES = [
    { id: 1, senderId: 2, text: 'Hi there! How is the project coming along?', time: '10:30 AM' },
    { id: 2, senderId: 0, text: 'Hey Bob! It is going great. Just finishing up the dark mode.', time: '10:31 AM' },
    { id: 3, senderId: 2, text: 'That sounds awesome. Can I see a demo soon?', time: '10:32 AM' },
    { id: 4, senderId: 0, text: 'Absolutely! I will deploy it in a few minutes.', time: '10:33 AM' },
];

const ChatLayout = () => {
    const [users, setUsers] = useState(MOCK_USERS);
    const [selectedUser, setSelectedUser] = useState(MOCK_USERS[1]); // Default to Bob
    const [showChatOnMobile, setShowChatOnMobile] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Initial "Me" user state
    const [currentUser, setCurrentUser] = useState({
        name: 'Tom Brenan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        status: 'online'
    });

    useEffect(() => {
        if (selectedUser) {
            setShowChatOnMobile(true);
        }
    }, [selectedUser]);

    const handleBackToSidebar = () => {
        setShowChatOnMobile(false);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setShowChatOnMobile(true);
        setShowProfile(false);
        setShowSettings(false);
    }

    const handleAddNewChat = () => {
        const newUser = {
            id: users.length + 1,
            name: `New User ${users.length + 1}`,
            avatar: `https://ui-avatars.com/api/?name=User+${users.length + 1}&background=random`,
            status: 'online',
            lastMessage: 'New mock conversation started'
        };
        setUsers([newUser, ...users]);
        setSelectedUser(newUser);
        setShowChatOnMobile(true);
        setShowProfile(false);
        setShowSettings(false);
    };

    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const navigate = useNavigate();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            senderId: 0, // 0 is 'Me'
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div className="flex h-screen bg-[#1D1D1D] text-[#EAEAEA] overflow-hidden transition-colors duration-300 font-sans">
            {/* Sidebar */}
            <div className={`
          w-full md:w-80 bg-[#1D1D1D] border-r border-[#2A2A2A] flex flex-col relative
          ${showChatOnMobile ? 'hidden md:flex' : 'flex'}
      `}>
                {/* Settings Sidebar Overlay */}
                {showSettings && (
                    <SettingsSidebar
                        onClose={() => setShowSettings(false)}
                        currentUser={currentUser}
                        onUpdateUser={setCurrentUser}
                    />
                )}

                {/* Sidebar Header */}
                <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center z-0">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowSettings(true)}>
                        <img
                            src={currentUser.avatar}
                            alt="Me"
                            className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#41C85A] transition-colors"
                        />
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 select-none">WhatsApp</h2>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Search */}
                <div className="px-4 pb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-3 bg-[#2A2A2A] rounded-2xl text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#41C85A]"
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto relative px-2">
                    {users.map(user => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelect(user)}
                            className={`flex items-center p-4 mb-1 rounded-2xl cursor-pointer transition-all duration-200 
                                ${selectedUser?.id === user.id ? 'bg-[#2A2A2A]' : 'hover:bg-[#2A2A2A]/50'}`}
                        >
                            <div className="relative" onClick={(e) => {
                                e.stopPropagation();
                                handleUserSelect(user);
                                setShowProfile(true);
                            }}>
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#1D1D1D] hover:scale-105 transition-transform" />
                                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#1D1D1D] ${user.status === 'online' ? 'bg-[#41C85A]' :
                                    user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                                    }`}></span>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base truncate text-[#EAEAEA]">{user.name}</h3>
                                    <span className="text-xs text-gray-500 font-medium">10:30 PM</span>
                                </div>
                                <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Chat FAB */}
                <div className="absolute bottom-8 right-6 z-10 md:hidden">
                    <button
                        onClick={handleAddNewChat}
                        className="bg-[#41C85A] hover:bg-[#38b04d] text-white rounded-2xl p-4 shadow-lg shadow-[#41C85A]/20 transition-all hover:scale-105 flex items-center justify-center"
                        aria-label="New Chat"
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                </div>
                {/* Desktop FAB position fix */}
                <div className="hidden md:flex absolute bottom-8 left-64 z-10">
                    <button
                        onClick={handleAddNewChat}
                        className="bg-[#41C85A] hover:bg-[#38b04d] text-white rounded-2xl p-4 shadow-lg shadow-[#41C85A]/20 transition-all hover:scale-105 flex items-center justify-center"
                        aria-label="New Chat"
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`
          flex-1 flex-col bg-[#1D1D1D] relative
          ${showChatOnMobile ? 'flex' : 'hidden md:flex'}
      `}>
                {/* User Profile Overlay (For selected user) */}
                {showProfile && selectedUser && (
                    <UserProfile user={selectedUser} onClose={() => setShowProfile(false)} />
                )}

                {/* Decorative Background Pattern Overlay (Optional, low opacity) */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                {/* Chat Header */}
                <div
                    className="p-4 bg-[#1D1D1D]/95 backdrop-blur-md border-b border-[#2A2A2A] flex justify-between items-center z-10 cursor-pointer hover:bg-[#2A2A2A]/50 transition-colors"
                    onClick={() => setShowProfile(true)}
                >
                    <div className="flex items-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBackToSidebar();
                            }}
                            className="md:hidden mr-4 p-2 -ml-2 rounded-full hover:bg-[#2A2A2A] text-gray-300"
                        >
                            <ArrowLeft size={22} />
                        </button>

                        {selectedUser ? (
                            <div className="flex items-center gap-4">
                                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2A2A2A]" />
                                <div>
                                    <h3 className="font-bold text-[#EAEAEA] text-lg leading-tight">{selectedUser.name}</h3>
                                    <span className="text-xs text-[#41C85A] font-medium flex items-center gap-1">
                                        {selectedUser.status === 'online' ? '● Online' : 'Active recently'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <h3 className="font-semibold text-gray-400">Select a conversation</h3>
                        )}
                    </div>
                    <div className="flex items-center gap-5 text-gray-400">
                        <Phone className="cursor-pointer hover:text-[#41C85A] transition-colors" size={22} />
                        <Video className="cursor-pointer hover:text-[#41C85A] transition-colors" size={22} />
                        <MoreVertical className="cursor-pointer hover:text-white transition-colors" size={22} />
                    </div>
                </div>

                {/* Messages */}
                <div className={`flex-1 overflow-y-auto p-4 space-y-2 z-0 pb-24 ${inputFocused ? 'mb-0' : ''}`}>
                    {messages.map((msg) => {
                        const isMe = msg.senderId === 0;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group mb-4`}>
                                {!isMe && selectedUser && (
                                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
                                )}
                                <div className={`relative max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                                    ${isMe
                                        ? 'bg-[#41C85A] text-white rounded-br-sm'
                                        : 'bg-[#2A2A2A] text-[#EAEAEA] rounded-bl-sm'
                                    }`}>
                                    <p>{msg.text}</p>
                                    <div className={`text-[10px] mt-1 text-right font-medium opacity-70
                                        ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className={`absolute bottom-0 w-full p-4 bg-[#1D1D1D] border-t border-[#2A2A2A] z-20 transition-all duration-300`}>
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
                        <button type="button" className="p-2 text-gray-400 hover:text-[#41C85A] transition-colors rounded-full hover:bg-[#2A2A2A]">
                            <Plus size={22} />
                        </button>

                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setTimeout(() => setInputFocused(false), 150)}
                                placeholder="Type a message..."
                                className="w-full pl-5 pr-12 py-3.5 bg-[#2A2A2A] text-[#EAEAEA] border-none rounded-2xl focus:ring-1 focus:ring-[#41C85A] placeholder-gray-500 font-medium"
                            />
                            <Smile className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#41C85A] transition-colors" size={20} />
                        </div>

                        <button
                            type="submit"
                            className="p-3.5 bg-[#41C85A] hover:bg-[#38b04d] text-white rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#41C85A]/20 flex items-center justify-center"
                        >
                            <Send size={20} fill="white" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatLayout;
