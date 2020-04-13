import React, { Component } from 'react';
import Search from './Search';
import CreateBlog from './CreateBlog';
import Blogs from './Blogs';
import blogs from '../data/data';

// function searchIt(term) {
//   return function (item) {
//     return item.subject.toLowerCase().includes(term.toLowerCase());
//   };
// }

// let searchIt = (term) => (item) =>
//   item.subject.toLowerCase().includes(term.toLowerCase());

class App extends Component {
  //   state = { blogs };
  constructor() {
    super();
    this.state = {
      blogs,
      searchTerm: '',
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    const updatedBlogs = this.state.blogs.filter(
      (item) => item.objectId !== id
    );

    this.setState({ blogs: updatedBlogs });
    console.log('Delete item with id: ', id);
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      console.log(this.state.searchTerm);
    });
  };

  handleCreateBlogSubmit = (event, blog) => {
    event.preventDefault();

    let updatedBlogs = [blog, ...this.state.blogs];
    this.setState(
      {
        blogs: updatedBlogs,
      },
      () => {
        console.log(this.state.blogs);
      }
    );
  };

  render() {
    return (
      <div
        style={{
          marginTop: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Search
          handleChange={this.handleChange}
          searchTerm={this.state.searchTerm}
        />
        <hr style={{ width: '75%', color: '#3b3b3b', margin: '50px 0' }} />
        <CreateBlog handleCreateBlogSubmit={this.handleCreateBlogSubmit} />
        {/* <form className="ui form">
          <div className="field">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Search..."
              value={this.state.searchTerm}
            />
          </div>
        </form> */}
        <Blogs
          blogs={this.state.blogs}
          searchTerm={this.state.searchTerm}
          onDelete={this.onDelete}
        />
        {/* {this.state.blogs
          .filter(searchIt(this.state.searchTerm))
          .map((blog, idx) => {
            return (
              <div
                key={blog.objectId}
                className="ui card"
                style={{ width: '75%', padding: '20px' }}
              >
                <div className="content">
                  <div className="header">{blog.title}</div>

                  <br />
                  <span style={{ fontWeight: 'bold', color: '3b3b3b' }}>
                    <div className="meta">Author: {blog.author}</div>
                  </span>
                  <span style={{ fontWeight: 'bold', color: '3b3b3b' }}>
                    <div className="meta">Subject: {blog.subject}</div>
                  </span>
                  <hr />
                  <div className="description">{blog.article}</div>
                  <button
                    className="ui primary button"
                    style={{ margin: '10px 15px' }}
                    onClick={() => {
                      return this.onDelete(blog.objectId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })} */}
      </div>
    );
  }
}

export default App;
