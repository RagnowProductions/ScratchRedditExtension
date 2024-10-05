const { ScratchExtension } = require('scratch-extension');

class RedditExtension extends ScratchExtension {
    constructor() {
        super();
        this.subreddit = '';
    }

    // Set subreddit block
    setSubreddit(subreddit) {
        this.subreddit = subreddit;
    }

    // Get current subreddit
    getCurrentSubreddit() {
        return this.subreddit || "No subreddit set";
    }

    // Fetch top post information
    async fetchTopPost() {
        if (!this.subreddit) {
            throw new Error('Please set a subreddit first.');
        }

        const response = await fetch(`https://www.reddit.com/r/${this.subreddit}/top.json?limit=1`);
        const data = await response.json();
        const post = data.data.children[0].data;

        return {
            title: post.title,
            body: post.selftext || "No body text available",
            firstImage: post.url,
            author: post.author,
            upvotes: post.ups,
            downvotes: post.downs
        };
    }

    // Reporter blocks
    async getTopPostTitle() {
        const post = await this.fetchTopPost();
        return post.title;
    }

    async getTopPostBody() {
        const post = await this.fetchTopPost();
        return post.body;
    }

    async getTopPostImage() {
        const post = await this.fetchTopPost();
        return post.firstImage;
    }

    async getTopPostAuthor() {
        const post = await this.fetchTopPost();
        return post.author;
    }

    async getTopPostUpvotes() {
        const post = await this.fetchTopPost();
        return post.upvotes;
    }

    async getTopPostDownvotes() {
        const post = await this.fetchTopPost();
        return post.downvotes;
    }
}

// Register the extension with Scratch
ScratchExtension.register(new RedditExtension());
