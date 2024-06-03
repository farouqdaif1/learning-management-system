import { Combobox } from "@/components/ui/combobox";
import { db } from "@/lib/db";
interface CourseMenuProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

const CourseMenu = async ({ field }: CourseMenuProps) => {
  const courses = await db.course.findMany();
  return (
    <Combobox
      {...field}
      options={courses.map((course) => ({
        label: course.title,
        value: course.id,
      }))}
    />
  );
};

export default CourseMenu;
