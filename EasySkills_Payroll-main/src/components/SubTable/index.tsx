import React from "react";
import { Delivery } from "../../api/delivery";
import { ContractType } from "../../api/dictionary";
import { IncludedContract, IncludedProject } from "../../api/types";
import NoContractTableRow from "./NoContractTableRow";
import NoDeliveryTableRow from "./NoDeliveryTableRow";
import { TimeReport } from "../../api/time-report";
import SubTableRow from "./SubTableRow";
import { Salary } from "../../api/salary";
import { SalaryUtils } from "../../utils/SalaryUtils";

type SubTableProps = {
  resourceId: string;
  salaries: Salary[];
  timeReports: TimeReport[];
  activeContracts: IncludedContract[];
  activateDeliveries: Delivery[];
  contractTypes: ContractType[];
  projectItem: IncludedProject | undefined;
  formatDate: (dateString: string) => string;
  salaryUtils: SalaryUtils;
};

const SubTable: React.FC<SubTableProps> = ({
  resourceId,
  salaries,
  timeReports,
  activeContracts,
  activateDeliveries,
  contractTypes,
  formatDate,
  projectItem,
  salaryUtils,
}) => {
  let comparedDeliveryId = -1;
  let comparedContractId = -1;

  if (activeContracts.length === 0 && activateDeliveries.length === 0) return;

  if (activeContracts.length === 0 && activateDeliveries.length !== 0) {
    return activateDeliveries.map((delivery, deliveryIndex) => {
      const isLastChild = deliveryIndex === activateDeliveries.length - 1;

      return (
        <NoDeliveryTableRow
          key={`${delivery.id}`}
          delivery={delivery}
          timeReports={timeReports}
          projectItem={projectItem}
          isLastChild={isLastChild}
        />
      );
    });
  }

  if (activeContracts.length !== 0 && activateDeliveries.length === 0) {
    return activeContracts.map((contract, contractIndex) => {
      const isLastChild = contractIndex === activeContracts.length - 1;

      return (
        <NoContractTableRow
          key={`${contract.id}`}
          isLastChild={isLastChild}
          contract={contract}
          contractTypes={contractTypes}
          formatDate={formatDate}
        />
      );
    });
  }

  return activeContracts.flatMap((contract, contractIndex) =>
    activateDeliveries.map((delivery, deliveryIndex) => {
      const isLastChild =
        contractIndex === activeContracts.length - 1 && deliveryIndex === activateDeliveries.length - 1;
      const isSameContract =
        deliveryIndex > 0 && comparedDeliveryId !== deliveryIndex && comparedContractId === contractIndex;

      comparedDeliveryId = deliveryIndex;
      comparedContractId = contractIndex;
      return (
        <SubTableRow
          key={`${contract.id}-${delivery.id}`}
          salaryUtils={salaryUtils}
          resourceId={resourceId}
          salaries={salaries}
          isLastChild={isLastChild}
          isSameContract={isSameContract}
          contract={contract}
          delivery={delivery}
          timeReports={timeReports}
          projectItem={projectItem}
          contractTypes={contractTypes}
          formatDate={formatDate}
        />
      );
    }),
  );
};

export default SubTable;
