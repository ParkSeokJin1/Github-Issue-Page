import ListContainer from "../ListContainer"
import Footer from "../Footer"

//1. 훅은 최상위에서 호출 되어야 한다.
//2. 오직 react함수에서만 hook을 호출해야 한다.

function Issues() {
  return (
    <>
      <ListContainer />
      <Footer />
    </>
  )
}
// app이 부모 컴포넌트고 button이 하위컴포넌트기 때문에 props 로 전달

export default Issues
