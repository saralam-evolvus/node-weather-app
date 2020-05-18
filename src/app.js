const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const jsPath = path.join(__dirname,'../public/js')
const cssPath =path.join(__dirname,'../public/css')
const app = express()
const port = process.env.PORT || 1996

const publicDir = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//const helpPage= path.join(__filename, '../public/about.html')

app.set('view engine', 'hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialPath)
app.use(express.static((publicDir)))








console.log(__dirname)
console.log(__filename)
console.log(publicDir)
//console.log('Filename', helpPage)

//app.com
app.get('', (req, res) => {
    //res.send('<h1>Hello express!</h1>')
    
    res.render('index',{
        name:'saru',
        title:'welcome'
    })
  // app.use(express.static((publicDir)))
})


//app.com/help
app.get('/help', (req, res)=>
{
//res.send('Follow the below instruction.')
//app.use(express.static((publicDir)))
res.render('help',
{
    name:'saru shetty',
    title:'Thank you'
})
})

//app.com/about

app.get('/about', (req, res) =>
{
    res.send('<h1>About</h1>')
   // app.use(express.static((publicDir)))
})

//app.com/people
app.get('/people', (req, res) =>
{
    res.send([
        {
            name: 'saru'
        },
        {
            name : 'shetty'
        }
        
    ])
})

//app.com/company

// query string 

app.get('/company', (req, res) =>
{
    if(!req.query.type){
            return res.send(
                {
                    error: 'Please provude the type'
                }
            )
    }
    res.send({
        name: 'Evolvus',
        place: 'Banglore',
        type: req.query.type
    })
})

app.get('/native', (req, res) =>
{
    if(!req.query.landmark)
    {
        return res.send(
            {
                error:'please enter the landmark'
            }
        )
    }
    res.send({
        Place: 'Skp',
        Dist : 'Hsn',
        landmark: req.query.landmark
    })
})

// new task geocode and forcast

app.get('/weather', (req,res) =>
{
    if(!req.query.address){
      return  res.send({
            error: 'please provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if (error){
            return res.send({ 
                error: 'Unable to find the location'
            })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({
                     error:'Unable to find the location'
                     })
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })


    })

})






// app.get('/help/*', (req, res) =>{
//     res.send("Help artical not available")
// })

app.get('/help/*',(req, res) =>
{
    //res.send("404 page not found")
    res.render('404',{
        name: 'Opppssssssssssss',
        errorMessage :'404 page not found',
        title: 'byeeeeeeeeeeeeee'
})
})




app.get('/*',(req, res) =>
{
    //res.send("404 page not found")
    res.render('404',{
        name: 'sarala',
        errorMessage :'404 page not found',
        title: 'byeeeeeeeeeeeeee'
})

})


// app.listen(3000)
// app.listen(1996)

//  app.listen(3000, () =>
//  {
//      console.log('server is up on port 3000.')
// })
app.listen(port, () =>
{
    console.log('server is up on port.'+ port)
})