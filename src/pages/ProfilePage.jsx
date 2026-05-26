export default function ProfilePage({

  user,
  projects,
  onBack,
  onUpload,
  onEditProfile,
  onProjectClick,
  onEditProject,
  onDeleteProject

}) {

  const myProjects =

    projects.filter(

      project =>

        project.ownerId ===
        user.uid
    )

  return (

    <div
      style={{
        background: "#070707",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          padding: "40px 50px"
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
            marginBottom: "50px",
            fontSize: "15px"
          }}
        >
          ← Back
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "80px"
          }}
        >

          <img
            src={
              user.photoURL ||
              "https://i.pravatar.cc/150"
            }

            alt="profile"

            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border:
                "4px solid #1f1f1f",

              marginBottom: "30px",

              boxShadow:
                "0 0 40px rgba(0,0,0,0.4)"
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: "72px",
              lineHeight: "1",
              fontWeight: "bold",
              letterSpacing: "-2px"
            }}
          >
            {
              user.displayName
            }
          </h1>

          <p
            style={{
              color: "#888",
              fontSize: "22px",
              marginTop: "18px"
            }}
          >
            {user.email}
          </p>

          {

            user.bio &&

            <p
              style={{
                color: "#aaa",
                maxWidth: "900px",
                lineHeight: "2",
                marginTop: "28px",
                fontSize: "18px"
              }}
            >
              {user.bio}
            </p>
          }

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "30px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >

            {

              user.instagram &&

              <a

                href={
                  user.instagram
                }

                target="_blank"

                style={{
                  background: "#111",
                  color: "#c9a35b",
                  textDecoration: "none",
                  padding: "14px 24px",
                  borderRadius: "16px",
                  border:
                    "1px solid #222",

                  fontWeight: "bold"
                }}
              >
                Instagram
              </a>
            }

            {

              user.behance &&

              <a

                href={
                  user.behance
                }

                target="_blank"

                style={{
                  background: "#111",
                  color: "#c9a35b",
                  textDecoration: "none",
                  padding: "14px 24px",
                  borderRadius: "16px",
                  border:
                    "1px solid #222",

                  fontWeight: "bold"
                }}
              >
                Behance
              </a>
            }

          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "38px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >

            <button

              onClick={onEditProfile}

              style={{
                background: "#1b1b1b",
                color: "white",
                border: "1px solid #2d2d2d",
                padding: "18px 28px",
                borderRadius: "18px",
                cursor: "pointer",
                fontSize: "17px"
              }}
            >
              Edit Profile
            </button>

            <button

              onClick={onUpload}

              style={{
                background: "#c9a35b",
                color: "black",
                border: "none",
                padding: "18px 30px",
                borderRadius: "18px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "bold"
              }}
            >
              Upload Project
            </button>

          </div>

          <div
            style={{
              display: "flex",
              gap: "22px",
              marginTop: "45px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >

            <div
              style={{
                background: "#111",
                padding: "24px 34px",
                borderRadius: "24px",
                textAlign: "center",
                border:
                  "1px solid #1d1d1d",

                minWidth: "160px"
              }}
            >

              <h2
                style={{
                  margin: 0,
                  fontSize: "42px"
                }}
              >
                {
                  myProjects.length
                }
              </h2>

              <p
                style={{
                  color: "#777",
                  marginTop: "10px",
                  marginBottom: 0,
                  fontSize: "18px"
                }}
              >
                Projects
              </p>

            </div>

            <div
              style={{
                background: "#111",
                padding: "24px 34px",
                borderRadius: "24px",
                textAlign: "center",
                border:
                  "1px solid #1d1d1d",

                minWidth: "160px"
              }}
            >

              <h2
                style={{
                  margin: 0,
                  fontSize: "42px"
                }}
              >
                {

                  myProjects.reduce(

                    (total, project) =>

                      total +
                      (
                        project.likes || 0
                      ),

                    0
                  )
                }
              </h2>

              <p
                style={{
                  color: "#777",
                  marginTop: "10px",
                  marginBottom: 0,
                  fontSize: "18px"
                }}
              >
                Likes
              </p>

            </div>

          </div>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "35px"
          }}
        >

          <h2
            style={{
              fontSize: "42px",
              margin: 0
            }}
          >
            My Projects
          </h2>

          <p
            style={{
              color: "#777",
              fontSize: "17px"
            }}
          >
            {
              myProjects.length
            } Published Projects
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(360px,1fr))",

            gap: "35px"
          }}
        >

          {

            myProjects.map(project => (

              <div

                key={project.id}

                style={{
                  background: "#111",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border:
                    "1px solid #1d1d1d"
                }}
              >

                <div
                  style={{
                    position: "relative"
                  }}
                >

                  <img
                    src={
                      project.images?.[0]
                    }

                    alt="project"

                    style={{
                      width: "100%",
                      height: "340px",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      background:
                        "rgba(0,0,0,0.6)",

                      padding:
                        "10px 14px",

                      borderRadius:
                        "999px",

                      fontSize: "14px"
                    }}
                  >
                    {

                      project.category ||

                      "Architecture"
                    }
                  </div>

                </div>

                <div
                  style={{
                    padding: "24px"
                  }}
                >

                  <h2
                    style={{
                      marginTop: 0,
                      fontSize: "32px",
                      lineHeight: "1.2"
                    }}
                  >
                    {project.title}
                  </h2>

                  <p
                    style={{
                      color: "#888",
                      lineHeight: "1.8",
                      marginBottom: "24px"
                    }}
                  >
                    {

                      project.description ||

                      "Architectural project presentation."
                    }
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      gap: "12px",

                      flexWrap: "wrap"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        gap: "18px",
                        color: "#999"
                      }}
                    >

                      <p>
                        ❤️ {

                          project.likes || 0
                        }
                      </p>

                      <p>
                        🖼️ {

                          project.images?.length || 0
                        }
                      </p>

                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                      }}
                    >

                      <button

                        onClick={() =>
                          onProjectClick(project)
                        }

                        style={{
                          background: "#c9a35b",
                          color: "black",
                          border: "none",
                          padding: "12px 18px",
                          borderRadius: "14px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        View Project
                      </button>

                      <button

                        onClick={() =>
                          onEditProject(project)
                        }

                        style={{
                          background: "#1b1b1b",
                          color: "white",
                          border:
                            "1px solid #2d2d2d",

                          padding: "12px 18px",
                          borderRadius: "14px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Edit
                      </button>

                      <button

                        onClick={() =>
                          onDeleteProject(
                            project.id
                          )
                        }

                        style={{
                          background: "#501010",
                          color: "#ffb3b3",
                          border:
                            "1px solid #702020",

                          padding: "12px 18px",
                          borderRadius: "14px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}