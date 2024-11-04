'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GraduationCap, Send, ChevronLeft, Bell, Paperclip, Mic, ThumbsUp, ThumbsDown, Bot, Copy, MessageSquare, Plus, X, Menu } from "lucide-react";
import Link from "next/link";


type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  references?: number[];
};

type QuickReply = {
  id: number;
  text: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

type StoredContent = {
  id: number;
  text: string;
};

export default function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "New Chat", messages: [{ id: 1, text: "Hello! I'm your H1B Career Advisor. How can I assist you today?", sender: 'ai' }] }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [storedContent, setStoredContent] = useState<StoredContent[]>([]);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    { id: 1, text: "H1B visa requirements" },
    { id: 2, text: "Job search strategies" },
    { id: 3, text: "Resume tips" },
    { id: 4, text: "Interview preparation" },
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async (text: string = inputMessage) => {
    if (text.trim() === '') return;

    const newUserMessage: Message = {
      id: chats[currentChatId - 1].messages.length + 1,
      text: text,
      sender: 'user'
    };

    setChats(prevChats => {
      const updatedChats = [...prevChats];
      updatedChats[currentChatId - 1].messages = [...updatedChats[currentChatId - 1].messages, newUserMessage];
      return updatedChats;
    });
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post('/api/chat', { message: text });
      const aiResponse: Message = {
        id: chats[currentChatId - 1].messages.length + 2,
        text: response.data.text,
        sender: 'ai',
        references: [1, 2] // Example of referencing previous messages
      };
      setChats(prevChats => {
        const updatedChats = [...prevChats];
        updatedChats[currentChatId - 1].messages = [...updatedChats[currentChatId - 1].messages, aiResponse];
        return updatedChats;
      });
    } catch (error) {
      console.error('Error fetching response from API:', error);
      const errorMessage: Message = {
        id: chats[currentChatId - 1].messages.length + 2,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai'
      };
      setChats(prevChats => {
        const updatedChats = [...prevChats];
        updatedChats[currentChatId - 1].messages = [...updatedChats[currentChatId - 1].messages, errorMessage];
        return updatedChats;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: chats.length + 1,
      title: `New Chat ${chats.length + 1}`,
      messages: [{ id: 1, text: "Hello! How can I assist you today?", sender: 'ai' }]
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleFeedback = (messageId: number, feedback: 'up' | 'down') => {
    // Implement feedback logic here
    console.log(`Feedback ${feedback} for message ${messageId}`);
  };

  const handleStoreContent = (text: string) => {
    const newStoredContent: StoredContent = {
      id: storedContent.length + 1,
      text: text
    };
    setStoredContent([...storedContent, newStoredContent]);
  };

  const handleRemoveStoredContent = (id: number) => {
    setStoredContent(storedContent.filter(content => content.id !== id));
  };

  console.log('Rendering ChatInterface');
  console.log('Current chat ID:', currentChatId);
  console.log('Chats:', chats);
  console.log('Stored content:', storedContent);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-7xl h-full flex">
        {/* Left Sidebar */}
        <div className={`w-64 mr-4 lg:block fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4">
            <Button onClick={handleNewChat} className="w-full mb-4">New Chat</Button>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {chats.map(chat => (
                <Button
                  key={chat.id}
                  variant={chat.id === currentChatId ? "secondary" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => {
                    console.log('Switching to chat:', chat.id);
                    setCurrentChatId(chat.id);
                    setIsLeftSidebarOpen(false);
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {chat.title}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Main Chat Area */}
        <Card className="flex-1 flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg border-purple-100 mx-auto max-w-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Chat with Your H1B Career Advisor</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {chats[currentChatId - 1].messages.map((message, index) => (
                  <div key={message.id} className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'ai' && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/bot-avatar.png" alt="AI" />
                        <AvatarFallback><Bot className="text-purple-600" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-800'
                      }`}>
                        {message.text}
                        {message.references && (
                          <div className="mt-2 text-xs">
                            {message.references.map(ref => (
                              <Badge key={ref} variant="secondary" className="mr-1">
                                {ref}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.sender === 'ai' && (
                        <div className="flex mt-1 space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleCopyMessage(message.text)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Click to copy</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleFeedback(message.id, 'up')}>
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>This was helpful</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleFeedback(message.id, 'down')}>
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>This was not helpful</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleStoreContent(message.text)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Organize notes</TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-2 justify-start">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/bot-avatar.png" alt="AI" />
                      <AvatarFallback><Bot className="text-purple-600" /></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        AI is typing...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Badge 
                    key={reply.id} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-purple-100"
                    onClick={() => handleSendMessage(reply.text)}
                  >
                    {reply.text}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
                <Input 
                  placeholder="Type your message here..." 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Voice input</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => handleSendMessage()} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar for Stored Content */}
        <div className={`w-64 ml-4 lg:block fixed lg:static top-16 right-0 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Stored Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {storedContent.map(content => (
                  <div key={content.id} className="mb-4 p-3 bg-gray-100 rounded-lg relative">
                    <p className="text-sm">{content.text}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={() => handleRemoveStoredContent(content.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
