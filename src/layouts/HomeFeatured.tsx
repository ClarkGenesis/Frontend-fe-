import { Link } from "react-router-dom";
import Honda_winnerX from "../assets/photos/motors/hondax.png";
import Honda_ADV_160 from "../assets/photos/motors/hondaa.png";
import Suzuki_Raider_Fi_150 from "../assets/photos/motors/suzuki.png";
import Yamaha_Mio_Gear_125 from "../assets/photos/motors/mio_gear125.png";
import Yamaha_Mio_i125 from "../assets/photos/motors/YamahaMioi125.png"
import Kawasaki_CT125 from "../assets/photos/motors/KawasakiCT.png";
import Honda_RS125 from "../assets/photos/motors/HondaRS.png";
import Honda_Click from "../assets/photos/motors/hondaClick.png";

function Featured () {
  return (
    <div className="p-4 bg-white text-black">
      <h1 className="text-2xl text-center mb-5">Featured Motorcycles</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Honda WINNER X */}
        <Link to="/HondaX" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Honda_winnerX}
                alt="Honda WINNER X"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Honda WINNER X
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

         {/* Honda ADV 160 */}
         <Link to="/HondaADV" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Honda_ADV_160}
                alt="Honda ADV 160"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Honda ADV 160
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Suzuki Raider Fi 150 */}
        <Link to="/SuzukiFI" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Suzuki_Raider_Fi_150}
                alt="Suzuki Raider Fi 150"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Suzuki Raider Fi 150
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Yamaha Mio i125 */}
        <Link to="/YamahaMioi125" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Yamaha_Mio_i125}
                alt="Yamaha Mio i125"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Yamaha Mio i125
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Yamaha Mio Gear 125 */}
        <Link to="/YamahaMio" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Yamaha_Mio_Gear_125}
                alt="Yamaha Mio Gear 125"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Yamaha Mio Gear 125
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Yamaha Mio Gear 125 */}
        <Link to="/KawasakiCT" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Kawasaki_CT125}
                alt="Kawasaki CT125"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Kawasaki CT125
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Honda RS125 */}
        <Link to="/HondaRS" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Honda_RS125}
                alt="Honda RS125"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Honda RS125
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Honda RS125 */}
        <Link to="/HondaClick" className="group block w-full">
          <div className="relative mx-auto w-4/5 overflow-hidden border-2 border-gray-200 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <img
                src={Honda_Click}
                alt="Honda CLICK125"
                className="w-4/5"
              />
              <div className="w-full mt-4">
                <div className="rounded-md bg-red-600 p-2 text-center">
                  <p className="text-sm font-semibold text-white">
                    Honda CLICK125
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Featured;