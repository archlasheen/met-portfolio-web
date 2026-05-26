import {
  doc,
  updateDoc,
  increment
}

from "firebase/firestore"

import {
  db
}

from "../firebase"

export default function ExplorePage({

  projects,
  onProjectClick,
  user,
  login,
  logout,
  onProfile,
  onOpenUserProfile

}) {

  async function handleLike(
    e,
    project
  ) {

    e.stopPropagation()

    if (!user) {

      alert(
        "Login First"
      )

      return
    }

    const projectRef =
      doc(
        db,
        "projects",
        project.id
      )

    const alreadyLiked =

      project.likedByUsers?.includes(
        user.uid
      )

    const updatedUsers =

      [...(project.likedByUsers || [])]

    let updatedLikes =
      project.likes || 0

    if (alreadyLiked) {

      const index =

        updatedUsers.indexOf(
          user.uid
        )

      updatedUsers.splice(
        index,
        1
      )

      updatedLikes--

    } else {

      updatedUsers.push(
        user.uid
      )

      updatedLikes++
    }

    try {

      await updateDoc(

        projectRef,

        {

          likes:
            updatedLikes,

          likedByUsers:
            updatedUsers
        }
      )

    } catch (error) {

      console.log(error)
    }
  }

  async function handleView(
    project
  ) {

    try {

      const projectRef =
        doc(
          db,
          "projects",
          project.id
        )

      await updateDoc(

        projectRef,

        {
          views:
            increment(1)
        }
      )

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div
      style={{
        background:
          "#050505",

        minHeight:
          "100vh",

        color: "white",

        fontFamily:
          "Arial"
      }}
    >

      <div
        style={{
          position:
            "sticky",

          top: 0,

          zIndex: 999,

          backdropFilter:
            "blur(20px)",

          background:
            "rgba(10,10,10,0.7)",

          borderBottom:
            "1px solid #1d1d1d",

          padding:
            "18px 45px",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems:
              "center",

            gap: "16px"
          }}
        >

          <img
            src="https://res.cloudinary.com/dvk4sjiv6/image/upload/v1779713993/logo_dept_q2kmqy.png"

            alt="logo"

            style={{
              width: "54px",
              height: "54px"
            }}
          />

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: "30px"
              }}
            >
              MET Portfolio
            </h1>

            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px"
              }}
            >
              Architecture Platform
            </p>

          </div>

        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px"
          }}
        >

          <a

            href="https://drive.google.com/drive/folders/1hHTX45xBqpoP-hfjc4LHSnPBuDkfVk0Z?usp=drive_link"

            target="_blank"

            style={{
              background: "#16a34a",
              color: "white",
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "0.3s"
            }}
          >
            Download App
          </a>

          {

            !user ?

              <button

                onClick={login}

                style={{
                  background:
                    "#800517",

                  color:
                    "white",

                  border:
                    "none",

                  padding:
                    "14px 26px",

                  borderRadius:
                    "16px",

                  cursor:
                    "pointer",

                  fontWeight:
                    "bold",

                  fontSize:
                    "15px"
                }}
              >
                Login
              </button>

              :

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: "16px"
                }}
              >

                <img
                  src={
                    user.photoURL
                  }

                  alt="profile"

                  style={{
                    width:
                      "48px",

                    height:
                      "48px",

                    borderRadius:
                      "50%",

                    objectFit:
                      "cover",

                    border:
                      "2px solid #333"
                  }}
                />

                <p

                  onClick={
                    onProfile
                  }

                  style={{
                    cursor:
                      "pointer",

                    fontWeight:
                      "bold"
                  }}
                >
                  {
                    user.displayName
                  }
                </p>

                <button

                  onClick={
                    logout
                  }

                  style={{
                    background:
                      "#1d1d1d",

                    color:
                      "white",

                    border:
                      "1px solid #2d2d2d",

                    padding:
                      "12px 18px",

                    borderRadius:
                      "14px",

                    cursor:
                      "pointer"
                  }}
                >
                  Logout
                </button>

              </div>
          }

        </div>

      </div>

      <div
        style={{
          padding:
            "80px 50px 40px"
        }}
      >

        <div
          style={{
            marginBottom:
              "70px"
          }}
        >

          <h1
            style={{
              fontSize:
                "92px",

              lineHeight:
                "1",

              marginBottom:
                "24px",

              maxWidth:
                "900px"
            }}
          >
            Explore
            Creative
            Architecture
          </h1>

          <p
            style={{
              color:
                "#888",

              fontSize:
                "22px",

              maxWidth:
                "760px",

              lineHeight:
                "1.8"
            }}
          >
            Discover projects from
            architects, urban
            designers, interior
            creatives and visionary
            architecture students.
          </p>

        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(390px,1fr))",

            gap:
              "38px"
          }}
        >

          {

            projects.map(project => {

              const alreadyLiked =

                project.likedByUsers?.includes(
                  user?.uid
                )

              return (

                <div

                  key={project.id}

                  style={{
                    background:
                      "linear-gradient(180deg,#111,#0b0b0b)",

                    borderRadius:
                      "32px",

                    overflow:
                      "hidden",

                    border:
                      "1px solid #1d1d1d",

                    transition:
                      "0.35s",

                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.35)"
                  }}
                >

                  <div
                    style={{
                      position:
                        "relative"
                    }}
                  >

                    <img

                      onClick={() => {

                        handleView(
                          project
                        )

                        onProjectClick(
                          project
                        )
                      }}

                      src={
                        project.images?.[0]
                      }

                      alt="project"

                      style={{
                        width:
                          "100%",

                        height:
                          "430px",

                        objectFit:
                          "cover",

                        cursor:
                          "pointer"
                      }}
                    />

                    <div
                      style={{
                        position:
                          "absolute",

                        top: "20px",

                        left: "20px",

                        background:
                          "rgba(0,0,0,0.5)",

                        backdropFilter:
                          "blur(10px)",

                        padding:
                          "10px 16px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "13px"
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
                      padding:
                        "26px"
                    }}
                  >

                    <div
                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center",

                        marginBottom:
                          "24px"
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "14px"
                        }}
                      >

                        <img

                          onClick={() =>

                            onOpenUserProfile(
                              project
                            )
                          }

                          src={
                            project.ownerImage ||

                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }

                          alt="user"

                          style={{
                            width:
                              "56px",

                            height:
                              "56px",

                            borderRadius:
                              "50%",

                            objectFit:
                              "cover",

                            cursor:
                              "pointer"
                          }}
                        />

                        <div>

                          <p

                            onClick={() =>

                              onOpenUserProfile(
                                project
                              )
                            }

                            style={{
                              margin:
                                0,

                              fontWeight:
                                "bold",

                              fontSize:
                                "17px",

                              cursor:
                                "pointer"
                            }}
                          >
                            {

                              project.ownerName ||

                              "Architect"
                            }
                          </p>

                          <p
                            style={{
                              margin:
                                0,

                              color:
                                "#777",

                              fontSize:
                                "13px"
                            }}
                          >
                            Published Project
                          </p>

                        </div>

                      </div>

                      <button

                        onClick={(e) =>
                          handleLike(
                            e,
                            project
                          )
                        }

                        style={{
                          background:

                            alreadyLiked ?

                              "#c9a35b"

                              :

                              "#1a1a1a",

                          color:

                            alreadyLiked ?

                              "black"

                              :

                              "white",

                          border:
                            "none",

                          padding:
                            "12px 18px",

                          borderRadius:
                            "16px",

                          cursor:
                            "pointer",

                          fontWeight:
                            "bold",

                          transition:
                            "0.3s"
                        }}
                      >
                        {

                          alreadyLiked ?

                            "❤️ Liked"

                            :

                            "🤍 Like"
                        }
                      </button>

                    </div>

                    <h2

                      onClick={() => {

                        handleView(
                          project
                        )

                        onProjectClick(
                          project
                        )
                      }}

                      style={{
                        marginTop:
                          0,

                        fontSize:
                          "38px",

                        lineHeight:
                          "1.15",

                        cursor:
                          "pointer"
                      }}
                    >
                      {
                        project.title
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#888",

                        lineHeight:
                          "1.8",

                        marginBottom:
                          "28px"
                      }}
                    >
                      {

                        project.description ||

                        "Architectural project presentation."
                      }
                    </p>

                    <div
                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center"
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",

                          gap:
                            "18px",

                          color:
                            "#999"
                        }}
                      >

                        <p>
                          ❤️ {

                            project.likes || 0
                          }
                        </p>

                        <p>
                          👁️ {

                            project.views || 0
                          }
                        </p>

                        <p>
                          🖼️ {

                            project.images?.length || 0
                          }
                        </p>

                      </div>

                      <button

                        onClick={() => {

                          handleView(
                            project
                          )

                          onProjectClick(
                            project
                          )
                        }}

                        style={{
                          background:
                            "#c9a35b",

                          color:
                            "black",

                          border:
                            "none",

                          padding:
                            "13px 20px",

                          borderRadius:
                            "16px",

                          cursor:
                            "pointer",

                          fontWeight:
                            "bold"
                        }}
                      >
                        View Project
                      </button>

                    </div>

                  </div>

                </div>
              )
            })
          }

        </div>

      </div>

      <div
        style={{
          borderTop:
            "1px solid #1d1d1d",

          marginTop:
            "80px",

          padding:
            "35px",

          textAlign:
            "center",

          color:
            "#666"
        }}
      >
        Developed by Lasheen
      </div>

    </div>
  )
}