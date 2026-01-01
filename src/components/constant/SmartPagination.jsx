import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SmartPagination = ({ page, totalPages, onChange }) => {
  return (
    <Stack spacing={2} alignItems="center" className="py-6">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
};

export default SmartPagination;
