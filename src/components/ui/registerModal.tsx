import React, { MouseEvent } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // 모달 외부를 클릭하여 모달을 닫을 때
    if (e.target === e.currentTarget) {
      onClose(); // onClose 함수 호출하여 모달 닫기
    }
  };

  /* styles.css */
  // .modal-overlay {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   z-index: 9999;
  // }

  // .modal-container {
  //   display: inline-flex;
  //   padding: 32px 40px;
  //   flex-direction: column;
  //   position: relative;
  //   justify-content: center;
  //   align-items: center;
  //   gap: 24px;
  //   width: 32.7rem;
  //   height: 22rem;
  //   background-color: white;
  //   padding: 20px;
  //   border-radius: 8px;
  //   border: 1px solid #ccd5e3;
  //   background: #fff;
  //   z-index: 10000;
  // }

  return (
    <div
      className="z-9999 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-950 bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div className="z-10000 flex h-[22rem] w-[32.7rem] flex-col items-center justify-center gap-[5rem] rounded-md border border-none bg-white py-[2.8rem]">
        <div>
          <p className="text-[1.6rem] font-medium not-italic leading-normal text-[#333236]">
            등록이 완료되었습니다
          </p>
        </div>
        <div className="flex items-center">
          <button className="flex h-[4.2rem] w-[13.8rem] items-center justify-center gap-[1rem] rounded-md bg-primary px-[5.6rem] py-[1.2rem]">
            <span className="text-center text-[1.4rem] font-medium not-italic leading-normal text-white">
              확인
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
