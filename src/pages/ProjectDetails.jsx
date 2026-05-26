export default function ProjectDetails({

  project,
  onBack,
  onOpenUserProfile

}) {

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backdropFilter: "blur(20px)",
          background:
            "rgba(8,8,8,0.7)",

          borderBottom:
            "1px solid #1d1d1d",

          padding:
            "18px 40px",

          display: "flex",
          justifyContent:
            "space-between",

          alignItems:
            "center"
        }}
      >

        <button

          onClick={onBack}

          style={{
            background: "#1d1d1d",
            color: "white",
            border: "1px solid #2a2a2a",
            padding: "14px 22px",
            borderRadius: "16px",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          ← Back
        </button>

        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center"
          }}
        >

          <div
            style={{
              background:
                "#c9a35b",

              color: "black",

              padding:
                "10px 16px",

              borderRadius:
                "999px",

              fontWeight:
                "bold",

              fontSize:
                "14px"
            }}
          >
            {

              project.category ||

              "Architecture"
            }
          </div>

          <div
            style={{
              background:
                "#1a1a1a",

              padding:
                "10px 16px",

              borderRadius:
                "999px",

              color:
                "#aaa",

              fontSize:
                "14px"
            }}
          >
            ❤️ {

              project.likes || 0
            }
          </div>

        </div>

      </div>

      <div
        style={{
          padding:
            "60px 50px"
        }}
      >

        <div
          style={{
            marginBottom:
              "60px"
          }}
        >

          <h1
            style={{
              fontSize:
                "88px",

              lineHeight:
                "1",

              marginBottom:
                "24px",

              maxWidth:
                "1100px"
            }}
          >
            {
              project.title
            }
          </h1>

          <p
            style={{
              color:
                "#888",

              fontSize:
                "20px",

              maxWidth:
                "850px",

              lineHeight:
                "1.9"
            }}
          >
            {

              project.description ||

              "Architectural project presentation showcasing spatial identity, materiality, atmosphere and design vision."
            }
          </p>

        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap:
              "34px"
          }}
        >

          {

            project.images?.map(

              (
                image,
                index
              ) => (

                <div

                  key={index}

                  style={{
                    position:
                      "relative"
                  }}
                >

                  <img

                    src={image}

                    alt="project"

                    style={{
                      width:
                        "100%",

                      borderRadius:
                        "34px",

                      objectFit:
                        "cover",

                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.45)"
                    }}
                  />

                  <div
                    style={{
                      position:
                        "absolute",

                      bottom:
                        "24px",

                      right:
                        "24px",

                      background:
                        "rgba(0,0,0,0.55)",

                      backdropFilter:
                        "blur(12px)",

                      padding:
                        "12px 18px",

                      borderRadius:
                        "16px",

                      color:
                        "white",

                      fontSize:
                        "14px"
                    }}
                  >
                    Image {

                      index + 1
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

        <div
          style={{
            marginTop:
              "90px",

            background:
              "linear-gradient(180deg,#111,#0b0b0b)",

            border:
              "1px solid #1d1d1d",

            borderRadius:
              "36px",

            padding:
              "40px"
          }}
        >

          <p
            style={{
              color:
                "#777",

              marginBottom:
                "18px",

              letterSpacing:
                "2px",

              fontSize:
                "13px"
            }}
          >
            PROJECT OWNER
          </p>

          <div
            style={{
              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              flexWrap:
                "wrap",

              gap:
                "30px"
            }}
          >

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "22px"
              }}
            >

              <img

                onClick={() =>

                  onOpenUserProfile(
                    project
                  )
                }

                src={
                  project.ownerImage
                }

                alt="owner"

                style={{
                  width:
                    "120px",

                  height:
                    "120px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover",

                  cursor:
                    "pointer",

                  border:
                    "3px solid #222"
                }}
              />

              <div>

                <h1

                  onClick={() =>

                    onOpenUserProfile(
                      project
                    )
                  }

                  style={{
                    margin:
                      0,

                    fontSize:
                      "48px",

                    cursor:
                      "pointer"
                  }}
                >
                  {
                    project.ownerName
                  }
                </h1>

                <p
                  style={{
                    color:
                      "#888",

                    marginTop:
                      "14px",

                    maxWidth:
                      "650px",

                    lineHeight:
                      "1.8"
                  }}
                >
                  Architectural
                  Designer &
                  Creative Visualizer
                </p>

              </div>

            </div>

            <button

              onClick={() =>

                onOpenUserProfile(
                  project
                )
              }

              style={{
                background:
                  "#c9a35b",

                color:
                  "black",

                border:
                  "none",

                padding:
                  "18px 28px",

                borderRadius:
                  "18px",

                cursor:
                  "pointer",

                fontWeight:
                  "bold",

                fontSize:
                  "16px"
              }}
            >
              View Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}