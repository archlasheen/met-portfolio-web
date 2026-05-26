import { useState } from "react"

import {
  doc,
  setDoc
}

from "firebase/firestore"

import {
  db
}

from "../firebase"

export default function ProfileSetupPage({

  user,
  onComplete,
  isEdit = false

}) {

  const [name, setName] =
    useState(
      user?.displayName || ""
    )

  const [bio, setBio] =
    useState(
      user?.bio || ""
    )

  const [instagram, setInstagram] =
    useState(
      user?.instagram || ""
    )

  const [behance, setBehance] =
    useState(
      user?.behance || ""
    )

  const [image, setImage] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [progress, setProgress] =
    useState(0)

  async function saveProfile() {

    if (!name) {

      alert(
        "Please Enter Your Name"
      )

      return
    }

    try {

      setLoading(true)

      let imageUrl =
        user?.photoURL || ""

      if (image) {

        const formData =
          new FormData()

        formData.append(
          "file",
          image
        )

        formData.append(
          "upload_preset",
          "unsigned_upload"
        )

        const response =
          await fetch(

            "https://api.cloudinary.com/v1_1/dvk4sjiv6/auto/upload",

            {
              method: "POST",

              body: formData
            }
          )

        setProgress(60)

        const data =
          await response.json()

        imageUrl =
          data.secure_url
      }

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {
          uid:
            user.uid,

          name,

          bio,

          instagram,

          behance,

          imageUrl
        }
      )

      setProgress(100)

      onComplete({

        uid:
          user.uid,

        email:
          user.email,

        displayName:
          name,

        photoURL:
          imageUrl,

        bio,

        instagram,

        behance
      })

    } catch (error) {

      console.log(error)

      alert(
        "Profile Save Failed"
      )
    }

    setLoading(false)
  }

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: "60px"
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",

          gap: "60px",

          alignItems:
            "center"
        }}
      >

        <div>

          <p
            style={{
              color: "#c9a35b",
              letterSpacing: "2px",
              marginBottom: "18px"
            }}
          >
            MET PORTFOLIO
          </p>

          <h1
            style={{
              fontSize: "86px",
              lineHeight: "1",
              marginBottom: "28px"
            }}
          >
            {

              isEdit ?

                "Edit Your Profile"

                :

                "Create Your Profile"
            }
          </h1>

          <p
            style={{
              color: "#888",
              lineHeight: "1.9",
              fontSize: "19px",
              maxWidth: "650px",
              marginBottom: "50px"
            }}
          >
            Manage your architectural
            identity across the
            platform.
          </p>

          <div
            style={{
              marginBottom: "22px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Your Name *
            </p>

            <input

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              placeholder="Architect Name"

              style={{
                width: "100%",
                padding: "22px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "24px",
                color: "white",
                fontSize: "18px"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "22px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Bio
            </p>

            <textarea

              rows={5}

              value={bio}

              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }

              placeholder="Tell people about yourself..."

              style={{
                width: "100%",
                padding: "22px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "24px",
                color: "white",
                fontSize: "18px",
                resize: "none"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "22px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Instagram Link
            </p>

            <input

              value={instagram}

              onChange={(e) =>
                setInstagram(
                  e.target.value
                )
              }

              placeholder="https://instagram.com/..."

              style={{
                width: "100%",
                padding: "22px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "24px",
                color: "white",
                fontSize: "18px"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "32px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Behance Link
            </p>

            <input

              value={behance}

              onChange={(e) =>
                setBehance(
                  e.target.value
                )
              }

              placeholder="https://behance.net/..."

              style={{
                width: "100%",
                padding: "22px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "24px",
                color: "white",
                fontSize: "18px"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "30px"
            }}
          >

            <input

              type="file"

              accept="image/*"

              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }

              style={{
                color: "white"
              }}
            />

          </div>

          {

            loading &&

            <div
              style={{
                marginBottom: "24px"
              }}
            >

              <div
                style={{
                  width: "100%",
                  height: "14px",
                  background: "#222",
                  borderRadius: "20px",
                  overflow: "hidden"
                }}
              >

                <div
                  style={{
                    width:
                      `${progress}%`,

                    height: "100%",

                    background:
                      "#c9a35b",

                    transition:
                      "0.3s"
                  }}
                />

              </div>

              <p
                style={{
                  color: "#aaa",
                  marginTop: "12px"
                }}
              >
                Saving Profile...
                {progress}%
              </p>

            </div>
          }

          <button

            onClick={
              saveProfile
            }

            disabled={loading}

            style={{
              width: "100%",
              background: "#c9a35b",
              color: "black",
              border: "none",
              padding: "22px",
              borderRadius: "24px",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {

              loading ?

                "Saving..."

                :

                isEdit ?

                  "Save Changes"

                  :

                  "Continue"
            }
          </button>

        </div>

        <div>

          <div
            style={{
              background:
                "linear-gradient(180deg,#111,#0b0b0b)",

              border:
                "1px solid #1d1d1d",

              borderRadius:
                "36px",

              overflow:
                "hidden"
            }}
          >

            {

              image ||

              user?.photoURL ?

                <img
                  src={

                    image ?

                      URL.createObjectURL(
                        image
                      )

                      :

                      user.photoURL
                  }

                  alt="preview"

                  style={{
                    width: "100%",
                    height: "620px",
                    objectFit: "cover"
                  }}
                />

                :

                <div
                  style={{
                    height: "620px",
                    display: "flex",
                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    color: "#555",
                    fontSize: "22px"
                  }}
                >
                  Profile Preview
                </div>
            }

            <div
              style={{
                padding: "30px"
              }}
            >

              <h1
                style={{
                  fontSize: "44px",
                  marginBottom: "12px"
                }}
              >
                {

                  name ||

                  "Architect Name"
                }
              </h1>

              <p
                style={{
                  color: "#888",
                  lineHeight: "1.8"
                }}
              >
                {

                  bio ||

                  "Architectural Designer & Creative Thinker"
                }
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}