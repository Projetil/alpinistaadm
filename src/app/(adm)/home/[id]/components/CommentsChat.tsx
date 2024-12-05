// components/Chat.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface Message {
  id: number;
  sender: string;
  timestamp: string;
  content: string;
  isUser: boolean;
}

const CommentsChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "someone@example.com",
      timestamp: "13:24",
      content:
        "Lorem ipsum dolor sit amet consectetur. Malesuada in pellentesque morbi velit lorem hendrerit malesuada egestas morbi. Enim faucibus vitae tellus ac hendrerit.",
      isUser: false,
    },
    {
      id: 2,
      sender: "you@example.com",
      timestamp: "13:24",
      content:
        "Lorem ipsum dolor sit amet consectetur. Malesuada in pellentesque morbi velit lorem hendrerit malesuada egestas morbi. Enim faucibus vitae tellus ac hendrerit.",
      isUser: true,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      id: Date.now(),
      sender: "you@example.com",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: input,
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col w-full  rounded-md p-4 space-y-4">
      <div className="flex flex-col space-y-3 overflow-y-auto ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.isUser
                ? "justify-end text-end"
                : "justify-start text-start"
            }`}
          >
            <p className="text-xs text-[#8C8B91] my-1">
              {message.sender}{" "}
              <span className="text-[#050506]">{message.timestamp}</span>
            </p>
            <div
              className={`${
                message.isUser
                  ? "bg-[#3088EE] text-white"
                  : "bg-[#EEEEF0] text-[#050506]"
              }  p-3 rounded-lg space-y-1 text-left`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 text-[#050506]  pt-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva aqui..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} variant="ghost" size="sm">
          <IoMdSend color="#D9232B" />
        </Button>
      </div>
    </div>
  );
};

export default CommentsChat;
