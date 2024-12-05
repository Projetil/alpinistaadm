import { IoInformationCircle } from "react-icons/io5";

const Tab1Modal = () => {
  return (
    <div>
      <div className="flex w-full justify-between mb-8">
        <h4 className="font-semibold text-[#050506]">Informações principais</h4>
        <IoInformationCircle color="#1A69C4" size={24} />
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-start text-center text-[#80828D]">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">ID</p>
            <p>2488</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Estado</p>
            <p>Estado</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Data limite</p>
            <p>01/01/2024</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Nome</p>
            <p>Dispout 1923923324 Lorem Ipsum Error</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Severidade</p>
            <p>Info</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Data de correção</p>
            <p>01/01/2024</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="font-semibold text-[#40414A]">Descrição</p>
        <p className="md:w-2/3 text-[#80828D]">
          Lorem ipsum dolor sit amet consectetur. Malesuada in pellentesque
          morbi velit lorem hendrerit malesuada egestas morbi. Enim faucibus
          vitae tellus ac hendrerit.
        </p>
      </div>
    </div>
  );
};

export default Tab1Modal;
