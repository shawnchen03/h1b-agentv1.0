import React from 'react';
import { Button } from "@/components/ui/button";
import { QuickReply } from '@/types';

type QuickRepliesProps = {
  quickReplies: QuickReply[];
  onQuickReplyClick: (text: string) => void;
};

export default function QuickReplies({ quickReplies, onQuickReplyClick }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {quickReplies.map((reply) => (
        <Button
          key={reply.id}
          variant="outline"
          size="sm"
          onClick={() => onQuickReplyClick(reply.text)}
        >
          {reply.text}
        </Button>
      ))}
    </div>
  );
}