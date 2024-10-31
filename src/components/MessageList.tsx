import React from 'react';
import { Message } from '@/types';

type MessageListProps = {
  messages: Message[];
  isTyping: boolean;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
};

export default function MessageList({ messages, isTyping, scrollAreaRef }: MessageListProps) {
  return (
    <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-3/4 p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-100' : 'bg-blue-100'}`}>
            {message.text}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-3/4 p-3 rounded-lg bg-gray-100">
            Typing...
          </div>
        </div>
      )}
    </div>
  );
}