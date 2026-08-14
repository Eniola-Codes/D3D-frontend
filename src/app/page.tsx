import HeroSection from '@/components/home/hero';
import Navbar from '@/components/home/layout/nav-bar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
};

export default Home;
