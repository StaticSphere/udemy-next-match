import { getMemberByUserId } from "@/app/actions/member-actions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";

export default async function MemberDetailedPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }

  return <CardInnerWrapper header="Profile" body={member.description} />;
}
