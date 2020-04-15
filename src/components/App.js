import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
import CreateBlog from "./CreateBlog";
import Blogs from "./Blogs";
import UpdateBlog from "./UpdateBlog";
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
      blogs: [],
      searchTerm: "",
      toggle: true,
    };
  }
  loadBlogs = () => {
    const url = "/blogs";
    axios.get(url).then((blogs) => {
      // return console.log(blogs.data);
      return this.setState({ blogs: blogs.data });
    });
  };
  loadBlog = (id) => {
    axios.get(`/blog/${id}`).then((blog) => {
      return console.log(blog.data);
    });
  };
  onDelete = (id) => {
    axios.delete(`/blog/${id}`).then(() => {
      this.loadBlogs();
    });
    // const updatedBlogs = this.state.blogs.filter(
    //   (item) => item.objectId !== id
    // );
    // this.setState({ blogs: updatedBlogs });
    // console.log('Delete item with id: ', id);
  };
  onUpdate = (id) => {
    this.loadBlog(id);
    // console.log(`Update: ${id}`);
  };
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      console.log(this.state.searchTerm);
    });
  };
  handleCreateBlogSubmit = (event, blog) => {
    event.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.post("/blog", blog, axiosConfig).then(() => {
      this.loadBlogs();
    });
    // let updatedBlogs = [blog, ...this.state.blogs];
    // this.setState(
    //   {
    //     blogs: updatedBlogs,
    //   },
    //   () => {
    //     console.log(this.state.blogs);
    //   }
    // );
  };

  handleUpdateBlogSubmit = (event, blog, id) => {
    event.preventDefault();
    this.setState({
      toggle: true,
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.put(
      `/blog/${id}`,
      blog,
      axiosConfig.then(() => {
        return this.loadBlogs();
      })
    );
  };
  componentDidMount() {
    this.loadBlogs();
  }
  render() {
    console.log("Blogs...", this.state.blogs);
    return (
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Search
          handleChange={this.handleChange}
          searchTerm={this.state.searchTerm}
        />
        <hr style={{ width: "75%", color: "#3b3b3b", margin: "50px 0" }} />
        {this.state.toggle ? (
          <CreateBlog handleCreateBlogSubmit={this.handleCreateBlogSubmit} />
        ) : (
          <UpdateBlog />
        )}
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
          onUpdate={this.onUpdate}
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
