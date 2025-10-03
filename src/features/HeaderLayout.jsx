import { AppBar, Toolbar, Typography } from "@mui/material";

function HeaderLayout({ children }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1, // ✅ keeps SSTicketing pinned left
            }}
          >
            SSTicketing
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "10px" }}>{children}</div>
    </div>
  );
}

export default HeaderLayout;
