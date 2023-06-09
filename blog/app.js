const config = require( "./utils/config" )
const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const { info, error } = require( "./utils/logger" )
const blogRouter = require( "./controllers/blog" )
const morgan = require( "morgan" )
const middleware = require( "./utils/middleware" )
const userRouter = require( "./controllers/user" )
const loginRouter = require( "./controllers/login" )
//Database
const mongoose = require( 'mongoose' )
mongoose.set( 'strictQuery', false )


mongoose.connect( config.MONGODB_URI, () =>
{
    info( "DB connected " )
} )

//Middleware
app.use( cors() )
app.use( express.json() )
morgan.token( "payload", ( req, res ) =>
    req.method === "POST" ? JSON.stringify( req.body ) : null
);
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :payload"
    )
);
app.use( middleware.tokenExtractor )

//Route
app.use( "/api/blogs", middleware.userExtractor, blogRouter )
app.use( "/api/users", userRouter )
app.use( "/api/login", loginRouter )
app.use( middleware.errorHandler )
module.exports = app