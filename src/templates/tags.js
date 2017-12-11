import React from 'react'
import Link from 'gatsby-link'

const Tags = ({ pathContext }) => {
	const { posts, tagName } = pathContext

	if (posts) {
		return (
			<div>
				<span>
					Post about {tagName}:
				</span>

				<ul>
					{posts.map((post, idx) => {
						return (
							<li key={idx}>
								<Link to={post.frontmatter.path} >
									{post.frontmatter.title}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Tags
