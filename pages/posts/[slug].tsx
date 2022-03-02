import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
interface Props {
    post: Post
}
const Posts = ({ post }: Props) => {
    return (
        <main className="bg-black min-h-screen text-white">
            <Header />
            <img src={urlFor(post.mainImage).url()!} alt={post.title} className="w-full h-56 object-cover" />
            <article className="p-5 max-w-7xl mx-auto">
                <h1 className="text-4xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-300">{post.description}</h2>
                <div className="flex items-center space-x-2 py-2">
                    <img src={urlFor(post.author.image).url()!} alt={post.author.name} className="h-12 w-12 rounded-full" />
                    <p className="text-sm font-extralight text-gray-300">
                        Blog post by <span className="text-yellow-400 cursor-pointer">{post.author.name}</span> - Published by {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    {/* <p>{JSON.stringify(post.body)}</p> */}
                    <PortableText
                        className="mt-4"
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                        projectId={process.env.NEXT_PUBLIC_PROJECT_ID}
                        content={post.body}
                        serializers={{
                            link: ({ href, children }: any) => (
                                <a href={href} className="text-yellow-400 hover:underline">{children}</a>
                            ),
                            h1: (props: any) => (
                                <h1 className="text-2xl font-bold my-5" {...props}>{props.children}</h1>
                            ),
                            h2: (props: any) => (
                                <h2 className="text-xl font-semibold my-3" {...props}>{props.children}</h2>
                            ),
                            h3: (props: any) => (
                                <h3 className="text-lg font-medium my-1" {...props}>{props.children}</h3>
                            ),
                            h4: (props: any) => (
                                <h4 className="text-md" {...props}>{props.children}</h4>
                            ),
                            li: ({ children }: any) => (
                                <li className="ml-4 list-disc">{children}</li>
                            ),
                            image: ({ asset }: any) => (
                                <img src={urlFor(asset._ref).url()!} alt="img" className=" object-cover" />
                            ),
                            span: ({ text }: any) => (
                                <code>{text}</code>
                            )

                        }}
                    />
                </div>
            </article>
            <form className="comment flex  flex-col p-5 my-10 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <h3 className="text-md text-yellow-400">Enjoyed Reading?</h3>
                <h4 className="text-2xl mt-2 mb-4">Leave a comment!</h4>
                <label className="block mb-5 ">
                    <span className="text-gray-300">Name</span>
                    <input required className="shadow  rounded outline-none focus:ring ring-yellow-400 w-full bg-zinc-900 p-3 " type="text" name="name" />
                </label>
                <label className="block mb-5 ">
                    <span className="text-gray-300">Email</span>
                    <input required className="shadow  focus:ring ring-yellow-400 outline-none rounded p-3 w-full bg-zinc-900" type="text" name="email" />
                </label>
                <label className="block mb-5 ">
                    <span className="text-gray-300">Comment</span>
                    <textarea required className="resize-none outline-none focus:ring ring-yellow-400 shadow  rounded p-3 w-full bg-zinc-900" rows={8} name="comment" />
                </label>
                <button className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:opacity-90">
                    Submit
                </button>
            </form>

        </main>
    )
}
export const getStaticPaths = async () => {
    const query = `
        *[type=="post"]{
            _id,
            slug->{
                current
            }
        }
    `;
    const posts = await sanityClient.fetch(query)
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current==$slug][0] {
        _id,
        title,
        author->{
           name,
           image
        },
        description,
        mainImage,
        body,
        slug
      }`
    const post = await sanityClient.fetch(query, { slug: params?.slug })
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post
        },
        revalidate: 3600 * 12 //after 1day cache will be updated
    }
}
export default Posts