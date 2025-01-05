import React from 'react'

import { client } from '@/sanity/lib/client'
import Hero from './components/hero'


 const  Homepage = async() => {
     const query = `*[_type == 'blog']  | order(_updatedAt asc){
  Title,Paragraph,image,
   "slug":slug.current
}`

const data:Blog[] = await client.fetch(query)


  return (
    <div className='' >
       
       {  data.map((data:Blog)=>(
        <Hero data={data} key={data.slug}/>
       ))
        
        }
        

    </div>
  )
}

export default Homepage