
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    MessageCircle,
    CheckCheck,
    Building2,
    ClipboardList,
    IndianRupee,
    CalendarDays,
    ArrowLeft,
} from "lucide-react";

import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/organizer/dashboard", icon: Building2 },
    { label: "Leads", path: "/organizer/leads", icon: ClipboardList },
    { label: "Quotations", path: "/organizer/quotations", icon: IndianRupee },
    { label: "Bookings", path: "/organizer/bookings", icon: CalendarDays },
    { label: "Messages", path: "/organizer/messages", icon: MessageCircle },
];

const initialConversations = [
    {
        id: 1,
        name: "Rahul Sharma",
        event: "Corporate Annual Meeting",
        avatar: "RS",
        color: "bg-blue-100 text-blue-700",
        online: true,
        messages: [
            {
                id: 1,
                text: "Hello! I received your quotation for our annual meeting.",
                time: "10:20 AM",
                sender: "client",
            },
            {
                id: 2,
                text: "Hello Rahul! Thank you for considering our services.",
                time: "10:22 AM",
                sender: "organizer",
            },
            {
                id: 3,
                text: "Can you also include stage decoration in the package?",
                time: "10:25 AM",
                sender: "client",
            },
            {
                id: 4,
                text: "Absolutely. I can include stage decoration. I'll share the updated details shortly.",
                time: "10:28 AM",
                sender: "organizer",
            },
        ],
    },
    {
        id: 2,
        name: "Priya Patel",
        event: "Wedding Celebration",
        avatar: "PP",
        color: "bg-pink-100 text-pink-700",
        online: false,
        messages: [
            {
                id: 1,
                text: "Hi, I wanted to discuss the wedding decoration theme.",
                time: "Yesterday",
                sender: "client",
            },
            {
                id: 2,
                text: "Sure! Do you have any reference images or a preferred theme?",
                time: "Yesterday",
                sender: "organizer",
            },
            {
                id: 3,
                text: "We are thinking about a royal traditional theme.",
                time: "Yesterday",
                sender: "client",
            },
        ],
    },
    {
        id: 3,
        name: "Amit Joshi",
        event: "College Technology Fest",
        avatar: "AJ",
        color: "bg-purple-100 text-purple-700",
        online: true,
        messages: [
            {
                id: 1,
                text: "We need to confirm the technical equipment for the fest.",
                time: "9:15 AM",
                sender: "client",
            },
            {
                id: 2,
                text: "I have prepared the equipment list. I'll send it for your approval.",
                time: "9:18 AM",
                sender: "organizer",
            },
        ],
    },
    {
        id: 4,
        name: "Neha Shah",
        event: "Birthday Celebration",
        avatar: "NS",
        color: "bg-amber-100 text-amber-700",
        online: false,
        messages: [
            {
                id: 1,
                text: "Thank you for organizing everything so beautifully!",
                time: "Monday",
                sender: "client",
            },
            {
                id: 2,
                text: "It was our pleasure. Thank you for trusting us!",
                time: "Monday",
                sender: "organizer",
            },
        ],
    },
];

export default function OrganizerMessages() {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedId, setSelectedId] = useState(1);
    const [search, setSearch] = useState("");
    const [messageText, setMessageText] = useState("");
    const [mobileChatOpen, setMobileChatOpen] = useState(false);

    // Reference to the bottom of the messages area.
    const messagesEndRef = useRef(null);

    const selectedConversation = conversations.find(
        (conversation) => conversation.id === selectedId
    );

    const filteredConversations = useMemo(() => {
        const searchText = search.toLowerCase();

        return conversations.filter(
            (conversation) =>
                conversation.name.toLowerCase().includes(searchText) ||
                conversation.event.toLowerCase().includes(searchText)
        );
    }, [conversations, search]);

    // Automatically scroll to the latest message.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [selectedId, selectedConversation?.messages.length]);

    // Send a message.
    const sendMessage = (e) => {
        e.preventDefault();

        const trimmedMessage = messageText.trim();

        if (!trimmedMessage || !selectedConversation) return;

        const newMessage = {
            id: Date.now(),
            text: trimmedMessage,
            time: new Date().toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            sender: "organizer",
        };

        setConversations((current) =>
            current.map((conversation) =>
                conversation.id === selectedId
                    ? {
                        ...conversation,
                        messages: [...conversation.messages, newMessage],
                    }
                    : conversation
            )
        );

        setMessageText("");
    };

    // Open a conversation.
    const openConversation = (id) => {
        setSelectedId(id);
        setMobileChatOpen(true);
    };

    return (
        <DashboardLayout
            title="Messages"
            role="Organizer"
            navItems={navItems}
        >
            <div className="space-y-6">

                {/* Page Heading */}
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        Organizer Workspace
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Messages
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Communicate with your clients and discuss their events.
                    </p>
                </div>

                {/* Main Chat Application */}
                <div className="grid h-[calc(100dvh-280px)] min-h-[480px] max-h-[760px] min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[340px_minmax(0,1fr)]">

                    {/* Conversation Sidebar */}
                    <aside
                        className={`min-h-0 flex-col overflow-hidden border-r border-gray-200 ${mobileChatOpen ? "hidden lg:flex" : "flex"
                            }`}
                    >

                        {/* Sidebar Header */}
                        <div className="shrink-0 border-b border-gray-100 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-gray-900">
                                    Conversations
                                </h2>

                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                                    {conversations.length} chats
                                </span>
                            </div>

                            <div className="relative mt-4">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search conversations..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Independently Scrollable Conversation List */}
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {filteredConversations.length === 0 ? (
                                <div className="px-4 py-10 text-center text-sm text-gray-500">
                                    No conversations found.
                                </div>
                            ) : (
                                filteredConversations.map((conversation) => {
                                    const lastMessage =
                                        conversation.messages[
                                        conversation.messages.length - 1
                                        ];

                                    const isSelected = selectedId === conversation.id;

                                    return (
                                        <button
                                            key={conversation.id}
                                            onClick={() => openConversation(conversation.id)}
                                            className={`flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${isSelected
                                                    ? "bg-indigo-50/70"
                                                    : "bg-white"
                                                }`}
                                        >
                                            <div className="relative shrink-0">
                                                <div
                                                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${conversation.color}`}
                                                >
                                                    {conversation.avatar}
                                                </div>

                                                {conversation.online && (
                                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                        {conversation.name}
                                                    </p>

                                                    <span className="shrink-0 text-[11px] text-gray-400">
                                                        {lastMessage.time}
                                                    </span>
                                                </div>

                                                <p className="mt-1 truncate text-xs text-indigo-600">
                                                    {conversation.event}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {lastMessage.sender === "organizer"
                                                        ? "You: "
                                                        : ""}
                                                    {lastMessage.text}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </aside>

                    {/* Chat Window */}
                    {selectedConversation ? (
                        <section
                            className={`min-h-0 min-w-0 flex-col overflow-hidden ${mobileChatOpen ? "flex" : "hidden lg:flex"
                                }`}
                        >

                            {/* Fixed Chat Header */}
                            <div className="z-20 flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-3 sm:px-6">

                                <div className="flex min-w-0 items-center gap-3">

                                    <button
                                        onClick={() => setMobileChatOpen(false)}
                                        className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                                        aria-label="Back to conversations"
                                    >
                                        <ArrowLeft size={19} />
                                    </button>

                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${selectedConversation.color}`}
                                    >
                                        {selectedConversation.avatar}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-bold text-gray-900">
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
                                        title="Phone call (demo only)"
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600"
                                    >
                                        <Phone size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        title="Video call (demo only)"
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600"
                                    >
                                        <Video size={19} />
                                    </button>

                                    <button
                                        type="button"
                                        title="More options (demo only)"
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                                    >
                                        <MoreVertical size={19} />
                                    </button>
                                </div>
                            </div>

                            {/* Fixed Event Information */}
                            <div className="flex shrink-0 items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-600 sm:px-6">
                                <CalendarDays
                                    size={15}
                                    className="shrink-0 text-indigo-600"
                                />

                                <span>
                                    Discussion about{" "}
                                    <strong className="font-semibold text-gray-800">
                                        {selectedConversation.event}
                                    </strong>
                                </span>
                            </div>

                            {/* Independently Scrollable Messages */}
                            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-gray-50/60 p-4 sm:p-6">

                                <div className="my-1 text-center">
                                    <span className="rounded-full bg-white px-3 py-1 text-[11px] text-gray-400 shadow-sm">
                                        Conversation history
                                    </span>
                                </div>

                                {selectedConversation.messages.map((message) => {
                                    const isOrganizer = message.sender === "organizer";

                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isOrganizer
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${isOrganizer
                                                        ? "rounded-br-md bg-indigo-600 text-white"
                                                        : "rounded-bl-md border border-gray-100 bg-white text-gray-800"
                                                    }`}
                                            >
                                                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                                    {message.text}
                                                </p>

                                                <div
                                                    className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${isOrganizer
                                                            ? "text-indigo-100"
                                                            : "text-gray-400"
                                                        }`}
                                                >
                                                    <span>{message.time}</span>

                                                    {isOrganizer && (
                                                        <CheckCheck size={13} />
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
                                className="z-10 shrink-0 border-t border-gray-100 bg-white p-3 sm:p-4"
                            >
                                <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-indigo-400 focus-within:bg-white">

                                    <button
                                        type="button"
                                        title="Attachments are not enabled in this demo"
                                        className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                                    >
                                        <Paperclip size={19} />
                                    </button>

                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                sendMessage(e);
                                            }
                                        }}
                                        rows={1}
                                        placeholder="Type your message..."
                                        className="max-h-28 min-h-10 min-w-0 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />

                                    <button
                                        type="submit"
                                        disabled={!messageText.trim()}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                                        aria-label="Send message"
                                    >
                                        <Send size={17} />
                                    </button>
                                </div>

                                <p className="mt-2 text-center text-[11px] text-gray-400">
                                    Press Enter to send. Use Shift + Enter for a new line.
                                </p>
                            </form>
                        </section>
                    ) : (
                        <div className="hidden items-center justify-center text-center lg:flex">
                            <div>
                                <MessageCircle
                                    size={42}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="mt-3 font-semibold text-gray-700">
                                    Select a conversation
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Choose a client to start messaging.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-gray-400">
                    Demo messaging only. Messages are stored in temporary React
                    state and will reset when you refresh the page.
                </p>
            </div>
        </DashboardLayout>
    );
}
