import React from 'react';
import { ArrowLeft, MessageSquare, Phone, Video, Mail, MapPin } from 'lucide-react';

const UserProfile = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="absolute inset-0 bg-[#1D1D1D] z-50 flex flex-col font-sans text-[#EAEAEA] overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-[#2A2A2A] text-gray-400"
                >
                    <ArrowLeft size={24} />
                </button>
                <button className="p-2 rounded-full bg-[#3b82f6] text-white hover:opacity-90 transition-opacity">
                    {/* Edit Icon wrapper or similiar from reference */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
            </div>

            {/* Main Profile Info */}
            <div className="flex flex-col items-center mt-4">
                <div className="relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-[#2A2A2A]"
                    />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-wide">{user.name}</h2>
                <p className="text-gray-500 text-sm mt-1 mb-8">{user.status === 'online' ? 'Active now' : 'Last seen recently'}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mb-10">
                <button className="p-4 bg-[#41C85A] rounded-2xl text-white shadow-lg shadow-[#41C85A]/20 hover:scale-105 transition-transform" aria-label="Message">
                    <MessageSquare fill="white" size={24} />
                </button>
                <button className="p-4 bg-[#3b82f6] rounded-2xl text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform" aria-label="Call">
                    <Phone fill="white" size={24} />
                </button>
                <button className="p-4 bg-[#ef4444] rounded-2xl text-white shadow-lg shadow-red-500/20 hover:scale-105 transition-transform" aria-label="Video">
                    <Video fill="white" size={24} />
                </button>
                <button className="p-4 bg-[#2A2A2A] rounded-2xl text-gray-400 hover:text-white hover:scale-105 transition-transform" aria-label="Mail">
                    <Mail size={24} />
                </button>
            </div>

            {/* Details Cards */}
            <div className="px-6 space-y-4 w-full max-w-md mx-auto pb-10">

                {/* Phone Card */}
                <div className="bg-[#2A2A2A] rounded-3xl p-5 mb-4">
                    <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-4">
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Cellular</p>
                            <p className="text-lg font-medium tracking-wide">0 (68) 345 89 89</p>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <MessageSquare size={20} />
                            <Phone size={20} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Home</p>
                            <p className="text-lg font-medium tracking-wide">0 (63) 900 56 88</p>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <MessageSquare size={20} />
                            <Phone size={20} />
                        </div>
                    </div>
                </div>

                {/* Location Card */}
                <div className="bg-[#2A2A2A] rounded-3xl p-5 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Location</p>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin size={16} className="text-gray-400" />
                            <p className="text-lg font-medium">Khreschatik str, 39</p>
                        </div>
                        <p className="text-gray-500 text-xs">Distance: <span className="text-white font-medium">25,8 km</span></p>
                    </div>
                    <div className="w-16 h-16 bg-[#333] rounded-xl overflow-hidden relative">
                        {/* Mock Map */}
                        <div className="absolute inset-0 bg-gray-700 opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                </div>

                {/* Media/Shared (Optional based on image space) */}
                <div className="bg-[#2A2A2A] rounded-3xl p-5 mt-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Shared Media</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <div className="w-20 h-20 bg-[#333] rounded-xl flex-shrink-0"></div>
                        <div className="w-20 h-20 bg-[#333] rounded-xl flex-shrink-0"></div>
                        <div className="w-20 h-20 bg-[#333] rounded-xl flex-shrink-0"></div>
                        <div className="w-20 h-20 bg-[#333] rounded-xl flex-shrink-0"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
