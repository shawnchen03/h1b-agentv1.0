'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GraduationCap, Send, ChevronLeft, Bell, Paperclip, Mic, ThumbsUp, ThumbsDown, Bot, Copy, MessageSquare, Plus, X, Menu } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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

    const newMessageId = chats[currentChatId - 1].messages.length + 1;
    const messageText = text.trim();
    
    // Create a unique identifier for this message
    const messageKey = `${Date.now()}-${Math.random()}`;
    
    // First state update for user message
    setChats(prevChats => {
      const currentChat = prevChats[currentChatId - 1];
      
      // Check if this message was already added
      if (currentChat.messages.some(m => m.text === messageText && m.sender === 'user')) {
        return prevChats;
      }
      
      const updatedChats = [...prevChats];
      const newUserMessage: Message = {
        id: newMessageId,
        text: messageText,
        sender: 'user'
      };
      updatedChats[currentChatId - 1].messages = [...currentChat.messages, newUserMessage];
      return updatedChats;
    });

    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Second state update for AI response
      setChats(prevChats => {
        const currentChat = prevChats[currentChatId - 1];
        
        // Check if this AI response was already added
        if (currentChat.messages.some(m => m.text === data.text && m.sender === 'ai')) {
          return prevChats;
        }
        
        const updatedChats = [...prevChats];
        const aiMessage: Message = {
          id: newMessageId + 1,
          text: data.text || 'Sorry, I encountered an error processing your request.',
          sender: 'ai'
        };
        updatedChats[currentChatId - 1].messages = [...currentChat.messages, aiMessage];
        return updatedChats;
      });
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setChats(prevChats => {
        const currentChat = prevChats[currentChatId - 1];
        const errorMessage: Message = {
          id: newMessageId + 1,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai'
        };
        updatedChats[currentChatId - 1].messages = [...currentChat.messages, errorMessage];
        return updatedChats;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Math.max(...chats.map(chat => chat.id)) + 1,
      title: `Chat ${chats.length + 1}`,
      messages: [{ 
        id: 1, 
        text: "Hello! I'm your H1B Career Advisor. How can I assist you today?", 
        sender: 'ai' 
      }]
    };
    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
    setIsLeftSidebarOpen(false);
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

  const handleDeleteChat = (chatId: number) => {
    if (chatId === 1) return; // Prevent deleting the first chat
    
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    
    // If the deleted chat was the current chat, switch to the first chat
    if (chatId === currentChatId) {
      setCurrentChatId(1);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 mt-16 mb-16">
        <div className="max-w-7xl mx-auto flex gap-6 justify-center">
          {/* Left Sidebar */}
          <div className={`w-64 lg:block lg:relative fixed h-[700px] bg-white/80 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Card className="h-full shadow-md">
              <CardContent className="p-4 h-full">
                <div className="flex flex-col h-full">
                  <Button 
                    onClick={handleNewChat} 
                    className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                  <ScrollArea className="flex-1 -mx-4">
                    <div className="px-4 space-y-2">
                      {chats.map(chat => (
                        <Button
                          key={chat.id}
                          variant={chat.id === currentChatId ? "secondary" : "ghost"}
                          className="w-full justify-start text-left relative group"
                          onClick={() => {
                            setCurrentChatId(chat.id);
                            setIsLeftSidebarOpen(false);
                          }}
                        >
                          <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate flex-1">{chat.title}</span>
                          {chat.id !== 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg border-purple-100 mx-auto max-w-3xl h-[700px]">
            <CardHeader className="flex-none py-3">
              <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Chat with Your H1B Career Advisor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden p-4">
              <ScrollArea className="flex-1 pr-4 -mr-4">
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
              <div className="flex-none pt-4">
                <div className="flex flex-wrap gap-2 mb-2">
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

          {/* Right Sidebar */}
          <div className={`w-64 lg:block lg:relative fixed right-0 h-[700px] bg-white/80 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            <Card className="h-full shadow-md">
              <CardContent className="p-4 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Stored Content</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStoredContent([])}
                      className="h-8 w-8 p-0"
                      disabled={storedContent.length === 0}
                    >
                      <Tooltip>
                        <TooltipTrigger>
                          <X className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>Clear all</TooltipContent>
                      </Tooltip>
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 -mx-4">
                    <div className="px-4 space-y-2">
                      {storedContent.length === 0 ? (
                        <div className="text-center text-gray-500 mt-4">
                          <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Click the + button on any message to save it here</p>
                        </div>
                      ) : (
                        storedContent.map(content => (
                          <div 
                            key={content.id} 
                            className="relative group bg-white/50 hover:bg-gray-100/50 p-3 rounded-lg transition-colors"
                          >
                            <p className="text-sm pr-6 line-clamp-3">{content.text}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveStoredContent(content.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
