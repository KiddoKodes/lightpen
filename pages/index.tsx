import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from "../sanity"
import { Post } from '../typings'
interface Props {
  posts: Post[]
};
const Home = ({ posts }: Props) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Head>
        <link rel="shortcut icon" href="/thunder.png" type="image/x-icon" />
        <title>Light Pen</title>
      </Head>
      <Header />
      <div className="flex  justify-between p-5 max-w-7xl mx-auto items-center bg-yellow-400 py-8 text-black">
        <div className="px-10 space-y-5">
          <h1 className="text-5xl max-w-xl"><span className="text-yellow-700 underline">Light Pen</span> is a place for you and other folks to write,read and connect </h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>

        <div>
          <img src="/thunder.png" alt="LP" className="hidden  md:inline-flex h-36 w-56 lg:h-full drop-shadow-xl" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 justify-between  max-w-7xl mx-auto ">
        {posts?.map(post => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            {post.mainImage && (
              <div className="cursor-pointer group overflow-hidden  rounded-lg">
                <img src={
                  urlFor(post.mainImage).url()!
                } alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" />
                <div className="flex justify-between p-5 text-black bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">{post.description}</p>
                  </div>
                  <img className="w-12 h-12 rounded-full" src={
                    urlFor(post.author.image).url()!
                  } alt={post.author.name} />
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author->{
       name,
       image
    },
    description,
    mainImage,
    slug
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts
    }
  }
}
export default Home
