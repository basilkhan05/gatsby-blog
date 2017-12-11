const path = require('path')

const createTagPages = (createPage, posts) => {
	const tagPageTemplate = path.resolve(`src/templates/tags.js`)
	const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)

	const postsByTags = {}

	posts.forEach(({node}) => {
		if (node.frontmatter.tags) {
			node.frontmatter.tags.forEach(tag => {
				if (!postsByTags[tag]) {
					postsByTags[tag] = []
				}

				postsByTags[tag].push(node)
			})
		}
	})

	const tags = Object.keys(postsByTags)

	createPage({
		path: `/tags`,
		component: allTagsTemplate,
		context: {
			tags: tags.sort()
		}
	})

	tags.forEach(tagName => {
		const posts = postsByTags[tagName]

		createPage({
			path: `/tags/${tagName}`,
			component: tagPageTemplate,
			context: {
				posts,
				tagName
			}
		})
	})
}

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators 
	const blogPostTemplate = path.resolve(`src/templates/blog-posts.js`)

	return graphql(`{
		allMarkdownRemark{
			edges {
				node {
					id 
					frontmatter {
						title
						date
						path
						tags
						excerpt
					}
				}
			}
		}
	}`)
	.then(result => {
		if(result.errors) {
			return Promise.reject(result.errors)
		}

		const posts = result.data.allMarkdownRemark.edges

		createTagPages(createPage, posts)

		posts.forEach(({node}, idx) => {
			createPage({
				path: node.frontmatter.path,
				component: blogPostTemplate,
				context: {
					prev: idx === 0 ? null : posts[idx-1].node,
					next: idx === (posts.length - 1) ? null : posts[idx+1].node
				}
			})
		})
	})
}
