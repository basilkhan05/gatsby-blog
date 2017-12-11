import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({data}) => {
	const { edges: posts } = data.allMarkdownRemark
	return (
		  <div>
		  	{posts.map(({node: post}, idx) => {
		  		const { frontmatter } = post

		  		return (
		  			<div key={idx}>
		  				<h2>
		  					<Link to={frontmatter.path}>
		  						{frontmatter.title}
		  					</Link>
		  				</h2>
		  				<p>{frontmatter.date}</p>
		  				<p>{frontmatter.excerpt}</p>

		  				<ul>
		  					{post.frontmatter.tags.map((tag, idx) => {
		  						return (
		  							<li key={idx}>
		  								<Link to={`/tags/${tag}`}>
		  									{tag}
		  								</Link>
		  							</li>
		  						)
		  					})}
		  				</ul>
		  			</div>
		  		)
		  	})}
		  </div>
		)

}
	
export const query = graphql`
	query IndexQuery {
		allMarkdownRemark{
			totalCount
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
	}
`

export default IndexPage
