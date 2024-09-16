import { Modal, Typography } from "@mui/material";
import React, { CSSProperties, useState } from "react";
import Icon from "./Icon";
import { Payslip } from "../api/payrollService";

type NoteModalProps = {
  open: boolean;
  commentList: string[];
  hasComment: boolean;
  payslip?: Payslip;
  handleClose?: (event: any) => void;
};
const style: CSSProperties = {
  maxWidth: "680px",
  maxHeight: "calc(100% - 3.5em)",
  color: "#FFFFFF",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: "#39393A",
  borderRadius: "4px",
  boxShadow: "24",
};

const NoteModal: React.FC<NoteModalProps> = ({ open, handleClose, commentList, hasComment, payslip }) => {
  const [comments, setComments] = useState(hasComment ? commentList.join("\n") : "");

  const handleEmpty = () => setComments("");
  const handleCancel = (event: any) => {
    event.stopPropagation();
    setComments(hasComment ? commentList.join("\n") : "");
    handleClose?.(event);
  };
  const handleSave = (event: any) => {
    event.stopPropagation();
    setComments(comments);
    handleClose?.(event);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div onClick={(event) => event.stopPropagation()} style={style}>
        <div className="flex w-full justify-between border-b border-[#6A6A6B] px-[20px] py-[12px]">
          <Typography id="modal-modal-title" variant="h6" component="h2" fontSize="16px">
            {`Comments - ${payslip?.lastName ?? ""} ${payslip?.firstName ?? ""}`}
          </Typography>
          <button onClick={handleClose}>
            <Icon name="close-button" width="16px" height="16px" />
          </button>
        </div>

        <div className="flex w-full flex-col items-end border-b border-[#6A6A6B] p-[24px] pt-3">
          <textarea
            rows={4}
            placeholder="Write your comments"
            className="w-full resize-none border border-[#6A6A6B] bg-inherit p-4 text-[12px] placeholder:text-[9px] placeholder:font-medium placeholder:italic placeholder:text-[#B8B8B8]"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          {hasComment && (
            <button className="flex gap-0.5 p-[10px] text-[12px] text-[#4697B6]" onClick={handleEmpty}>
              <div className="mt-0.5">
                <Icon name="rubbish-bin" width="12px" height="12px" />
              </div>
              <span>Empty</span>
            </button>
          )}
        </div>
        <div className="flex w-full justify-end gap-2 rounded-b-md bg-[#474748] px-4 py-2">
          <button
            className="z-10 min-w-14 cursor-pointer rounded-[3px] border-[1px] bg-[#666666] px-2 py-1.5 text-[12px] text-[#ECECEC] shadow-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="z-10 flex min-w-10 cursor-pointer items-center gap-0.5 rounded-[3px] border-[1px] border-[#FEA500] bg-[#FEA500] px-2 py-1.5 text-[12px] text-[#ffffff] shadow-sm"
            onClick={handleSave}
          >
            <div className="pb-0.5">
              <Icon name="save-button" width="13px" height="13px" />
            </div>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
