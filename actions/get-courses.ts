import { Course, Category, Season } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
type CourseWithCategoryWithProgressWithSeason = Course & { category: Category | null, progress: number | null, chapters: { id: string }[], season: Season | null };
type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
    seasonId?: string;

}
export const getCourses = async ({ title, userId, categoryId, seasonId }: GetCourses): Promise<CourseWithCategoryWithProgressWithSeason[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId: categoryId,
                seasonId: seasonId,
            }, include: {
                category: true,
                season: true,
                chapters: {
                    where: {
                        isPublished: true,
                    }, select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId: userId,
                    }
                }
            }, orderBy: {
                createdAt: "desc",
            }
        });
        const coursesWithProgress: CourseWithCategoryWithProgressWithSeason[] = await Promise.all(
            courses.map(async (course) => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,

                    }
                }

                const progressPercentage = await getProgress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage,

                }

            })
        )

        return coursesWithProgress;
    } catch (error) {
        console.log("[getCourses] Error: ", error);
        return [];
    }
}

