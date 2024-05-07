"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

import { Loader2, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { Input } from "@/components/ui/input";

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
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onUpload = async () => {
    try {
      setLoading(true);
      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement;

      if (!fileInput.files || !fileInput.files[0]) {
        throw new Error("لم يتم اختيار ملف الفيديو");
      }

      const fileSizeInBytes = fileInput.files[0].size;
      const { data } = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        fileSizeInBytes
      );

      await axios.patch(data.upload.upload_link, fileInput.files[0], {
        headers: {
          "Tus-Resumable": "1.0.0",
          "Upload-Offset": "0",
          "Content-Type": "application/offset+octet-stream",
        },
      });

      const videoStatus = await axios
        .head(data.upload.upload_link, {
          headers: {
            "Tus-Resumable": "1.0.0",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        })
        .then((response) => {
          return {
            fileLength: response.headers["upload-length"],
            uploadOffset: response.headers["upload-offset"],
          };
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      if (videoStatus && videoStatus.fileLength === videoStatus.uploadOffset) {
        toast.success("تم رفع الفيديو بنجاح");
        toggleEdit();
        router.refresh();
      }
      if (videoStatus && videoStatus.fileLength > videoStatus.uploadOffset) {
        throw new Error("الفيديو لم يكتمل رفعه بعد");
      }
      if (videoStatus && videoStatus.fileLength < videoStatus.uploadOffset) {
        throw new Error("حدث خطاء اثناء رفع الفيديو الرجاء المحاولة مرة اخرى");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
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
          {loading && (
            <div className="bg-slate-200/55 absolute left-0 top-0 text-sm text-muted-foreground  w-full h-full flex items-center justify-center ">
              <div className="flex flex-row items-center justify-center text-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </div>
            </div>
          )}
          <div className="p-6">
            <Input
              className="mb-10"
              type="file"
              accept="video/*"
              id="file-input"
            />
            <Button onClick={() => onUpload()}>Submit</Button>
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
