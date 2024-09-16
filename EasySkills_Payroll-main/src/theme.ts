import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#B0B0B0", // 为未选中状态设置边框颜色
          "&:hover": {
            backgroundColor: "transparent", // 悬停时背景透明
          },
          "&.Mui-checked": {
            color: "#B0B0B0", // 选中状态保持边框颜色不变
            "&:hover": {
              backgroundColor: "transparent", // 悬停时背景透明
            },
          },
          "&.Mui-disabled": {
            color: "#B0B0B0", // 禁用状态保持边框颜色不变
          },
        },
      },
    },
  },
});

export default theme;
