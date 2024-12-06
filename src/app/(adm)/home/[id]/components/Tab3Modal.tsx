import { FaClockRotateLeft } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import { IoIosGitNetwork } from "react-icons/io";
import CommentsChat from "./CommentsChat";
import { IRisk } from "@/types/IRisk";
import {
  IPagedRisksHistorical,
  IRiskHistorical,
} from "@/types/IRisksHistorical";
import { useMemo, useState } from "react";
import { IPagedRisksComment } from "@/types/IRisksComment";
import RisksCommentService from "@/services/RisksCommentService";
import RisksHistoricalService from "@/services/RisksHistoricalService";

const Tab3Modal = ({
  hideComment,
  currentRisk,
}: {
  hideComment: boolean;
  handleComment: () => void;
  currentRisk?: IRisk;
}) => {
  const [historicalData, setHistoricalData] = useState<IPagedRisksHistorical>();
  const [commentsData, setCommentsData] = useState<IPagedRisksComment>();

  const fetchComments = async (id: number) => {
    try {
      const res = await RisksCommentService.Get(0, 0, id);
      setCommentsData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistorical = async (id: number) => {
    try {
      const res = await RisksHistoricalService.Get(0, 0, id);
      setHistoricalData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (currentRisk) {
      fetchComments(currentRisk.id);
      fetchHistorical(currentRisk.id);
    }
  }, [currentRisk]);

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
          {historicalData?.items.map((item: IRiskHistorical, index: number) => (
            <HistoricalCard text={item.text} key={index} />
          ))}
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
        <CommentsChat comments={commentsData} riskId={currentRisk?.id} />
      </div>
    </div>
  );
};

export default Tab3Modal;

const HistoricalCard = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col gap-4 bg-[#FFFFFF] p-2">
      <div className="flex gap-4">
        <IoIosGitNetwork
          size={36}
          className="p-2 bg-[#EEEEF0] rounded text-[#1F4C85]"
        />
        <p className="text-[#050506] text-sm break-all">{text}</p>
      </div>
      <p className="text-xs text-[#8C8B91] w-full justify-end text-end">
        01 de Janeiro de 2024 - 13:24
      </p>
    </div>
  );
};
