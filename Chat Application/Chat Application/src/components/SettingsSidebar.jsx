import React, { useState } from 'react';
import { ArrowLeft, Key, MessageSquare, Bell, Database, HelpCircle, Users, LogOut, Edit2, Check, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsSidebar = ({ onClose, currentUser, onUpdateUser }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(currentUser?.name || '');
    const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || '');

    const handleLogout = () => {
        navigate('/');
    };

    const handleSave = () => {
        onUpdateUser({ ...currentUser, name: editName, avatar: editAvatar });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditName(currentUser?.name || '');
        setEditAvatar(currentUser?.avatar || '');
        setIsEditing(false);
    }

    return (
        <div className="absolute inset-y-0 left-0 w-80 bg-[#1D1D1D] z-50 flex flex-col font-sans text-[#EAEAEA] shadow-2xl animate-slide-in-left border-r border-[#2A2A2A]">
            {/* Header */}
            <div className="p-6 flex items-center gap-4">
                <button
                    onClick={onClose}
                    className="p-1 hover:text-[#41C85A] transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Setting</h2>
            </div>

            {/* User Profile Info */}
            <div className="px-6 flex flex-col items-center gap-4 mb-8">
                <div className="relative group">
                    <img
                        src={isEditing ? editAvatar : currentUser?.avatar}
                        alt="My Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#2A2A2A]"
                        onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=User&background=random'}
                    />
                    {isEditing && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Camera size={24} className="text-white opacity-80" />
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="w-full space-y-3">
                        <div>
                            <label className="text-xs text-gray-500 ml-1">Name</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full bg-[#2A2A2A] text-white p-2 rounded-xl border border-transparent focus:border-[#41C85A] focus:outline-none text-center"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 ml-1">Avatar URL</label>
                            <input
                                type="text"
                                value={editAvatar}
                                onChange={(e) => setEditAvatar(e.target.value)}
                                className="w-full bg-[#2A2A2A] text-white p-2 rounded-xl border border-transparent focus:border-[#41C85A] focus:outline-none text-xs"
                                placeholder="Image URL"
                            />
                        </div>
                        <div className="flex gap-2 justify-center mt-2">
                            <button onClick={handleSave} className="p-2 bg-[#41C85A] rounded-full hover:bg-[#38b04d] transition-colors"><Check size={18} /></button>
                            <button onClick={handleCancel} className="p-2 bg-[#2A2A2A] rounded-full hover:bg-gray-700 transition-colors"><X size={18} /></button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center relative w-full">
                        <h3 className="font-bold text-xl">{currentUser?.name}</h3>
                        <p className="text-sm text-gray-500">Online</p>
                        <button
                            onClick={() => {
                                setIsEditing(true);
                                setEditName(currentUser.name);
                                setEditAvatar(currentUser.avatar);
                            }}
                            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-[#41C85A] transition-colors"
                        >
                            <Edit2 size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Menu Options */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                <MenuItem icon={<Key size={20} />} label="Account" />
                <MenuItem icon={<MessageSquare size={20} />} label="Chats" />
                <MenuItem icon={<Bell size={20} />} label="Notifications" />
                <MenuItem icon={<Database size={20} />} label="Data and Storage" />
                <MenuItem icon={<HelpCircle size={20} />} label="Help" />

                <div className="my-4 border-t border-[#2A2A2A]/50 w-full"></div>

                <MenuItem icon={<Users size={20} />} label="Invite a friend" />
            </div>

            {/* Footer / Logout */}
            <div className="p-6 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full p-2 rounded-xl hover:bg-[#2A2A2A]"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Log out</span>
                </button>
            </div>
        </div>
    );
};

const MenuItem = ({ icon, label }) => (
    <button className="w-full flex items-center gap-4 p-4 text-gray-300 hover:text-white hover:bg-[#2A2A2A] rounded-2xl transition-all duration-200 group">
        <span className="group-hover:text-[#41C85A] transition-colors">{icon}</span>
        <span className="font-medium tracking-wide">{label}</span>
    </button>
);

export default SettingsSidebar;
