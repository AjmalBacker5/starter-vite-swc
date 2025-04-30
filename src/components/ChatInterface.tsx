import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  PaperclipIcon,
  SendIcon,
  ImageIcon,
  SmileIcon,
  CheckIcon,
  CheckCheckIcon,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "match";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  media?: string;
}

interface Conversation {
  id: string;
  matchName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  messages: Message[];
}

const ChatInterface = ({
  activeConversationId = "1",
}: {
  activeConversationId?: string;
}) => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      matchName: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      lastMessage: "Looking forward to our conversation!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      messages: [
        {
          id: "1-1",
          content:
            "Hi there! I liked your profile and thought we might have a lot in common.",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          status: "read",
        },
        {
          id: "1-2",
          content:
            "Hello! Thanks for reaching out. I was impressed by your thoughts on secular humanism.",
          sender: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: "read",
        },
        {
          id: "1-3",
          content:
            "That means a lot! I believe in building a relationship based on shared values and mutual respect.",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          status: "read",
        },
        {
          id: "1-4",
          content: "Looking forward to our conversation!",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          status: "delivered",
        },
      ],
    },
    {
      id: "2",
      matchName: "Rahul Kapoor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      lastMessage: "Would you like to meet for coffee sometime?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
      unread: 0,
      messages: [
        {
          id: "2-1",
          content:
            "Hi, I noticed we both enjoy philosophy and science. What are you reading these days?",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
          status: "read",
        },
        {
          id: "2-2",
          content:
            "I'm currently reading 'Sapiens' by Yuval Noah Harari. Have you read it?",
          sender: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
          status: "read",
        },
        {
          id: "2-3",
          content:
            "Yes! It's one of my favorites. Would you like to meet for coffee sometime?",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          status: "read",
        },
      ],
    },
    {
      id: "3",
      matchName: "Ananya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
      lastMessage: "I agree, critical thinking is so important!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 0,
      messages: [
        {
          id: "3-1",
          content:
            "Hello! I see we both value critical thinking and rationality.",
          sender: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
          status: "read",
        },
        {
          id: "3-2",
          content: "I agree, critical thinking is so important!",
          sender: "match",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: "read",
        },
      ],
    },
  ]);

  const activeConversation =
    conversations.find((conv) => conv.id === activeConversationId) ||
    conversations[0];

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: `${activeConversation.id}-${activeConversation.messages.length + 1}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          lastMessageTime: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderMessageStatus = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <CheckIcon className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckIcon className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheckIcon className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-background">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)] md:h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 hover:bg-accent/50 cursor-pointer ${conversation.id === activeConversation.id ? "bg-accent" : ""}`}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.matchName}
                  />
                  <AvatarFallback>
                    {conversation.matchName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium truncate">
                      {conversation.matchName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(conversation.lastMessageTime)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <div className="flex-shrink-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground">
                      {conversation.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window - Hidden on mobile unless a conversation is selected */}
      <div className="hidden md:flex md:flex-col md:w-2/3">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={activeConversation.avatar}
              alt={activeConversation.matchName}
            />
            <AvatarFallback>
              {activeConversation.matchName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{activeConversation.matchName}</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {activeConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[70%]">
                  <Card
                    className={`${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <CardContent className="p-3">
                      {msg.media && (
                        <div className="mb-2">
                          <img
                            src={msg.media}
                            alt="Shared media"
                            className="rounded-md"
                          />
                        </div>
                      )}
                      <p>{msg.content}</p>
                    </CardContent>
                  </Card>
                  <div
                    className={`flex items-center text-xs text-muted-foreground mt-1 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <span>{formatTime(msg.timestamp)}</span>
                    {msg.sender === "user" && (
                      <span className="ml-1">
                        {renderMessageStatus(msg.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="outline" size="icon" className="rounded-full">
              <SmileIcon className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full"
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile view instructions */}
      <div className="flex md:hidden items-center justify-center h-[calc(100vh-16rem)] p-4 text-center">
        <div>
          <p className="text-muted-foreground">
            Select a conversation to view messages
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
