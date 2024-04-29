import { auth } from "@clerk/nextjs";
import UserDataForm from "./_components/user-data";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CheckOut = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const courseInfo = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
      season: true,
      chapters: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!courseInfo) {
    return redirect("/");
  }

  return (
    <div className="p-4">
      <UserDataForm
        id={courseInfo.id}
        title={courseInfo.title}
        imageUrl={courseInfo.imageUrl!}
        price={courseInfo.price!}
        category={courseInfo.category?.name!}
        season={courseInfo.season?.name!}
        chapterLength={courseInfo.chapters?.length}
      />
    </div>
  );
};
export default CheckOut;
