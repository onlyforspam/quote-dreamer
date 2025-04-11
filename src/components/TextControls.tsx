
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

interface TextControlsProps {
  quoteText: string;
  setQuoteText: (text: string) => void;
  authorName: string;
  setAuthorName: (name: string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({
  quoteText,
  setQuoteText,
  authorName,
  setAuthorName
}) => {
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="quote">Quote Text</Label>
        <Textarea
          id="quote"
          placeholder="Enter your favorite book quote here..."
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="Author name..."
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextControls;
