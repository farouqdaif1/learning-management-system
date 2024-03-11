const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  return (
    <div>
      CourseID:
      {params.courseId}
    </div>
  );
};
export default CourseIdPage;
