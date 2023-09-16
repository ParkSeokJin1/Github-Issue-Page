import React, { useState } from "react"
import styles from "./Modal.module.css"
import cx from "clsx"

export default function Modal({ title, onClose, opened, placeholder }) {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  )
}
