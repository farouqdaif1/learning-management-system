import CourseCardInfo from "./course-card-info";
interface UserDataFormProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  category: string;
  season: string;
}

const CallUsForm = ({
  id,
  title,
  imageUrl,
  chapterLength,
  price,
  category,
  season,
}: UserDataFormProps) => {
  return (
    <div className="p-6 grid md:grid-cols-2 grid-cols-1">
      <div className="p-6">
        <CourseCardInfo
          id={id}
          title={title}
          imageUrl={imageUrl!}
          price={price!}
          category={category!}
          season={season!}
          chapterLength={chapterLength!}
          progress={null}
        />
      </div>
      <div className="h-full flex flex-col justify-center align-center ">
        <h1 className="text-center text-4xl">
          +201021246070 : لشراء المسار الرجاء الاتصال علي
        </h1>
      </div>
    </div>
  );
};

export default CallUsForm;
