
import './Page.css';
import LifeStats from './LifeStats';
import Presentation from './Presentation';
import Snake from './Snake';
function Page() {
  return (
    <div className="pages">
      <Presentation></Presentation>
      {/* ДАТА ПОМЕНЯТЬ С УЧЕТОМ -3 ЧАСА */}
      <LifeStats birthDate="1996-04-05T07:44:00Z"></LifeStats>
      <Snake></Snake>
    </div>
  );
}

export default Page;
