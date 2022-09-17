import React from "react";
import { FiStar, FiRefreshCw } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

type Props = { contract: any };

function AdminControls({ contract }: Props) {
  const { data: operatorTotalCommission } = useContractRead(
    contract,
    "lastWinnerAmount"
  );

  const { mutateAsync: drawWinnerTicket, isLoading: isWithdrawingTickets } =
    useContractWrite(contract, "DrawWinnerTicket");
  const {
    mutateAsync: withdrawCommission,
    isLoading: isWithdrawingCommission,
  } = useContractWrite(contract, "WithdrawCommission");

  const { mutateAsync: refundAll, isLoading: isRefundingAll } =
    useContractWrite(contract, "RefundAll");

  const { mutateAsync: restartDraw, isLoading: isRestartingDraw } =
    useContractWrite(contract, "RestartDraw");

  const handleDrawClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const notification = toast.loading("Withdrawing funds...");
    try {
      await drawWinnerTicket([]);
      toast.success("Winner drawed successufully", { id: notification });
    } catch (error) {
      toast.error("Whoops, something went wrong!", { id: notification });
      console.error("Contract call failure", error);
    }
  };

  const handleWithdrawCommisionClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const notification = toast.loading("Withdrawing commissions...");
    try {
      await withdrawCommission([]);
      toast.success("Commissions withdrawed successufully", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops, something went wrong!", { id: notification });
      console.error("Contract call failure", error);
    }
  };
  const handleRestartClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const notification = toast.loading("Restarting lottery...");
    try {
      await restartDraw([]);
      toast.success("Lottery restarted successufully", { id: notification });
    } catch (error) {
      toast.error("Whoops, something went wrong!", { id: notification });
      console.error("Contract call failure", error);
    }
  };
  const handleRefundClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const notification = toast.loading("Refunding all tickets...");
    try {
      await refundAll([]);
      toast.success("Tickets refunded successufully", { id: notification });
    } catch (error) {
      toast.error("Whoops, something went wrong!", { id: notification });
      console.error("Contract call failure", error);
    }
  };

  const disableActions =
    isWithdrawingTickets ||
    isRefundingAll ||
    isRestartingDraw ||
    isWithdrawingCommission;

  return (
    <div className="mx-auto max-w-lg border border-slate-400 p-4 rounded-md">
      <h2 className="text-2xl text-center">Admin Controls</h2>
      <p className="my-2">
        Total commision can be withdrawn&nbsp;
        {operatorTotalCommission && (
          <span className="font-bold text-md">
            {ethers.utils.formatEther(operatorTotalCommission.toString())}
            &nbsp;MATIC
          </span>
        )}
      </p>
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0 ">
        <button
          disabled={disableActions}
          className="admin-button"
          onClick={handleDrawClick}
        >
          <FiStar className="admin-button-icon" />
          Draw Winner
        </button>
        <button
          disabled={disableActions}
          className="admin-button"
          onClick={handleWithdrawCommisionClick}
        >
          <BsCurrencyDollar className="admin-button-icon" />
          Withraw Commission
        </button>
        <button
          disabled={disableActions}
          className="admin-button"
          onClick={handleRestartClick}
        >
          <FiRefreshCw className="admin-button-icon" />
          Restart Draw
        </button>
        <button
          disabled={disableActions}
          className="admin-button"
          onClick={handleRefundClick}
        >
          <IoReturnDownBackOutline className="admin-button-icon" />
          Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminControls;
