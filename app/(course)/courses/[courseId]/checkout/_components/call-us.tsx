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
        <h1 className="text-center text-4xl">: لشراء المسار </h1>
        <ul className="h-full flex flex-col justify-between  align-start text-xl">
          <li className="text-center">
            العنوان📍: ١٣ ش مصطفي اسماعيل تاني تقاطع من مطعم هريدي ( مجمع
            الكليات ) برج الصفوة الدور الثاني- الازاريطة - الاسكندرية
          </li>
          <li className="text-center">واتس اب 📱01272731495</li>
          <li className="text-center">تليفون ☎️ 03-4860400</li>
          <li className="text-center">تليفون ☎️ 03-4867607</li>
          <li className="text-center">وي باي 📱 01550029060</li>
        </ul>
      </div>
    </div>
  );
};

export default CallUsForm;
