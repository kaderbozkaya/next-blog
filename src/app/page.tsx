import React from 'react'

import { client } from '@/sanity/lib/client'
import Hero from './components/hero'



 const  Homepage = async() => {
  //sanityden tüm blog içeriklerini çekmek için:
     const query = `*[_type == 'blog']  | order(_updatedAt asc){
  Title,Paragraph,image,
   "slug":slug.current
}` //sadece blog türündeki verileri alır.blogları güncelleme tarihine göre artan sırayla alır.title,paragraf,image slug.current ilgili alanları döndürür.slug alanını bit string olarak döndürür

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