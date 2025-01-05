"use client"
import React, { useEffect, useState } from 'react'

interface Comment {
    id:number,
    text:string
}
const CommentSection:React.FC=()=> {
    const [comments,setComments]=useState<Comment[]>([]) //tüm yorumların listesini tutar
    const [newComment,setNewComment]=useState<string>("")// kullanıcının giriş alanına yazdığı yeni yorumu saklar

    //sayfa yğklendiğinde localdeki yorumları alıp comments statine yükler
    useEffect(()=> {
        const storedComments=localStorage.getItem("comments")
        if(storedComments) {
            setComments(JSON.parse(storedComments))
        }
    },[])

    useEffect(()=> {
        localStorage.setItem("comments", JSON.stringify(comments))
    },[comments])
//yeni yorum ekleme fonksiyonu
    const handleAddComment=()=> {
        if(newComment.trim()){
            const newCommentObj:Comment= {
                id:Date.now(),
                text:newComment
            }
            setComments([...comments,newCommentObj]) //mevcut yorumların sonuna yeni yorum ekler
            setNewComment("") //giriş alanını temizler
        }
    }
  return (
    <div>
        <h3>Comments</h3>
        <div style={{marginBottom:"1rem"}}>
            <input type='text' value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder='Write a comment...' className='p-2 w-[70%] mr-2 rounded border border-s-orange-400 '></input>

            <button onClick={handleAddComment} className='py-2 px-4 bg-orange-700 rounded cursor-pointer'>Post Comment</button>
        </div>
        <ul>
           {comments.map((comment)=> (
            <li key={comment.id}>{comment.text}</li>
           ))} 
        </ul>
    </div>
  )
}

export default CommentSection