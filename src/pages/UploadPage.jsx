import { useState, useEffect } from "react"

import {
  addDoc,
  collection,
  updateDoc,
  doc
}

from "firebase/firestore"

import {
  db
}

from "../firebase"

export default function UploadPage({

  user,
  onBack,
  project

}) {

  const isEdit =
    !!project

  const [title, setTitle] =
    useState("")

  const [category, setCategory] =
    useState("Architectural Design")

  const [description, setDescription] =
    useState("")

  const [files, setFiles] =
    useState([])

  const [existingImages,
    setExistingImages] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [progress, setProgress] =
    useState(0)

  useEffect(() => {

    if (project) {

      setTitle(
        project.title || ""
      )

      setCategory(
        project.category || ""
      )

      setDescription(
        project.description || ""
      )

      setExistingImages(
        project.images || []
      )
    }

  }, [project])

  async function uploadProject() {

    if (
      !title ||
      !description
    ) {

      alert("Please fill all fields")

      return
    }

    try {

      setLoading(true)

      let uploadedImages =
        [...existingImages]

      for (
        let i = 0;
        i < files.length;
        i++
      ) {

        const file =
          files[i]

        if (
          file.size >
          10 * 1024 * 1024
        ) {

          alert(
            `${file.name} is bigger than 10MB`
          )

          setLoading(false)

          return
        }

        const formData =
          new FormData()

        formData.append(
          "file",
          file
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

        const data =
          await response.json()

        if (data.secure_url) {

          uploadedImages.push(
            data.secure_url
          )
        }

        setProgress(

          Math.round(
            ((i + 1)
              /
              files.length)
            * 100
          )
        )
      }

      if (isEdit) {

        await updateDoc(

          doc(
            db,
            "projects",
            project.id
          ),

          {
            title,
            category,
            description,
            images:
              uploadedImages
          }
        )

        alert(
          "Project Updated 😄"
        )

      } else {

        await addDoc(

          collection(
            db,
            "projects"
          ),

          {
            projectId:
              crypto.randomUUID(),

            title,

            category,

            description,

            images:
              uploadedImages,

            likes: 0,

            likedByUsers: [],

            ownerId:
              user.uid,

            ownerName:
              user.displayName,

            ownerImage:
              user.photoURL,

            createdAt:
              Date.now()
          }
        )

        alert(
          "Project Uploaded 😄"
        )
      }

      onBack()

    } catch (error) {

      console.log(error)

      alert("Operation Failed")
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
        padding: "50px"
      }}
    >

      <button

        onClick={onBack}

        style={{
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          marginBottom: "30px"
        }}
      >
        ← Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.1fr 0.9fr",
          gap: "50px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "70px",
              marginBottom: "50px"
            }}
          >
            {

              isEdit ?

              "Edit Project"

              :

              "Upload Project"
            }
          </h1>

          <div
            style={{
              marginBottom: "28px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Project Title
            </p>

            <input

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              placeholder="Enter project title"

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
              marginBottom: "28px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Project Category
            </p>

            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "22px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "24px",
                color: "white",
                fontSize: "18px"
              }}
            >

              <option>
                Architectural Design
              </option>

              <option>
                Urban Design
              </option>

              <option>
                Interior Design
              </option>

              <option>
                Landscape
              </option>

            </select>

          </div>

          <div
            style={{
              marginBottom: "28px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "12px"
              }}
            >
              Project Description
            </p>

            <textarea

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              rows={8}

              placeholder="Write project description..."

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
              marginBottom: "15px"
            }}
          >

            <p
              style={{
                color: "#888",
                marginBottom: "14px"
              }}
            >
              Upload New Images
            </p>

            <input

              type="file"

              multiple

              accept="image/*"

              onChange={(e) =>

                setFiles(

                  Array.from(
                    e.target.files
                  )
                )
              }

              style={{
                color: "white"
              }}
            />

          </div>

          <p
            style={{
              color: "#666",
              marginBottom: "35px",
              fontSize: "14px"
            }}
          >
            Maximum 10 Images •
            Each Image Under 10MB
          </p>

          {

            loading &&

            <div
              style={{
                marginBottom: "25px"
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
                  marginTop: "12px",
                  color: "#aaa"
                }}
              >
                Uploading...
                {progress}%
              </p>

            </div>
          }

          <button

            onClick={
              uploadProject
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

                "Processing..."

                :

                isEdit ?

                "Update Project"

                :

                "Publish Project"
            }
          </button>

        </div>

        <div>

          <div
            style={{
              background: "#111",
              borderRadius: "32px",
              overflow: "hidden",
              border: "1px solid #222"
            }}
          >

            {

              files.length > 0 ?

                <img
                  src={
                    URL.createObjectURL(
                      files[0]
                    )
                  }

                  alt="preview"

                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover"
                  }}
                />

                :

                existingImages.length > 0 ?

                <img
                  src={
                    existingImages[0]
                  }

                  alt="preview"

                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover"
                  }}
                />

                :

                <div
                  style={{
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#555"
                  }}
                >
                  No Preview
                </div>
            }

            <div
              style={{
                padding: "28px"
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "20px"
                }}
              >

                <img
                  src={
                    user.photoURL
                  }

                  alt="profile"

                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%"
                  }}
                />

                <div>

                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      fontSize: "18px"
                    }}
                  >
                    {
                      user.displayName
                    }
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#777"
                    }}
                  >
                    {category}
                  </p>

                </div>

              </div>

              <h2
                style={{
                  fontSize: "34px"
                }}
              >
                {

                  title ||

                  "Project Title"
                }
              </h2>

              <p
                style={{
                  color: "#999",
                  lineHeight: "1.8"
                }}
              >
                {

                  description ||

                  "Project description preview..."
                }
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}