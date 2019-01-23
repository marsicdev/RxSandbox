import React, { Component } from 'react';
import PostLists from './posts/PostList';
import { postService } from '../services/PostService';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }


    componentDidMount() {
        this.loadPosts()
    }

    async loadPosts() {
        try {
            const posts = await postService.fetchPosts()
            this.setState({ posts });
        } catch (error) {
            
        }
    }

    render() {
        const { posts } = this.state;
        return (<PostLists posts={posts} />)
    }
}

export default Content;
