export default function SplashScreen() {

  return (

    <div
      style={{
        background: "#520000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        position: "relative"
      }}
    >

      <img
        src="https://res.cloudinary.com/dvk4sjiv6/image/upload/v1779713993/logo_dept_q2kmqy.png"

        alt="logo"

        style={{
          width: "240px",
          marginBottom: "37px"
        }}
      />

      <h1
        style={{
          fontSize: "72px",
          margin: "0"
        }}
      >
        MET Portfolio
      </h1>

      <p
        style={{
          color: "#888",
          fontSize: "22px",
          marginTop: "30px"
        }}
      >
        Architecture Platform
      </p>

      <p
        style={{
          position: "absolute",
          bottom: "30px",
          color: "#666",
          fontSize: "15px"
        }}
      >
        Developed by Lasheen
      </p>

    </div>
  )
}