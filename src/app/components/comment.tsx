'use client'
import React, { useState, useEffect } from 'react';

// Yerel depolamadan yorumları al
const getStoredComments = (): string[] => {
  try {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : []; //string alınan veriyi diziye çevirir
  } catch (error) {
    console.error("Error parsing localStorage data:", error); //json çalışmazsa veya hata oluşursa
    return [];
  }
};

// Yerel depolamaya yorumları kaydet
const storeComments = (comments: string[]) => {
  try {
    localStorage.setItem('comments', JSON.stringify(comments));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const CommentBox = () => {
  const [comment, setComment] = useState(''); //mevcut yorumu saklamak için
  const [comments, setComments] = useState<string[]>([]); //tüm yorumların listesini saklar

  // Sayfa yüklendiğinde yorumları yerel depolamadan al
  useEffect(() => {
    setComments(getStoredComments());
  }, []);

  // Yorum ekleme fonksiyonu
  const addComment = () => {
    if (!comment.trim()) return; //boş veyaa boşluk içeren yorumları eklemeyi engeller

    const updatedComments = [...comments, comment.trim()];
    setComments(updatedComments); // Yeni durumu güncelle
    setComment(''); // Giriş alanını temizle
    storeComments(updatedComments); // Yerel depolamaya kaydet
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mt-4 text-purple-500">Comment Box</h1>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment"
        className="border border-purple-500 mt-3 w-80 p-2 rounded"
      />
      <br />
      <button
        className="bg-purple-500 text-white w-36 mt-3 p-2 rounded hover:bg-purple-600 transition"
        onClick={addComment}
      >
        Add Comment
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">All Comments:</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Add your comment!</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {comments.map((data, index) => (
              <li key={index} className="border-b border-gray-300 pb-1">
                {data}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
