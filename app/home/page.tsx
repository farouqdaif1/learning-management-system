import ContactUs from "./_components/contact-us";
import Footer from "./_components/Footer";
import BannerHome from "./_components/banner-home";
import NavBarHome from "./_components/navbar-home";
import Slider from "./_components/slider";
import ExploreOurCourses from "./_components/explor-our-courses";

const Home = () => {
  return (
    <div>
      <NavBarHome />
      <Slider />
      <ExploreOurCourses />
      <BannerHome />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
