
import { useEffect, useRef, useState } from "react";
import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    ArrowLeft,
    MessageCircle,
    CheckCheck,
    LayoutDashboard,
    PlusCircle,
    CalendarDays,
    FileText,
} from "lucide-react";

import DashboardLayout from "../../../layouts/DashboardLayout";

const initialConversations = [
    {
        id: 1,
        name: "Elite Events Studio",
        event: "Corporate Annual Meeting",
        avatar: "E",
        color: "bg-purple-100 text-purple-700",
        lastMessage: "We will share the updated quotation shortly.",
        time: "10:30 AM",
        unread: 2,
        messages: [
            {
                id: 1,
                text: "Hello! Thank you for choosing Elite Events Studio.",
                sender: "organizer",
                time: "10:15 AM",
            },
            {
                id: 2,
                text: "I would like to discuss the arrangements for our corporate event.",
                sender: "client",
                time: "10:20 AM",
            },
            {
                id: 3,
                text: "Of course! We can arrange the complete event including decoration, catering and sound.",
                sender: "organizer",
                time: "10:25 AM",
            },
            {
                id: 4,
                text: "We will share the updated quotation shortly.",
                sender: "organizer",
                time: "10:30 AM",
            },
        ],
    },
    {
        id: 2,
        name: "Dream Events & Weddings",
        event: "Wedding Celebration",
        avatar: "D",
        color: "bg-pink-100 text-pink-700",
        lastMessage: "Please confirm your decoration preferences.",
        time: "Yesterday",
        unread: 1,
        messages: [
            {
                id: 1,
                text: "Congratulations on your upcoming wedding!",
                sender: "organizer",
                time: "Yesterday",
            },
            {
                id: 2,
                text: "Thank you! We prefer a traditional theme.",
                sender: "client",
                time: "Yesterday",
            },
            {
                id: 3,
                text: "Please confirm your decoration preferences.",
                sender: "organizer",
                time: "Yesterday",
            },
        ],
    },
    {
        id: 3,
        name: "Royal Celebration Planners",
        event: "Birthday Celebration",
        avatar: "R",
        color: "bg-amber-100 text-amber-700",
        lastMessage: "The decoration package is ready.",
        time: "Mon",
        unread: 0,
        messages: [
            {
                id: 1,
                text: "We have prepared some birthday decoration ideas.",
                sender: "organizer",
                time: "Monday",
            },
            {
                id: 2,
                text: "Great! Please share the details.",
                sender: "client",
                time: "Monday",
            },
            {
                id: 3,
                text: "The decoration package is ready.",
                sender: "organizer",
                time: "Monday",
            },
        ],
    },
    {
        id: 4,
        name: "Dream Makers Events",
        event: "College Technology Fest",
        avatar: "M",
        color: "bg-blue-100 text-blue-700",
        lastMessage: "Thank you for the confirmation!",
        time: "Oct 28",
        unread: 0,
        messages: [
            {
                id: 1,
                text: "We have received your event requirements.",
                sender: "organizer",
                time: "Oct 28",
            },
            {
                id: 2,
                text: "Everything looks good. Thank you!",
                sender: "client",
                time: "Oct 28",
            },
            {
                id: 3,
                text: "Thank you for the confirmation!",
                sender: "organizer",
                time: "Oct 28",
            },
        ],
    },
];

const navItems = [
    {
        label: "Dashboard",
        path: "/client/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Create Event",
        path: "/client/create-event",
        icon: PlusCircle,
    },
    {
        label: "My Events",
        path: "/client/events",
        icon: CalendarDays,
    },
    {
        label: "Quotations",
        path: "/client/quotations",
        icon: FileText,
    },
    {
        label: "Messages",
        path: "/client/messages",
        icon: MessageCircle,
    },
];

export default function ClientMessages() {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedId, setSelectedId] = useState(1);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [showChat, setShowChat] = useState(false);

    const messagesEndRef = useRef(null);

    const selectedConversation = conversations.find(
        (conversation) => conversation.id === selectedId
    );

    const filteredConversations = conversations.filter(
        (conversation) =>
            conversation.name.toLowerCase().includes(search.toLowerCase()) ||
            conversation.event.toLowerCase().includes(search.toLowerCase())
    );

    // Automatically scroll to the latest message.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [selectedId, selectedConversation?.messages.length]);

    // Open a conversation.
    const openConversation = (id) => {
        setSelectedId(id);
        setShowChat(true);

        setConversations((previous) =>
            previous.map((conversation) =>
                conversation.id === id
                    ? { ...conversation, unread: 0 }
                    : conversation
            )
        );
    };

    // Send a message.
    const sendMessage = (e) => {
        e.preventDefault();

        if (!message.trim() || !selectedConversation) return;

        const newMessage = {
            id: Date.now(),
            text: message.trim(),
            sender: "client",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setConversations((previous) =>
            previous.map((conversation) =>
                conversation.id === selectedId
                    ? {
                        ...conversation,
                        messages: [...conversation.messages, newMessage],
                        lastMessage: newMessage.text,
                        time: "Now",
                    }
                    : conversation
            )
        );

        setMessage("");
    };

    return (
        <DashboardLayout
            title="Messages"
            role="Client"
            navItems={navItems}
        >
            <div className="space-y-6">

                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Messages
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Communicate with your event organizers in one place.
                    </p>
                </div>

                {/* Main Messages Container */}
                <div className="grid h-[calc(100dvh-280px)] min-h-[480px] max-h-[760px] min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-3">

                    {/* Conversation Sidebar */}
                    <div
                        className={`min-h-0 flex-col overflow-hidden border-r border-gray-200 ${showChat ? "hidden lg:flex" : "flex"
                            }`}
                    >

                        {/* Sidebar Header */}
                        <div className="shrink-0 border-b border-gray-200 bg-white p-4">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Conversations
                            </h2>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Independently Scrollable Conversation List */}
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {filteredConversations.length > 0 ? (
                                filteredConversations.map((conversation) => (
                                    <button
                                        key={conversation.id}
                                        onClick={() => openConversation(conversation.id)}
                                        className={`flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${selectedId === conversation.id
                                                ? "bg-indigo-50"
                                                : ""
                                            }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${conversation.color}`}
                                        >
                                            {conversation.avatar}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="truncate text-sm font-semibold text-gray-900">
                                                    {conversation.name}
                                                </h3>

                                                <span className="shrink-0 text-xs text-gray-400">
                                                    {conversation.time}
                                                </span>
                                            </div>

                                            <p className="mt-1 truncate text-xs text-indigo-600">
                                                {conversation.event}
                                            </p>

                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <p className="truncate text-xs text-gray-500">
                                                    {conversation.lastMessage}
                                                </p>

                                                {conversation.unread > 0 && (
                                                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                                                        {conversation.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-6 text-center">
                                    <MessageCircle
                                        className="mx-auto mb-2 text-gray-300"
                                        size={30}
                                    />

                                    <p className="text-sm text-gray-500">
                                        No conversations found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div
                        className={`min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-2 ${showChat ? "flex" : "hidden lg:flex"
                            }`}
                    >
                        {selectedConversation ? (
                            <>

                                {/* Fixed Chat Header */}
                                <div className="z-20 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <button
                                            onClick={() => setShowChat(false)}
                                            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                                            aria-label="Back to conversations"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${selectedConversation.color}`}
                                        >
                                            {selectedConversation.avatar}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-semibold text-gray-900">
                                                {selectedConversation.name}
                                            </h3>

                                            <p className="truncate text-xs text-gray-500">
                                                {selectedConversation.event}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Header Action Buttons */}
                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            type="button"
                                            title="Call"
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600"
                                        >
                                            <Phone size={18} />
                                        </button>

                                        <button
                                            type="button"
                                            title="Video call"
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600"
                                        >
                                            <Video size={19} />
                                        </button>

                                        <button
                                            type="button"
                                            title="More options"
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                                        >
                                            <MoreVertical size={19} />
                                        </button>
                                    </div>
                                </div>

                                {/* Fixed Event Information */}
                                <div className="shrink-0 border-b border-gray-100 bg-indigo-50/60 px-5 py-3">
                                    <p className="text-xs text-gray-500">
                                        Conversation about
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-indigo-700">
                                        {selectedConversation.event}
                                    </p>
                                </div>

                                {/* Independently Scrollable Messages */}
                                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain bg-gray-50/70 p-4 sm:p-6">

                                    <div className="text-center">
                                        <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-400 shadow-sm">
                                            Conversation started
                                        </span>
                                    </div>

                                    {selectedConversation.messages.map((msg) => {
                                        const isClient = msg.sender === "client";

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${isClient
                                                        ? "justify-end"
                                                        : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${isClient
                                                            ? "items-end"
                                                            : "items-start"
                                                        }`}
                                                >
                                                    <div
                                                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${isClient
                                                                ? "rounded-br-md bg-indigo-600 text-white"
                                                                : "rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm"
                                                            }`}
                                                    >
                                                        {msg.text}
                                                    </div>

                                                    <div className="mt-1 flex items-center gap-1 px-1">
                                                        <span className="text-[10px] text-gray-400">
                                                            {msg.time}
                                                        </span>

                                                        {isClient && (
                                                            <CheckCheck
                                                                size={13}
                                                                className="text-indigo-500"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Fixed Message Input */}
                                <form
                                    onSubmit={sendMessage}
                                    className="z-10 shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4"
                                >
                                    <div className="flex items-end gap-2">

                                        <button
                                            type="button"
                                            title="Attach file (coming soon)"
                                            className="shrink-0 rounded-xl p-3 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600"
                                        >
                                            <Paperclip size={20} />
                                        </button>

                                        <textarea
                                            rows={1}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    !e.shiftKey
                                                ) {
                                                    e.preventDefault();
                                                    sendMessage(e);
                                                }
                                            }}
                                            placeholder="Type your message..."
                                            className="max-h-28 min-h-[46px] min-w-0 flex-1 resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                                        />

                                        <button
                                            type="submit"
                                            disabled={!message.trim()}
                                            className="shrink-0 rounded-xl bg-indigo-600 p-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <Send size={19} />
                                        </button>
                                    </div>

                                    <p className="mt-2 pl-1 text-[11px] text-gray-400">
                                        Press Enter to send · Shift + Enter for a new line
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                <MessageCircle
                                    size={48}
                                    className="mb-4 text-gray-300"
                                />

                                <h3 className="text-lg font-semibold text-gray-800">
                                    Select a conversation
                                </h3>

                                <p className="mt-2 max-w-xs text-sm text-gray-500">
                                    Choose an organizer from the conversation list to start
                                    messaging.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
