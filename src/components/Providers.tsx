"use client";

import { getUnreadMessageCount } from "@/app/actions/message-actions";
import useMessageStore from "@/app/hooks/useMessageStore";
import { useNotificationChannel } from "@/app/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/app/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Providers({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) {
  const isUnreadCountSet = useRef(false);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel();
  useNotificationChannel(userId);

  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      {children}
    </NextUIProvider>
  );
}
