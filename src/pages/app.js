
import express from 'express';



const express = require('express');
const session = require('express-session');
const bodyparser=require('body-parser')
const app = express();

app.use(bodyparser.json());
const redirectlogin=(req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        next();
    }

}

const redirectHome=(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/Home')
    }
    else{
        next();
    }

}

 /*app.use((req,res,next)=>{
    const{userId}=req.session
    if(userId){
        res.locals.user=users.find(
            user=>user.id===userId
        )
    }
    next()
 })*/
 
 
app.get('/',(req,res)=>{
    const{userId}=req.session
    
    res.send(`
    <a href='/login'>Login</a>
    <a href='/register'>register</a>
    <a href='/Home'>Home</a>
    `)
})
 
app.get('/Home',redirectlogin,(req,res)=>{
    res.send(`
        <hl>Home</hl>
        <a href='/'>Main</a>
        <Ul>
            <li>
                Name:
                Email:
            </li>
        </Ul>
    `)
})




app.get ('/login',redirectHome,(req, res) => {
    res.send(
        <form method='get' action='/login'>
            <input type='text' name='email' placeholder='email' require/>
            <input type='password' name='password' placeholder='password'require/>
            <input type='submit' name='Login'/>

        </form>
    )
    
})

app.get ('/register',redirectHome, (req, res) => {
    res.send(
        <form method='get' action='/register'>
            <input type='Name'name='Name' placeholder='Name' require/>
            <input type='text' name='email' placeholder='email' require/>
            <input type='password' name='password' placeholder='password'require/>
            <input type='password' name='confirmpassword' placeholder='confirmpassword'require/>

            <input type='submit' name='Register'/>

        </form>
    )

})

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    
    if (email&&password){
        const user= users.find( user=>user.email===email && user.password===password)
        if(user){
            req.session.userId=user.id
            return res.redirect('/Home')
        }

    
    }
    
res.redirect('/login')
})

app.post('/register',(req,res)=>{
    const {name,email ,password} = req.body
if(name&&email&&password){
    const exists=users.some(
        user=>user.email===email
    )
     if(!exists){
        const user={
            id:user.length+1,
            name,
            email,
            password
        }
        user.push(user)
        
        req.session.userId=user.id
        return res.redirect('/Home')

     }
}
    
res.redirect('/register')
})

app.post('/logout',redirectlogin,(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/Home')
        }
    
        res.redirect('/login')
    })
})
