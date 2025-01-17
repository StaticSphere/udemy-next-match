import { MessageDto } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { deleteMessage } from "../actions/message-actions";
import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[]) => {
  const { set, remove, messages, updateUnreadCount } = useMessageStore(
    (state) => ({
      set: state.set,
      remove: state.remove,
      messages: state.messages,
      updateUnreadCount: state.updateUnreadCount,
    })
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState({ id: "", loading: false });
  const isOutbox = searchParams.get("container") === "outbox";

  useEffect(() => {
    set(initialMessages);

    return () => {
      set([]);
    };
  }, [initialMessages, set]);

  const columns = [
    {
      key: isOutbox ? "recipientName" : "senderName",
      label: isOutbox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "created", label: isOutbox ? "Date sent" : "Date received" },
    { key: "actions", label: "Actions" },
  ];

  const handleRowSelect = (key: string) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setIsDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutbox);
      remove(message.id);
      if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
      setIsDeleting({ id: "", loading: false });
    },
    [isOutbox, remove, updateUnreadCount]
  );

  return {
    isOutbox,
    columns,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
    isDeleting,
    messages,
  };
};
