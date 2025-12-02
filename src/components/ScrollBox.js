function ScrollBox({ children }) {
  return (
    <div style={{
    //   display: "flex",
    height:"auto",
    width: "100%",
      overflowY: "scroll",
    //   border: "1px solid #ccc",
    //   padding: "1rem"
    }}>
      {children}
    </div>
  );
}

export default ScrollBox;
