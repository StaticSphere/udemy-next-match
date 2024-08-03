import { getAuthUserId } from "@/app/actions/auth-actions";
import { getMemberByUserId } from "@/app/actions/member-actions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditMemberPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <CardInnerWrapper
      header="Edit Profile"
      body={<EditForm member={member} />}
    />
  );
}
