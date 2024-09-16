import { styled, TableRow, TableCell } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import SingleDelivery from "../SingleDelivery";
import DeliveryGrossSalaryTableCell from "./DeliveryGrossSalaryTableCell";
import DeliveryProjectTimesReportTableCell from "./DeliveryProjectTimesReportTableCell";
import PayRateTableCell from "./PayRateTableCell";
import SameContract from "./SameContract";
import { Delivery } from "../../api/delivery";
import { IncludedContract, IncludedProject } from "../../api/types";
import { ContractType } from "../../api/dictionary";
import { TimeReport } from "../../api/time-report";
import { Salary } from "../../api/salary";
import { useUpdateSalaryMutation } from "../../queries/useSalariesQuery";
import { useCurrencies } from "../../store/useCurrenciesStore";
import TaxRateTableCell from "./TaxRateTableCell";
import { SalaryUtils } from "../../utils/SalaryUtils";

type SubTableRowProps = {
  isLastChild: boolean;
  isSameContract: boolean;
  resourceId: string;
  contract: IncludedContract;
  delivery: Delivery;
  salaries: Salary[];
  contractTypes: ContractType[];
  projectItem?: IncludedProject;
  timeReports: TimeReport[];
  formatDate: (dateString: string) => string;
  salaryUtils: SalaryUtils;
};

const SubTableRow: React.FC<SubTableRowProps> = ({
  isLastChild,
  isSameContract,
  resourceId,
  contract,
  delivery,
  salaries,
  contractTypes,
  projectItem,
  timeReports,
  formatDate,
  salaryUtils,
}) => {
  const StyledSubTableRow = styled(TableRow)({
    borderRight: "1px solid #F6F6F7",
    borderLeft: "1px solid #F6F6F7",
    borderBottom: isLastChild ? "none" : "1px solid #6A6A6B",
  });
  const currencies = useCurrencies();
  const salary = useMemo(
    () => salaries.find((salary) => salary.id === `${contract.id}#${delivery.id}`),
    [contract.id, delivery.id, salaries],
  );

  const taxRate = salary?.taxRate ?? 100;
  const netSalary = useMemo(
    () => (salaryUtils.getTotalSalary(resourceId) * taxRate) / 100,
    [resourceId, salaryUtils, taxRate],
  );
  useEffect(() => {
    salaryUtils.setNetSalary(resourceId, netSalary);
  }, [netSalary, resourceId, salaryUtils]);

  const salaryCurrency = currencies.find((currency) => currency.id === salary?.currencyId);
  const contractCurrency = useMemo(
    () => currencies.find((currency) => currency.id === contract.attributes.currency),
    [contract.attributes.currency, currencies],
  );

  const { mutate: updateSalary } = useUpdateSalaryMutation();

  const handlePayRateChange = (change: { newCurrencyId?: number; dailyPayRate?: number }) => {
    if (!change.newCurrencyId && !change.dailyPayRate) return;
    updateSalary({
      contractId: contract.id,
      deliveryId: delivery.id,
      resourceId: resourceId,
      currencyId: change.newCurrencyId,
      dailyRate: change.dailyPayRate,
    });
  };

  const handleTaxRateChange = (newTaxRate: number) => {
    if (!newTaxRate) return;
    updateSalary({
      contractId: contract.id,
      deliveryId: delivery.id,
      resourceId: resourceId,
      taxRate: newTaxRate,
    });
  };

  return (
    <StyledSubTableRow key={`${contract.id}${delivery.id}`}>
      <TableCell sx={{ width: "80px" }} padding="checkbox"></TableCell>
      <TableCell sx={{ width: "120px" }}></TableCell>
      <TableCell sx={{ width: "200px" }}></TableCell>
      <SameContract
        contract={contract}
        contractType={contractTypes.find((contractType) => contractType.id === contract.attributes.typeOf)}
        formatDate={formatDate}
        isSameContract={isSameContract}
      />
      <TableCell sx={{ width: "200px" }}></TableCell>
      <SingleDelivery delivery={delivery} />
      <DeliveryProjectTimesReportTableCell projectItem={projectItem} timeReports={timeReports} delivery={delivery} />
      <PayRateTableCell
        currencyId={salaryCurrency?.id}
        dailyPayRate={salary?.dailyRate}
        onChange={handlePayRateChange}
      />
      <DeliveryGrossSalaryTableCell
        currencySymbol={salaryCurrency?.symbol ?? contractCurrency?.symbol}
        resourceId={resourceId}
        salary={salary}
        delivery={delivery}
        timeReports={timeReports}
        projectItem={projectItem}
        salaryUtils={salaryUtils}
      />
      <TaxRateTableCell onChange={handleTaxRateChange} taxRate={taxRate} />
      <TableCell style={{ textAlign: "center" }}>
        {salaryCurrency?.symbol ?? contractCurrency?.symbol}
        {netSalary.toFixed(2)}
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </StyledSubTableRow>
  );
};

export default SubTableRow;
