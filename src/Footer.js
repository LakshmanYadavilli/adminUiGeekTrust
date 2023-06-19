import { Stack, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Footer.css";
function Footer({
  data,
  pageFn,
  sizeBtn,
  pageNo,
  leftRightPage,
  startEndPage,
  deleteSelectedFn,
  originalData,
  setMainChecked,
}) {
  return (
    <div className="footer">
      <Stack
        direction={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Button
          variant={"contained"}
          color={"error"}
          onClick={() => deleteSelectedFn()}
        >
          Delete Selected
        </Button>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width="80%"
        >
          {" "}
          {pageNo === 1 ? (
            <button
              className="page"
              style={{ backgroundColor: "rgb(213, 214, 214)" }}
            >
              <KeyboardDoubleArrowLeftIcon
                onClick={() => startEndPage("start")}
              />
            </button>
          ) : (
            <button className="page">
              <KeyboardDoubleArrowLeftIcon
                onClick={() => startEndPage("start")}
              />
            </button>
          )}
          {pageNo === 1 ? (
            <button
              className="page"
              onClick={() => {
                setMainChecked(false);
                leftRightPage(pageNo, "left");
              }}
              style={{ backgroundColor: "rgb(213, 214, 214)" }}
            >
              <KeyboardArrowLeftIcon />
            </button>
          ) : (
            <button
              className="page"
              onClick={() => leftRightPage(pageNo, "left")}
            >
              <KeyboardArrowLeftIcon />
            </button>
          )}
          {Array(sizeBtn)
            .fill("")
            .map((item, index) => {
              if (pageNo === index + 1) {
                return (
                  <button
                    className="page currentPage"
                    key={index}
                    onClick={() => {
                      setMainChecked(false);
                      pageFn(index + 1, data, sizeBtn);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              } else {
                return (
                  <button
                    className="page"
                    key={index}
                    onClick={() => {
                      setMainChecked(false);
                      pageFn(index + 1, data, sizeBtn);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              }
            })}
          {pageNo === sizeBtn ? (
            <button
              className="page"
              onClick={() => leftRightPage(pageNo, "right")}
              style={{ backgroundColor: "rgb(213, 214, 214)" }}
            >
              <KeyboardArrowRightIcon />
            </button>
          ) : (
            <button
              className="page"
              onClick={() => leftRightPage(pageNo, "right")}
            >
              <KeyboardArrowRightIcon />
            </button>
          )}
          {pageNo === sizeBtn ? (
            <button
              className="page"
              onClick={() => startEndPage("end")}
              style={{ backgroundColor: "rgb(213, 214, 214)" }}
            >
              <KeyboardDoubleArrowRightIcon />
            </button>
          ) : (
            <button className="page" onClick={() => startEndPage("end")}>
              <KeyboardDoubleArrowRightIcon />
            </button>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export default Footer;
