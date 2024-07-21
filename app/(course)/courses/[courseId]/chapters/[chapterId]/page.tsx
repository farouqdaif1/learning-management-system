import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import Preview from "@/components/preview";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";
import { clerkClient } from "@clerk/nextjs/server";

const Chapter = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const users = await clerkClient.users.getUserList({ userId: [userId] });
  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
    muxData,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });
  if (!chapter || !course) {
    return redirect("/");
  }
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already complete this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            email={users[0].emailAddresses[0].emailAddress}
            name={`${users[0].firstName} ${users[0].lastName}`}
          />
        </div>
        <div>
          <div className="p-4  md:flex  md:flex-row  md:items-center  md:justify-between">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
