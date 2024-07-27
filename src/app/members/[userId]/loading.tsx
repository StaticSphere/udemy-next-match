import { Spinner } from "@nextui-org/react";

export default function MembersLoading() {
  return (
    <div className="flex justify-center items-center vertical-center">
      <Spinner label="loading..." color="secondary" labelColor="secondary" />
    </div>
  );
}
