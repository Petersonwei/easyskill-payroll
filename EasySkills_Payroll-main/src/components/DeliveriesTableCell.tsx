import React from "react";
import { TableCell } from "@mui/material";
import { Delivery } from "../api/delivery";
import SingleDelivery from "./SingleDelivery";

type DeliveriesTableCellProps = {
  activateDeliveries: Delivery[];
};

const DeliveriesTableCell: React.FC<DeliveriesTableCellProps> = ({ activateDeliveries }) => {
  if (activateDeliveries.length === 0) return <TableCell></TableCell>;
  if (activateDeliveries.length === 1) {
    const delivery = activateDeliveries[0];

    return <SingleDelivery delivery={delivery} />;
  }
  if (activateDeliveries.length > 1) {
    return (
      <TableCell>
        <div>{`${activateDeliveries.length} Deliveries`}</div>
      </TableCell>
    );
  }
};

export default DeliveriesTableCell;
