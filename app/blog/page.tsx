import fs from "fs"
import path from "path"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates on AI, automation, and practical business implementations.",
}

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  image?: string
}

function getPosts(): BlogPost[] {
  const postsDir = path.join(process.cwd(), "app", "blog", "posts")
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".html"))

  return files.map((file) => {
    const slug = file.replace(/\.html$/, "")
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, "utf8")
    
    // Extract title
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i) || content.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    const title = titleMatch ? titleMatch[1] : slug.replace(/[-_]/g, " ")
    
    // Extract excerpt from meta description or first paragraph
    const excerptMatch = content.match(/<meta name="description" content="([^"]+)"/i) || 
                        content.match(/<p[^>]*>([^<]+)<\/p>/i)
    const excerpt = excerptMatch ? excerptMatch[1] : "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...."
    
    // Extract date from meta or use filename pattern
    const dateMatch = content.match(/<meta name="date" content="([^"]+)"/i)
    const date = dateMatch ? dateMatch[1] : "Mar 23, 2023"
    
    // Extract author
    const authorMatch = content.match(/<meta name="author" content="([^"]+)"/i)
    const author = authorMatch ? authorMatch[1] : "Admin"
    
    // Extract read time
    const readTimeMatch = content.match(/<meta name="readTime" content="([^"]+)"/i)
    const readTime = readTimeMatch ? readTimeMatch[1] : "2 min read"
    
    // Extract image
    const imageMatch = content.match(/<meta name="image" content="([^"]+)"/i)
    const image = imageMatch ? imageMatch[1] : undefined
    
    return { slug, title, excerpt, date, author, readTime, image }
  })
}

export default function BlogIndexPage() {
  const posts = getPosts()
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-white text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {posts.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-300">No posts yet.</p>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <section className="mb-16">
                  <div className="relative bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white dark:bg-gray-900 px-3 py-1 text-sm font-medium text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded">
                        FEATURED POST
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px]">
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center p-8">
                        {featuredPost.image ? (
                          <img 
                            src={featuredPost.image} 
                            alt={featuredPost.title} 
                            className="w-full h-full object-contain bg-white rounded-lg"
                          />
                        ) : (
                          <div className="w-48 h-48 bg-indigo-300 dark:bg-indigo-700 rounded-lg flex items-center justify-center">
                            <svg className="w-16 h-16 text-indigo-600 dark:text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{featuredPost.author}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{featuredPost.date}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{featuredPost.readTime}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <a 
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Other Posts in Cards */}
              {otherPosts.length > 0 && (
                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherPosts.map((post) => (
                      <article key={post.slug} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                          {post.image ? (
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-contain bg-white"
                            />
                          ) : (
                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="mb-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            <a href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              {post.title}
                            </a>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}


