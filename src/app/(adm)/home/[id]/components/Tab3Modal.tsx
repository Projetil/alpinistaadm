import { FaClockRotateLeft } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import { IoIosGitNetwork } from "react-icons/io";
import CommentsChat from "./CommentsChat";

const Tab3Modal = ({
  hideComment,
}: {
  hideComment: boolean;
  handleComment: () => void;
}) => {
  return (
    <div className="flex justify-between gap-2">
      <div
        className={`${
          hideComment ? "flex md:flex" : "hidden md:flex"
        } flex-col w-full md:w-auto md:max-w-[400px] bg-[#F8F7F9] p-3 rounded-lg`}
      >
        <div className="flex w-full justify-between mb-8">
          <h4 className="font-semibold text-[#050506]">Histórico</h4>
          <FaClockRotateLeft color="#1A69C4" size={24} />
        </div>
        <div
          className={`${
            hideComment ? "flex md:flex" : "hidden md:flex"
          }  flex-col gap-4`}
        >
          <HistoricalCard />
          <HistoricalCard />
          <HistoricalCard />
        </div>
      </div>
      <div
        className={`${
          hideComment ? "hidden md:flex" : "flex md:flex"
        }  flex-col w-full md:w-auto md:max-w-[400px] bg-[#F8F7F9] p-3 rounded-lg`}
      >
        <div className="flex w-full justify-between mb-8">
          <h4 className="font-semibold text-[#050506]">Comentário</h4>
          <BsChatLeftText color="#1A69C4" size={24} />
        </div>
        <CommentsChat />
      </div>
    </div>
  );
};

export default Tab3Modal;

const HistoricalCard = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#FFFFFF] p-2">
      <div className="flex gap-4">
        <IoIosGitNetwork className="w-24 h-fit p-2  bg-[#EEEEF0] rounded text-[#1F4C85]" />
        <p className="text-[#050506] text-sm">
          Lorem ipsum dolor sit amet consectetur. Malesuada in pellentesque
          morbi velit lorem hendrerit malesuada egestas morbi. Enim faucibus
          vitae tellus ac hendrerit.
        </p>
      </div>
      <p className="text-xs text-[#8C8B91] w-full justify-end text-end">
        01 de Janeiro de 2024 - 13:24
      </p>
    </div>
  );
};
