import React from "react"
import Button from "./components/Button"
import styles from "./ListContainer.module.css"
import ListItem from "./components/Listitem"
import cx from "clsx"
import { useState, useEffect } from "react"
import ListItemLayout from "./components/ListItemLayout"
import ListFilter from "./components/ListFilter"
import Pagination from "./components/Pagination"
import axios from "axios"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  async function getData() {
    const data = await axios.get(
      `https://api.github.com/repos/facebook/react/issues`,
    )
    setList(data.data)
  }

  useEffect(() => {
    getData()
  }, []) // componentDidMount() dom이 그려진 후에 getData가 실행됨

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            style={{
              fontSize: "14px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            New issue
          </Button>
        </div>
        <OpenClosedFilters />
        <ListItemLayout className={styles.listFilter}>
          <ListFilter
            onChangeFilter={(filteredData) => {
              //필터링된 요소에 맞게 데이터를 불러오기
              // const data = getData('필터링된 정보')
              // setList(data);
            }}
          />
        </ListItemLayout>
        <div className={styles.container}>
          {list.map((item) => (
            <ListItem data={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={10}
          currentPage={page}
          onClickPageButton={(number) => setPage(number)}
        />
      </div>
    </>
  )
}

function OpenClosedFilters({ data }) {
  const [isOpenMode, setIsOpenMode] = useState(true)

  // const data = getDate();
  // const openDate = data.filter((d) => d.state === 'open')
  // const ClosedDate = data.filter((d) => d.state === 'closed')
  const openModeDataSize = 1 // openDate.length;
  const closeModeDataSize = 2

  return (
    <>
      <OpenClosedFilter
        size={openModeDataSize}
        state="Open"
        selected={isOpenMode}
        onClick={() => setIsOpenMode(true)}
      />
      <OpenClosedFilter
        size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => setIsOpenMode(false)}
      />
    </>
  )
}

function OpenClosedFilter({ size, state, onClick, selected }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  )
}
