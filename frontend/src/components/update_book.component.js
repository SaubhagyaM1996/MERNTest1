import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateBook() {
  const { id } = useParams(); // Get the book ID from the URL params
  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(``);
  const [description, setDescription] = useState(``);

  useEffect(() => {
    // Fetch the book details based on the ID
    // axios.get(`http://localhost:5000/${id}`)
    axios.get(`https://mern-test1-api.vercel.app/${id}`)
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Fetch the book details whenever the ID changes


  const onSubmit = (e) => {
    e.preventDefault();

    let updatedbook = {title: title , author: author, description: description};
    
    // Construct the correct API endpoint for updating the book
    // const url = `http://localhost:5000/${id}`;
    const url = `https://mern-test1-api.vercel.app/${id}`;

    axios
      .put(url, updatedbook)
      .then((res) => {
        console.log(res.data);
        // Redirect to the book list page after update
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br /><a className="btn btn-info float-left" href="/">Show BooK List</a>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Update Book</h1>
            <p className="lead text-center">Update existing book</p>
            <form  onSubmit={onSubmit} noValidate="">
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={title}
                  spellCheck="false"
                  data-ms-editor="true"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={author}
                  spellCheck="false"
                  data-ms-editor="true"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={description}
                  spellCheck="false"
                  data-ms-editor="true"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
