import { db } from "@/lib/db";
import { Category, Chapter, Course, Season } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategoryWithSeason = Course & {
    category: Category;
    chapters: Chapter[];
    season: Season;
    progress: number | null;
}
type DashboardCourse = {
    completedCourses: CourseWithProgressWithCategoryWithSeason[];
    courseInprogress: CourseWithProgressWithCategoryWithSeason[];
}
export const getDashboardCourses = async (userId: string): Promise<DashboardCourse> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: { userId: userId }, select: {
                course: {
                    include: {
                        season: true,
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });
        const courses = purchasedCourses.map((purchasedCourse) => purchasedCourse.course) as CourseWithProgressWithCategoryWithSeason[];
        for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }
        const completedCourses = courses.filter((course) => course.progress === 100);
        const courseInprogress = courses.filter((course) => (course.progress ?? 0) < 100);
        return {
            completedCourses,
            courseInprogress,
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES_ERROR]", error);
        return {
            completedCourses: [],
            courseInprogress: [],
        }
    }
}