import '../pages/App.css';
import Game from '../assets/images/game.jpg'
import Game2 from '../assets/images/game2.jpg'
import Manga from '../assets/images/manga.jpg'
import Mangabg4 from '../assets/images/mangabg4.jpg'
import Mangabg5 from '../assets/images/mangabg5.jpg'
import Marvelbg from '../assets/images/marvelbg.jpg'
import Mob from '../assets/images/mob.jpg'
import Mob2 from '../assets/images/mob2.jpg'
import Music7 from '../assets/images/music7.jpg'
import Simpsonsbg2 from '../assets/images/simpsonsbg2.png'

const content = () => {

  return (
    <div className="Parallax-c Bg-content" id="content">
        <div>
            <div className="Text2">
                <p className="Title">HALLO I'M HARIS - A Web Developer From ID.</p>
                 {/* <p className="dsc">Just a normal human who likes films and anime </p> */}
                <p className="Dsc">I believe there's no luck or shit, only fate </p>
              {/* <p className="title2">HALLO I'M HARIS - A Web Developer From ID. Just a normal human who likes films and
                    anime </p> */}
                <p className="Title2">HALLO I'M HARIS - A Web Developer From ID. I believe there's no luck or shit, only
                    fate </p>
            </div>
            <div className="Co-foto ">
                <p className="Content-title">Lover of...</p>
                <div className="Display">
                    <div className="Content">
                        <img src={Simpsonsbg2} alt=""/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">family</p>
                        </div>
                    </div>
                    <div className="Content2">
                        <img src={Marvelbg} alt=""/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">movie</p>
                        </div>
                    </div>
                    <div className="Content3">
                        <img src={Mob} alt="" className="Mob"/>
                        <img src={Mob2} alt="" className="Mob2"/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">anime</p>
                        </div>
                    </div>
                    <div className="Content4">
                        <img src={Manga} alt="" className="Manga"/>
                        <img src={Mangabg5} alt="" className="Manga2"/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">manga</p>
                        </div>
                    </div>
                    <div className="Content5">
                        <img src={Music7} alt=""/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">music</p>
                        </div>
                    </div>
                    <div className="Content6">
                        <img src={Game2} alt="" className="Game"/>
                        <img src={Game} alt="" className="Game2"/>
                        <div className="Content-overlay">
                            <p className="Overlay-text">game</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default content;