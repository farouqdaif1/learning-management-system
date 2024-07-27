"use client";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  email: string;
  name: string;
}
const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
  email,
  name,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );
        if (!nextChapterId) {
          confetti.onOpen();
        }
        toast.success("Progress Updated");
        router.refresh();
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const addWaterMark = () => {
    const player = document.querySelector("mux-player");
    if (player && player.shadowRoot) {
      const mediaTheme = player.shadowRoot.querySelector("media-theme");

      if (mediaTheme && mediaTheme.shadowRoot) {
        const muxVideo = mediaTheme.querySelector("mux-video");

        if (muxVideo) {
          const watermark = document.createElement("div");
          watermark.innerText = `Email: ${email} Name: ${name}`;
          watermark.style.position = "absolute";
          watermark.style.top = "10%";
          watermark.style.left = "10%";
          watermark.style.color = "white";
          watermark.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
          watermark.style.padding = "15px";
          watermark.style.pointerEvents = "none"; // Ensures it doesn't interfere with user interactions
          muxVideo.appendChild(watermark);
        }
      }
    }
  };
  const updateNumberOfViews = async () => {
    try {
      await axios.put("/api/chapterCustomer", {
        chapterId: chapterId,
        userEmail: email,
      });
      toast.success("Chapter Watched");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    if (isReady) {
      addWaterMark();
    }
  }, [isReady]);
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-sec" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked </p>
        </div>
      )}
      {!isLocked && (
        <div className="relative">
          <MuxPlayer
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => {
              setIsReady(true);
            }}
            onEnded={() => {
              updateNumberOfViews();
              onEnd();
            }}
            playbackId={playbackId}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
