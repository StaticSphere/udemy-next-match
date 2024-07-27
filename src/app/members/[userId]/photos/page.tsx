import { getMemberPhotosByUserId } from "@/app/actions/member-actions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

export default async function PhotosPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  width={300}
                  height={300}
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square"
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
