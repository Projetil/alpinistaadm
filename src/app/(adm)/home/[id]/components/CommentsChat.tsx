// components/Chat.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RisksCommentService from "@/services/RisksCommentService";
import { IPagedRisksComment } from "@/types/IRisksComment";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";

interface Message {
  id: number;
  sender: string;
  timestamp: string;
  content: string;
  isUser: boolean;
}

const CommentsChat = ({
  comments,
  riskId,
}: {
  comments?: IPagedRisksComment;
  riskId?: number;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    try {
      await RisksCommentService.Post({
        riskId: riskId || 0,
        text: input,
        userId: Number(session?.user?.id),
      });
      const newMessage: Message = {
        id: Date.now(),
        sender: session?.user.email || "",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: input,
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInput("");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar mensagem");
    }
  };

  useMemo(() => {
    if (comments?.items) {
      const newMessages = comments.items.map((comment) => ({
        id: comment.id,
        sender: comment.customerName,
        timestamp: formatDateToDDMMYYYY(comment.createdAt),
        content: comment.text,
        isUser: false,
      }));
      setMessages(newMessages);
    }
  }, [comments]);

  return (
    <div className="flex flex-col w-full rounded-md p-4 space-y-4 ">
      <div className="flex flex-col space-y-3 h-[250px] overflow-y-auto">
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
              <p className="text-sm break-all">{message.content}</p>
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
