import logo from "./logo.svg";
import { Grid, Checkbox, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import Footer from "./Footer";
import Details from "./Details";

function App() {
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [pageData, setPageData] = useState([]);
  let [filterData, setFilterData] = useState([]);
  let [pageNo, setPageNo] = useState(1);
  let [sizeBtn, setSizeBtn] = useState(1);
  let [checked, setChecked] = useState([]);
  let [mainChecked, setMainChecked] = useState(false);
  // console.log({ pageNo });
  console.log(checked);
  let getData = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log({ response });
      setData(response.data);
      setFilterData(response.data);
      sizeBtnFn(response.data);
      pageFn(1, response.data, sizeBtnFn(response.data));
    } catch (e) {
      console.log(e.error);
    }
  };
  let searchFn = (e) => {
    setSearch(e.target.value);
  };
  let checkedFn = (id) => {
    let arr = [...checked];
    if (arr.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
    } else {
      arr.push(id);
    }
    setChecked(arr);
    console.log(arr);
  };
  let editFn = (obj) => {
    let arr = [...data];
    let index = 0;
    let filterArr = arr.filter((n, i) => {
      if (n.id === obj.id) {
        index = i;
      }
    });
    arr.splice(index, 1, obj);
    setData(arr);
    // console.log([...data, obj]);
  };

  let deleteFn = (id) => {
    let mainData = [...data];
    let arr = mainData.filter((n) => id === n.id);
    mainData.splice(mainData.indexOf(arr[0]), 1);
    setData(mainData);
    // setFilterData(mainData);
    // pageNo > sizeBtnFn(mainData)
    //   ? pageFn(pageNo - 1, mainData, sizeBtnFn(mainData))
    //   : pageFn(pageNo, mainData, sizeBtnFn(mainData));
  };
  let deleteSelectedFn = () => {
    console.log("deleteFn");
    if (checked.length !== 0) {
      let originalData = [...data];
      // originalData.map((n) => console.log(n));
      let checkedObj = [];

      checked.map((n) => {
        let arr = originalData.filter((m) => m.id === n);
        checkedObj = [...checkedObj, arr[0]];
      });
      checkedObj.map((n) => {
        let index = originalData.indexOf(n);
        originalData.splice(index, 1);
      });

      setData(originalData);
      // setFilterData(originalData);
      // pageNo > sizeBtnFn(originalData)
      //   ? pageFn(pageNo - 1, originalData, sizeBtnFn(originalData))
      //   : pageFn(pageNo, originalData, sizeBtnFn(originalData));
      setMainChecked(false);
      setChecked([]);
      setSearch("");
      console.log({ checkedObj });
    }
  };
  let leftRightPage = (pageno, direction) => {
    console.log({ direction });
    if (direction === "left") {
      if (pageno > 1) {
        // setPageNo(pageno-1);
        pageFn(pageno - 1, filterData, sizeBtn);
      }
    } else {
      if (pageno < sizeBtn) {
        pageFn(pageno + 1, filterData, sizeBtn);
      }
    }
  };
  let startEndPage = (direction) => {
    if (direction === "start") {
      pageFn(1, filterData, sizeBtn);
    } else {
      pageFn(sizeBtn, filterData, sizeBtn);
    }
  };

  let sizeBtnFn = (data) => {
    let size_btn = 0;

    if (data.length / 10 === Math.floor(data.length / 10)) {
      size_btn = data.length / 10;
      setSizeBtn(size_btn);
    } else {
      size_btn = Math.floor(data.length / 10) + 1;
      setSizeBtn(size_btn);
    }
    return size_btn;
  };
  let pageFn = (pageno, data, sizeBtn) => {
    console.log({ sizeBtn });
    let pageData = [];
    if (pageno === sizeBtn) {
      pageData = data.slice(pageno * 10 - 10);
      setPageData(pageData);
      setPageNo(pageno);
    } else {
      pageData = data.slice(pageno * 10 - 10, pageno * 10);
      setPageData(pageData);
      setPageNo(pageno);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (search !== "") {
      let filter = data.filter(
        (n) =>
          n.name.toLowerCase().includes(search) ||
          n.email.toLowerCase().includes(search) ||
          n.role.toLowerCase().includes(search)
      );
      setFilterData(filter);
      sizeBtnFn(filter);
      pageFn(1, filter, sizeBtnFn(filter));
    } else {
      setFilterData(data);
      sizeBtnFn(data);
      setChecked([]);
      pageFn(1, data, sizeBtnFn(data));
    }
  }, [search]);
  useEffect(() => {
    setFilterData(data);
    setSizeBtn(data);
    pageNo > sizeBtnFn(data)
      ? pageFn(pageNo - 1, data, sizeBtnFn(data))
      : pageFn(pageNo, data, sizeBtnFn(data));
  }, [data]);

  return (
    <div className="App">
      <Grid
        className="gridContainer gridMain"
        container
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item sm={12}>
          <input
            className="search"
            type="text"
            placeholder="Search by name,email or role"
            value={search}
            onChange={searchFn}
          />
        </Grid>
        <Grid item sm={1.5}>
          <Checkbox
            checked={mainChecked}
            onChange={(e) => {
              setMainChecked(e.target.checked);
              let arr = [];
              if (e.target.checked) {
                pageData.map((n) => arr.push(n.id));
              }
              setChecked(arr);
            }}
          />
        </Grid>
        <Grid item sm={3}>
          <Typography variant={"h6"}>Name</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant={"h6"}>Email</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant={"h6"}>Role</Typography>
        </Grid>
        <Grid item sm={1.5}>
          <Typography variant={"h6"}>Actions</Typography>
        </Grid>
      </Grid>
      <div className="gridChild">
        {pageData.map((n) => {
          return (
            <Details
              key={n.id}
              n={n}
              checkedFn={checkedFn}
              mainChecked={mainChecked}
              checked={checked}
              deleteFn={deleteFn}
              editFn={editFn}
            />
          );
        })}
      </div>

      <Footer
        originalData={data}
        data={filterData}
        pageFn={pageFn}
        sizeBtn={sizeBtn}
        pageNo={pageNo}
        leftRightPage={leftRightPage}
        startEndPage={startEndPage}
        deleteSelectedFn={deleteSelectedFn}
        setMainChecked={setMainChecked}
      />
    </div>
  );
}

export default App;
