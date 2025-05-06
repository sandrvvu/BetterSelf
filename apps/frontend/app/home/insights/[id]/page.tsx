"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { DeleteInsightDialog } from "@/components/insights";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import { ChatMessageRole } from "@/lib";
import {
  useGetInsightChatQuery,
  useSendInsightPromptMutation,
} from "@/state/features/insights/insightApi";

type Params = Promise<{ id: string }>;

export default function Insight(props: { params: Params }) {
  const { id } = use(props.params);

  const router = useRouter();

  const { data: chat, isLoading } = useGetInsightChatQuery(id);
  const [sendPrompt, { isLoading: isSending }] = useSendInsightPromptMutation();

  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages.length, isSending]);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await sendPrompt({ id, data: { content: message } }).unwrap();
      setMessage("");
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/insights");
  };

  if (!chat && !isLoading) {
    notFound();
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!chat) {
    return null;
  }

  return (
    <div className="h-full">
      <div className="sticky top-0 p-2 bg-white flex items-center justify-between mb-6">
        <h1 className="text-2xl text-purple-600 font-bold">
          {format(new Date(chat.createdAt), "PPP")}
        </h1>
        <Button
          onClick={() => setIsDeleteOpen(true)}
          className="border-2 text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
        >
          <Trash2 />
        </Button>

        <DeleteInsightDialog
          id={id}
          onDelete={onDelete}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.role === ChatMessageRole.USER
                  ? "bg-pink-200 self-end ml-auto"
                  : "bg-gray-100"
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-xs text-gray-500 block text-right mt-1">
                {msg.role === ChatMessageRole.USER ? "You" : "AI"}
              </span>
            </div>
          ))}
          {isSending && (
            <div className="p-3 bg-gray-100 rounded-lg max-w-[75%]">
              <p>Generating response...</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4 flex items-center gap-2 bg-white sticky bottom-0">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg p-2"
            placeholder="Enter message..."
          />
          <button
            onClick={() => {
              void handleSend();
            }}
            disabled={isSending}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Go deeper
          </button>
        </div>
      </div>
    </div>
  );
}
