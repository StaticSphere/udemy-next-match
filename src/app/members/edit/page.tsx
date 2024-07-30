import { getAuthUserId } from "@/app/actions/auth-actions";
import { getMemberByUserId } from "@/app/actions/member-actions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditMemberPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
