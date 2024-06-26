"use client";
import * as UpChunk from "@mux/upchunk";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

import { Loader2, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MuxUploader from "@mux/mux-uploader-react";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const toggleEdit = async () => {
    setIsEditing((current) => !current);
    const data = await axios.get(
      `/api/courses/${courseId}/chapters/${chapterId}`
    );
    setDataUrl(data.data.url);
  };
  const router = useRouter();
  const onSuccess = () => {
    router.refresh();

    toast.success("Video uploaded successfully");
    router.refresh();
  };
  // const onUpload = async () => {
  //   try {
  //     setLoading(true);
  //     const fileInput = document.getElementById(
  //       "file-input"
  //     ) as HTMLInputElement;

  //     if (!fileInput.files || !fileInput.files[0]) {
  //       throw new Error("لم يتم اختيار ملف الفيديو");
  //     }
  //     const data = await axios.get(
  //       `/api/courses/${courseId}/chapters/${chapterId}`
  //     );

  //     const getUploadUrl = data.data.url;
  //     const upload = UpChunk.createUpload({
  //       endpoint: getUploadUrl,
  //       file: fileInput.files[0],
  //       chunkSize: 5120, // Uploads the file in ~5mb chunks
  //     });
  //     toggleEdit();
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(true);
  //       router.refresh();
  //     }, 5000);
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* {loading && (
            <div className="bg-slate-200/55 absolute left-0 top-0 text-sm text-muted-foreground  w-full h-full flex items-center justify-center ">
              <div className="flex flex-row items-center justify-center text-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </div>
            </div>
          )} */}
          {/* <div className="p-6">
            <Input
              className="mb-10"
              type="file"
              accept="video/*"
              id="file-input"
            />
            <Button onClick={() => onUpload()}>Submit</Button>
          </div> */}
          <div>
            <MuxUploader endpoint={dataUrl} onSuccess={() => onSuccess()} />
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s Video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-sm text-muted-foreground mt-2">
          Video can take a few minutes to process .Refresh the page if the video
          not appear.
        </div>
      )}
    </div>
  );
};
