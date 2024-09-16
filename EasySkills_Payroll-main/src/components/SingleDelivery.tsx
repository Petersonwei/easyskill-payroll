import { TableCell } from "@mui/material";
import React from "react";
import { Delivery } from "../api/delivery";

type SingleDeliveryProps = {
  delivery: Delivery;
};

const SingleDelivery: React.FC<SingleDeliveryProps> = ({ delivery }) => {
  return (
    <TableCell sx={{ maxWidth: "200px", overflow: "hidden" }}>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">{`MIS${delivery.id}${delivery.attributes.title && ` - ${delivery.attributes.title}`}`}</div>
    </TableCell>
  );
};

export default SingleDelivery;
