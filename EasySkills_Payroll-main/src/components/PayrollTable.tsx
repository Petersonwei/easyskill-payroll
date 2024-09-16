import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PayrollTableRow from "./PayrollTableRow";
import CheckboxTableHead from "./CheckboxTableHead";
import { Payslip } from "../api/payrollService";
import { ContractType } from "../api/dictionary";
import { useSelectedPaylipIds, useSetPaylipSelect, useSetSelectedPaylipIds } from "../store/useSelectedPaylipsStore";
import EmptyTableRow from "./EmptyPage";
import { useSetDate, useSetFilters } from "../store/useSearchFilterStore";
import dayjs from "dayjs";
import { Salary } from "../api/salary";

type PayrollTableProps = {
  payslips: Payslip[];
  contractTypes: ContractType[];
  salaries: Salary[];
  isLoading: boolean;
  resetSearchKey: (resetKey: string) => void;
};

const PayrollTable: React.FC<PayrollTableProps> = ({
  payslips,
  contractTypes,
  salaries,
  isLoading,
  resetSearchKey,
}) => {
  const selectedPayslipIds = useSelectedPaylipIds();
  const setPayslipSelect = useSetPaylipSelect();
  const setSelectedPaylipIds = useSetSelectedPaylipIds();

  const setFilters = useSetFilters();
  const setDate = useSetDate();

  const isPartialSelected =
    payslips.some((payslip) => selectedPayslipIds.includes(payslip.id)) &&
    !payslips.every((payslip) => selectedPayslipIds.includes(payslip.id));

  const isAllSelected = payslips.length > 0 && payslips.every((payslip) => selectedPayslipIds.includes(payslip.id));

  const handleSelectAllChange = () => {
    setSelectedPaylipIds(isAllSelected ? [] : payslips.map((payslip) => payslip.id));
  };

  const handleReset = (event: any) => {
    event.stopPropagation();
    setFilters({ perimeterAgencies: [], perimeterDynamic: [], resourceTypes: [] });
    setDate(dayjs().format("YYYY-MM"));
    resetSearchKey("");
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#242425",
        boxShadow: "none",
        margin: 0,
        padding: "10px",
        "& .MuiTableHead-root .MuiTableRow-root": {
          borderBottom: "none",
        },
      }}
      className="relative mx-[-10px] min-w-full p-[10px]"
    >
      <Table
        sx={{
          minWidth: 650,
          "th, td, span": {
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            boxSizing: "border-box",
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "'Roboto', 'sans-serif'",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "17px",
            padding: "11px 15px",
            textAlign: "left",
            verticalAlign: "center",
            textWrap: "nowrap",
            "&:last-child": {
              paddingRight: "15px",
            },
          },
        }}
        aria-label="payroll table"
      >
        <TableHead>
          <TableRow
            sx={{
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            <CheckboxTableHead
              isAllChecked={isAllSelected}
              isPartialChecked={isPartialSelected}
              onChangeAll={handleSelectAllChange}
            />
            <TableCell>Client</TableCell>
            <TableCell>Resource</TableCell>
            <TableCell>Active contracts</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Deliveries</TableCell>
            <TableCell>Production</TableCell>
            <TableCell style={{ textAlign: "center" }}>Pay Rate</TableCell>
            <TableCell>Gross Salary</TableCell>
            <TableCell style={{ textAlign: "center" }}>Tax Rate</TableCell>
            <TableCell>Net Salary</TableCell>
            <TableCell>Absence</TableCell>
            <TableCell>Advantages paid</TableCell>
            <TableCell>Note</TableCell>
            <TableCell style={{ textAlign: "center" }}>Timesheets state</TableCell>
            <TableCell style={{ textAlign: "center" }}>Expenses state</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payslips.length > 0 &&
            payslips.map((payslip, index) => (
              <PayrollTableRow
                salaries={salaries}
                isSelected={selectedPayslipIds.includes(payslip.id)}
                onSelectChange={(selected) => setPayslipSelect(payslip.id, selected)}
                contractTypes={contractTypes}
                isLastRow={index === payslips.length - 1}
                payslip={payslip}
                key={payslip.id}
              />
            ))}
          {!isLoading && payslips.length === 0 && <EmptyTableRow handleReset={handleReset} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PayrollTable;
