import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc
}

from "firebase/firestore"

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
}

from "firebase/auth"

import {
  db,
  auth,
  provider
}

from "./firebase"

import SplashScreen from "./pages/SplashScreen"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"
import UploadPage from "./pages/UploadPage"
import ProjectDetails from "./pages/ProjectDetails"
import ProfileSetupPage from "./pages/ProfileSetupPage"

export default function App() {

  const [showSplash, setShowSplash] =
    useState(true)

  const [projects, setProjects] =
    useState([])

  const [selectedProject, setSelectedProject] =
    useState(null)

  const [user, setUser] =
    useState(null)

  const [showProfile, setShowProfile] =
    useState(false)

  const [showUpload, setShowUpload] =
    useState(false)

  const [publicProfile, setPublicProfile] =
    useState(null)

  const [needsSetup, setNeedsSetup] =
    useState(false)

  const [showEditProfile, setShowEditProfile] =
    useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false)

    }, 3000)

    return () => clearTimeout(timer)

  }, [])

  useEffect(() => {

    fetchProjects()

  }, [])

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        async (currentUser) => {

          if (currentUser) {

            try {

              const userDoc =

                await getDoc(

                  doc(
                    db,
                    "users",
                    currentUser.uid
                  )
                )

              if (userDoc.exists()) {

                const userData =
                  userDoc.data()

                setUser({

                  uid:
                    currentUser.uid,

                  email:
                    currentUser.email,

                  displayName:
                    userData.name,

                  photoURL:
                    userData.imageUrl,

                  bio:
                    userData.bio,

                  instagram:
                    userData.instagram,

                  behance:
                    userData.behance
                })

                setNeedsSetup(false)

              } else {

                setNeedsSetup(true)

                setUser({

                  uid:
                    currentUser.uid,

                  email:
                    currentUser.email
                })
              }

            } catch (error) {

              console.log(error)

              setUser(currentUser)
            }

          } else {

            setUser(null)

            setNeedsSetup(false)
          }
        }
      )

    return () => unsubscribe()

  }, [])

  async function login() {

    try {

      await signInWithPopup(
        auth,
        provider
      )

    } catch (error) {

      console.log(error)
    }
  }

  async function logout() {

    await signOut(auth)
  }

  async function fetchProjects() {

    const querySnapshot =

      await getDocs(
        collection(db, "projects")
      )

    const projectsList =

      querySnapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()
      }))

    setProjects(projectsList)
  }

  if (showSplash) {

    return <SplashScreen />
  }

  if (needsSetup && user) {

    return (

      <ProfileSetupPage

        user={user}

        onComplete={(newUser) => {

          setUser(newUser)

          setNeedsSetup(false)
        }}
      />
    )
  }

  if (showEditProfile && user) {

    return (

      <ProfileSetupPage

        user={user}

        isEdit={true}

        onComplete={(updatedUser) => {

          setUser(updatedUser)

          setShowEditProfile(false)
        }}
      />
    )
  }

  if (showUpload && user) {

    return (

      <UploadPage

        user={user}

        project={selectedProject}

        onBack={() => {

          setShowUpload(false)

          setSelectedProject(null)
        }}
      />
    )
  }

  if (showProfile && user) {

    return (

      <ProfilePage

        user={user}

        projects={projects}

        onBack={() =>
          setShowProfile(false)
        }

        onUpload={() => {

          setSelectedProject(null)

          setShowUpload(true)
        }}

        onEditProfile={() =>
          setShowEditProfile(true)
        }

        onProjectClick={(project) =>
          setSelectedProject(project)
        }

        onEditProject={(project) => {

          setSelectedProject(project)

          setShowUpload(true)
        }}

        onDeleteProject={

          async (id) => {

            const confirmDelete =

              window.confirm(
                "Delete this project?"
              )

            if (!confirmDelete)
              return

            try {

              await deleteDoc(

                doc(
                  db,
                  "projects",
                  id
                )
              )

              fetchProjects()

            } catch (error) {

              console.log(error)
            }
          }
        }
      />
    )
  }

  if (publicProfile) {

    const userProjects =

      projects.filter(

        project =>

          project.ownerId ===
          publicProfile.uid
      )

    const totalLikes =

      userProjects.reduce(

        (total, project) =>

          total +
          (project.likes || 0),

        0
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

            onClick={() =>
              setPublicProfile(null)
            }

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
                publicProfile.photo
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
                publicProfile.name
              }
            </h1>

            <p
              style={{
                color: "#888",
                fontSize: "22px",
                marginTop: "18px"
              }}
            >
              Architectural Designer
            </p>

            {

              publicProfile.bio &&

              <p
                style={{
                  color: "#aaa",
                  maxWidth: "900px",
                  lineHeight: "2",
                  marginTop: "28px",
                  fontSize: "18px"
                }}
              >
                {publicProfile.bio}
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

                publicProfile.instagram &&

                <a

                  href={
                    publicProfile.instagram
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

                publicProfile.behance &&

                <a

                  href={
                    publicProfile.behance
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
                    userProjects.length
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
                  {totalLikes}
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
              Projects
            </h2>

            <p
              style={{
                color: "#777",
                fontSize: "17px"
              }}
            >
              {
                userProjects.length
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

              userProjects.map(project => (

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
                          "center"
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

                      <button

                        onClick={() => {

                          setSelectedProject(project)

                          setPublicProfile(null)
                        }}

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

  if (selectedProject && !showUpload) {

    return (

      <ProjectDetails

        project={selectedProject}

        onBack={() =>
          setSelectedProject(null)
        }

        onOpenUserProfile={

          async (project) => {

            try {

              const userDoc =

                await getDoc(

                  doc(
                    db,
                    "users",
                    project.ownerId
                  )
                )

              if (userDoc.exists()) {

                const data =
                  userDoc.data()

                setPublicProfile({

                  uid:
                    project.ownerId,

                  name:
                    data.name,

                  photo:
                    data.imageUrl,

                  bio:
                    data.bio,

                  instagram:
                    data.instagram,

                  behance:
                    data.behance
                })

                setSelectedProject(null)
              }

            } catch (error) {

              console.log(error)
            }
          }
        }
      />
    )
  }

  return (

    <ExplorePage

      projects={projects}

      onProjectClick={(project) =>
        setSelectedProject(project)
      }

      user={user}

      login={login}

      logout={logout}

      onProfile={() =>
        setShowProfile(true)
      }

      onOpenUserProfile={

        async (project) => {

          try {

            const userDoc =

              await getDoc(

                doc(
                  db,
                  "users",
                  project.ownerId
                )
              )

            if (userDoc.exists()) {

              const data =
                userDoc.data()

              setPublicProfile({

                uid:
                  project.ownerId,

                name:
                  data.name,

                photo:
                  data.imageUrl,

                bio:
                  data.bio,

                instagram:
                  data.instagram,

                behance:
                  data.behance
              })
            }

          } catch (error) {

            console.log(error)
          }
        }
      }
    />
  )
}