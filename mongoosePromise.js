//concept file...not exact code

const myuser = {name: "hitesh"}

//strategy 1
const saveUser = (req, res) =>{
    User.create(myuser)
        .then(user=>{
            //more stuff
        })
        .catch()
}

//strategy 2
const saveUser = (req, res)=>{
    const user = await User.create(myuser)
}
// this handles only the time issue and not the error handling part
//solution:
const saveUser = (req, res)=>{
    try {
        const user = await User.create(myuser)
    } catch (error) {
        
    }
    
}
//here, you still need to handle some promises sometimes


//solution 3 (production grade)
//we create a HELPER function
const BigPromise = func =>(req, res, next)=>{
    Promise.resolve(func(req, res,next))
        .catch(next)
}