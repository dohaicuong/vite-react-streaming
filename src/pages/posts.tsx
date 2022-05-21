import axios from 'axios'
import { atomWithQuery } from 'jotai/query'
import { useAtom } from 'jotai'

const Post: React.FC = () => {
  const [posts] = useAtom(postsAtom)

  return (
    <>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </>
  )
}

export default Post

type Post = {
  id: number
  title: string
  body: string
}

const postsAtom = atomWithQuery((get) => ({
  queryKey: ['posts'],
  queryFn: async (): Promise<Post[]> => {
    return axios.get('http://127.0.0.1:3000/api/posts')
      .then(res => res.data)
  }
}))
