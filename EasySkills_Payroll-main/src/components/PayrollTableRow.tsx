import { TableRow, TableCell, styled } from "@mui/material";
import React, { useMemo, useState } from "react";
import AdvantagesTableCell from "./AdvantagesTableCell";
import ContractsTableCell from "./ContractsTableCell";
import DeliveriesTableCell from "./DeliveriesTableCell";
import NoteTableCell from "./NoteTableCell";
import { IncludedContract, IncludedProject } from "../api/types";
import SubTable from "./SubTable";
import TotalTimesReportTableCell from "./TotalTimesReportTableCell";
import dayjs from "dayjs";
import ProjectTableCell from "./ProjectTableCell";
import ClientTableCell from "./ClientTableCell";
import Checkbox from "./Checkbox";
import StateTableCell from "./StateTableCell";
import { Payslip } from "../api/payrollService";
import { ContractType } from "../api/dictionary";
import { useExtractPayrollQuery } from "../queries/useExtractPayrollQuery";
import { Salary } from "../api/salary";
import { useCurrencies } from "../store/useCurrenciesStore";
import { SalaryUtils } from "../utils/SalaryUtils";

const getPrimaryTableRowStyle = (isLastRow: boolean, isOpen: boolean) =>
  styled(TableRow)({
    cursor: "pointer",
    position: "relative",
    borderTop: isOpen ? "1px solid #F6F6F7" : "",
    borderRight: isOpen ? "1px solid #F6F6F7" : "",
    borderLeft: isOpen ? "1px solid #F6F6F7" : "",
    height: "56px",
    "&:hover": {
      backgroundColor: "#474348 !important",
    },
    "&::after":
      isLastRow && !isOpen
        ? {}
        : {
            content: "''",
            position: "absolute",
            bottom: "0.5px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#6A6A6B",
          },
    "& th": {
      color: "#EBEBEB",
      "&:hover": { color: "#FEA500" },
    },
  });

type PayrollTableRowProps = {
  payslip: Payslip;
  contractTypes: ContractType[];
  salaries: Salary[];
  isLastRow: boolean;
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
};

const term = dayjs().format("YYYY-MM");

const PayrollTableRow: React.FC<PayrollTableRowProps> = ({
  payslip,
  isLastRow,
  contractTypes,
  salaries,
  isSelected,
  onSelectChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const salaryUtils = useMemo(() => new SalaryUtils(), []);
  const grossSalary = salaryUtils.getTotalSalary(payslip.id);
  const netSalary = salaryUtils.getNetSalary(payslip.id);

  const extractPayrolls = useExtractPayrollQuery(term);
  const timesheets = payslip.timesheets;
  const currencies = useCurrencies();

  const currentMonthTimesheets = useMemo(
    () => timesheets.filter((timesheet) => timesheet.attributes.term === term),
    [timesheets],
  );
  const currentMonthExpenses = useMemo(
    () => payslip.expenses.filter((expense) => expense.attributes.term === term),
    [payslip.expenses],
  );

  const activeContracts = useMemo(
    () =>
      payslip.contracts.reduce<IncludedContract[]>((acc, includedItem) => {
        if (includedItem.type === "contract") {
          const contract = includedItem as IncludedContract;
          const today = dayjs().startOf("day");
          const endDate = dayjs(contract.attributes.endDate);
          if (today.isBefore(endDate) || today.isSame(endDate) || contract.attributes.endDate === "") {
            acc.push(contract);
          }
        }
        return acc;
      }, []),
    [payslip.contracts],
  );

  const activateDeliveries = useMemo(
    () =>
      payslip.deliveries.filter((delivery) => {
        const today = dayjs().startOf("day");

        const endDate = dayjs(delivery.attributes.endDate);
        return today.isBefore(endDate) || today.isSame(endDate);
      }),
    [payslip.deliveries],
  );

  const contractSalaries = useMemo(() => {
    const contractIds = activeContracts.map((contract) => contract.id);
    return salaries.filter((salary) => {
      const [contractId, _] = salary.id.split("#");
      return contractIds.includes(contractId);
    });
  }, [activeContracts, salaries]);

  const isSameCurrencyType = useMemo(
    () => contractSalaries.every((salary) => salary.currencyId === contractSalaries[0].currencyId),
    [contractSalaries],
  );

  const projectItem = useMemo(() => {
    const projectDelivery = activateDeliveries.find((delivery) => {
      const projectId = delivery.relationships.project.data.id;

      return payslip.deliveriesIncluded?.some(
        (includedItem) => includedItem.type === "project" && projectId === includedItem.id,
      );
    });

    return payslip.deliveriesIncluded?.find(
      (includedItem) =>
        includedItem.type === "project" && projectDelivery?.relationships.project.data.id === includedItem.id,
    ) as IncludedProject;
  }, [activateDeliveries, payslip.deliveriesIncluded]);

  const currencySymbol = useMemo(() => {
    if (!contractSalaries.length) return "";
    return isSameCurrencyType
      ? currencies.find((currency) => currency.id === contractSalaries[0]?.currencyId)?.symbol
      : "";
  }, [contractSalaries, currencies, isSameCurrencyType]);

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "...";
    }
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const StyledPrimaryTableRow = getPrimaryTableRowStyle(isLastRow, isOpen);

  return (
    <>
      <StyledPrimaryTableRow
        onClick={() => {
          setOpen(!isOpen);
        }}
        hover={true}
      >
        <TableCell sx={{ position: "relative" }} padding="checkbox">
          <Checkbox onChange={onSelectChange} isChecked={isSelected} className="justify-center" />
        </TableCell>
        <ClientTableCell
          projectItem={projectItem}
          projects={payslip.projects}
          projectsIncluded={payslip.projectsIncluded}
        />
        <TableCell scope="row">{`${payslip.id} - ${payslip.lastName} ${payslip.firstName}`}</TableCell>
        <ContractsTableCell activeContracts={activeContracts} contractTypes={contractTypes} formatDate={formatDate} />
        <ProjectTableCell projectItem={projectItem} />
        <DeliveriesTableCell activateDeliveries={activateDeliveries} />
        <TotalTimesReportTableCell timeReports={payslip.timeReports} />
        <TableCell></TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {currencySymbol}
          {grossSalary.toFixed(2)}
        </TableCell>
        <TableCell></TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {currencySymbol}
          {netSalary.toFixed(2)}
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {`${extractPayrolls?.reduce((sum, extractPayroll) => (extractPayroll.relationships.dependsOn.data.id === payslip.id ? sum + (extractPayroll.attributes.absencesTimes ?? 0) : sum), 0)}d`}
        </TableCell>
        <AdvantagesTableCell payslip={payslip} />
        <NoteTableCell payslip={payslip} extraPayrolls={extractPayrolls} />
        <StateTableCell
          currentMonthItems={currentMonthTimesheets}
          isValidated={currentMonthTimesheets.every((timesheet) => timesheet.attributes.state === "validated")}
        />
        <StateTableCell
          currentMonthItems={currentMonthExpenses}
          isValidated={currentMonthExpenses.every((expense) => expense.attributes.state === "validated")}
        />
      </StyledPrimaryTableRow>
      {isOpen && (
        <SubTable
          resourceId={payslip.id}
          salaries={salaries}
          timeReports={payslip.timeReports}
          activeContracts={activeContracts}
          activateDeliveries={activateDeliveries}
          contractTypes={contractTypes}
          formatDate={formatDate}
          projectItem={projectItem}
          salaryUtils={salaryUtils}
        />
      )}
      {isOpen && (
        <TableRow
          sx={{
            height: "15px",
            position: "relative",
            "&::after": {
              content: "''",
              position: "absolute",
              bottom: "0.5px",
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "#6A6A6B",
            },
          }}
        ></TableRow>
      )}
    </>
  );
};

export default PayrollTableRow;
