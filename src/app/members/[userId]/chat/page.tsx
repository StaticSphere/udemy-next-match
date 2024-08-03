import { getMessageThread } from "@/app/actions/message-actions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import MessageBox from "./MessageBox";

export default async function ChatPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const messages = await getMessageThread(userId);
  const body = (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );

  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
}
