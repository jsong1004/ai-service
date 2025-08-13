import fs from "fs"
import path from "path"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
import BlogContent from "./blog-content"

function getPostHtml(slug: string): string | null {
  const filePath = path.join(process.cwd(), "app", "blog", "posts", `${slug}.html`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, "utf8")
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "app", "blog", "posts")
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".html"))
  return files.map((file) => ({ slug: file.replace(/\.html$/, "") }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const html = getPostHtml(slug)
  if (!html) return notFound()

  // Extract just the body content from the HTML to preserve original styles
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)
  let bodyContent = bodyMatch ? bodyMatch[1] : html
  
  // Extract the head styles to include them
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  const styles = styleMatch ? styleMatch[1] : ''

  // Remove any script tags that could cause hydration issues
  bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  
  // Clean up any potential hydration-causing elements
  bodyContent = bodyContent.replace(/\s+/g, ' ').trim()

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-white text-foreground" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <BlogContent html={bodyContent} styles={styles} />
      </main>
      <Footer />
    </>
  )
}


