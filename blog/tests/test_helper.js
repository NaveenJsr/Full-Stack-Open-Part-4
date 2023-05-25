const Blog = require( "../models/blog" )

const initialBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    }
]


const blogInDB = async () =>
{
    const blogs = await Blog.find( {} )
    return blogs.map( blog => blog.toJSON() )
}


const nonExistingId = async () =>
{
    const blog = new Blog( {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    } )
    await blog.save()
    await blog.delete()
    return blog._id.toString()
}

module.exports = {
    initialBlog,
    blogInDB,
    nonExistingId
}