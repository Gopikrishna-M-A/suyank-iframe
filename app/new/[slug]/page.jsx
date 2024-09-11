"use client"
import React, { useState, useEffect } from "react"
import { createClient } from '@sanity/client'

const Page = ({ params }) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const dataset = 'production'
    const projectId = 'r6iyr5iv'
    const apiVersion = '2023-05-03'
    const slug = params.slug

    if (dataset && projectId && slug) {
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      })

      const fetchSanityData = async () => {
        try {
          const query = `*[_type == "blogPost" && slug.current == $slug][0]`
          // const query = `*[_type == "blogPost" && slug.current == $slug][0]{
          //   title,
          //   slug,
          //   mainImage {
          //     asset->{
          //       _id,
          //       url
          //     }
          //   },
          //   body,
          //   "author": author->name,
          //   "categories": categories[]->title
          // }`
          const params = { slug: slug }
          const result = await client.fetch(query, params)
          console.log('Sanity Data:', result)
          setPost(result)
        } catch (error) {
          console.error('Error fetching data from Sanity:', error)
        }
      }

      fetchSanityData()
    } else {
      console.log('Sanity project ID, dataset, or slug not provided')
    }
  }, [params.slug])

  if (!post) return <div>Loading...</div>

  const renderHTML = (htmlString) => {
    return { __html: htmlString }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.mainImage && <img src={post.mainImage.asset.url} alt={post.title} className="mb-4" />}
      {post.body && post.body.map((block, index) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child, childIndex) => (
            <div key={`${index}-${childIndex}`} dangerouslySetInnerHTML={renderHTML(child.text)} />
          ))
        }
        return null
      })}
    </div>
  )
}

export default Page