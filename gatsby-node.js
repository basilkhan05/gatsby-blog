const path = require('path')

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

		posts.forEach(({node}) => {
			createPage({
				path: node.frontmatter.path,
				component: blogPostTemplate
			})
		})
	})
}
